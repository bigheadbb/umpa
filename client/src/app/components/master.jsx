var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppLeftNav = require('./app-left-nav.jsx');
var FullWidthSection = require('./full-width-section.jsx');
var mui = require('material-ui');
var LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
var UserSetting = require('./svg-icons/user-setting.jsx');
var Home = require('./home.jsx');

var { AppBar,
      AppCanvas,
      FontIcon,
      IconButton,
      EnhancedButton,
      Menu,
      Mixins,
      RaisedButton,
      Styles,
      Tab,
      Tabs,
      Paper} = require('material-ui');

var RouteHandler = Router.RouteHandler;
var { Colors, Spacing, Typography } = Styles;
var ThemeManager = Styles.ThemeManager;

var DesktopGutter = mui.Styles.Spacing.desktopGutter;

var Master = React.createClass({

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    }
  },

  getInitialState: function() {
    return {
      tabIndex : '1',
    };
  },

  getStyles: function() {
    return {
      root: {
      }
    };
  },

  componentDidMount: function() {
    var timeout = setTimeout(
      function(){
        this.setState({tabIndex: this._getSelectedIndex()});
        if (window.location.href.indexOf('#') === -1 || window.location.href.split('#')[1] === "/") {
          this.context.router.transitionTo('new-asks');
        }
      }.bind(this), 2000);

    document.addEventListener("fbLogin",
      function statusChangeCallback(e) {
        console.log('master fbLogin statusChangeCallback');
        console.log(e.detail.res);
        var response = e.detail.res;
        window.loginStatusCallback(response);
        clearTimeout(timeout);
        this.setState({tabIndex: this._getSelectedIndex()});
        if (window.location.href.indexOf('#') === -1 || window.location.href.split('#')[1] === "/") {
          this.context.router.transitionTo('new-asks');
        }
      }.bind(this)
    );
  },

  componentWillMount: function(){
    this.setState({tabIndex: this._getSelectedIndex()});
    var setTabsState = function() {
      this.setState({mobileView: (document.body.clientWidth <= 647)});
    }.bind(this);
    setTabsState();
    window.onresize = setTabsState;
  },

  componentWillReceiveProps: function() {
    this.setState({tabIndex: this._getSelectedIndex()});
  },

  _getSelectedIndex: function() {
    return this.context.router.isActive('new-asks') ? '1' :
      this.context.router.isActive('hot-asks') ? '2' : '0';
  },

  _handleTabChange: function(value, e, tab) {
    this.context.router.transitionTo(tab.props.route);
    this.setState({tabIndex: this._getSelectedIndex()});
  },

  _onRightIconButtonTouchTap: function() {
    if (document.fblogin === "connected") {
      this.refs.leftNav.toggle();
    }
    else {
      var valueScope = 'public_profile, email';
      FB.login(window.loginStatusCallback, { scope: valueScope });
    }
  },

  _getAppbar: function() {
    var styles = {
      root: {
        backgroundColor: Colors.deepPurple500,
        position: 'fixed',
        height: 64,
        top: 0,
        right: 0,
        zIndex: 4,
        width: '100%',
      },
      container: this.state.mobileView ?
      this.context.router.isActive("new-asks") || this.context.router.isActive("hot-asks") ?
      {
        visibility: 'visible',
        position: 'absolute',
        top : Spacing.desktopKeylineIncrement,
        width: '100%',
      }
      : {
          visibility : 'hidden',
      }
      : {
        position: 'absolute',
        right: (Spacing.desktopGutter/2) + 48,
        bottom: 0,
      },
      span: {
        color: Colors.white,
        fontWeight: Typography.fontWeightLight,
        left: 22,
        top: 22,
        position: 'absolute',
        fontSize: 26,
      },
      tabs: this.state.mobileView ?
      {
        width: '100%',
        bottom:0,
        borderWidth: "0px 0px 1px 0px",
        borderStyle: "solid",
        borderColor: Colors.grey300,
      }
      : {
        width: 300,
        bottom:0,
      },
      tabItemContainerStyle: {
        color: Colors.deepPurple500,
      },
      inkBarStyle : this.state.mobileView ?
      {
        backgroundColor : Colors.deepPurple500,
        height: 2,
        marginTop: -2
      }
      : {
        backgroundColor : Colors.grey100,
        height: 6,
        marginTop: -6,
      },
      tab: this.state.mobileView ?
      {
        backgroundColor: Colors.grey100,
        color: Colors.grey400,
        height: 44,
      }
      : {
        backgroundColor: Colors.deepPurple500,
        height: 64,
        fontWeight: 'bold',
      },
      selectedTab : this.state.mobileView ?
      {
        backgroundColor: Colors.grey100,
        color: Colors.deepPurple500,
        height: 44,
        fontWeight: 'bold',
      }
      : {
        backgroundColor: Colors.deepPurple500,
        height: 64,
        fontWeight: 'bold',
      },
      userSetting: {
        position: 'fixed',
        right: Spacing.desktopGutter/2,
        top: 8,
        zIndex: 5,
        color: 'white'
      },
      logo: {
        width: 72,
        height: 18
      }
    };

    var newTabStyle = this._getSelectedIndex() == 1 ? styles.selectedTab : styles.tab ;
    var hotTabStyle = this._getSelectedIndex() == 2 ? styles.selectedTab : styles.tab ;

    var yesOrNoIcon= (
      <EnhancedButton>
        <span style={styles.span}>
          <img src="img/yesno.png" style={styles.logo}/>
        </span>
      </EnhancedButton>);

    var rightButton = (
      <IconButton style={styles.userSetting}
        onTouchTap={this._onRightIconButtonTouchTap}
      >
        <UserSetting />
      </IconButton>
    );

    var tabs = (
      <Tabs
        style={styles.tabs}
        tabItemContainerStyle={styles.tabItemContainerStyle}
        inkBarStyle={styles.inkBarStyle}
        value={this.state.tabIndex}
        onChange={this._handleTabChange}>
        <Tab
          value="1"
          label="NEW"
          style={newTabStyle}
          route="new-asks" />
        <Tab
          value="2"
          label="HOT"
          style={hotTabStyle}
          route="hot-asks"/>
      </Tabs>
    );

    return(
      <div>
        <Paper
          zDepth={0}
          rounded={false}
          style={styles.root}>
          {yesOrNoIcon}
          <div style={styles.container}>
            {tabs}
          </div>
          {rightButton}
        </Paper>
      </div>
    );
  },

  render: function() {
    var styles = this.getStyles();
    return (
      <div style={styles.root}>
        { this._getAppbar() }
        <RouteHandler />
        <AppLeftNav ref="leftNav" />
      </div>
    );
  },

});

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;


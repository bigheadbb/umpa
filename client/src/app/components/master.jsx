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

class Master extends React.Component {

  constructor() {
    super();
    this._onRightIconButtonTouchTap = this._onRightIconButtonTouchTap.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    }
  }

  getInitialState() {
    return {
      tabIndex : '1',
    };
  }

  getStyles() {
    return {
      root: {
      }
    };
  }

  componentDidMount() {
    var timeout = setTimeout(
      function(){ 
        this.setState({tabIndex: this._getSelectedIndex()});
        this.context.router.transitionTo('new-asks');
      }.bind(this), 2000);

    document.addEventListener("fbLogin",
      function statusChangeCallback(e) {
        console.log('master fbLogin statusChangeCallback');
        console.log(e.detail.res);
        var response = e.detail.res;
        window.loginStatusCallback(response);
        clearTimeout(timeout);
        this.setState({tabIndex: this._getSelectedIndex()});
        this.context.router.transitionTo('new-asks');
      }.bind(this)
    );
  }

  componentWillMount(){
    this.setState({tabIndex: this._getSelectedIndex()});
    var setTabsState = function() {
      this.setState({mobileView: (document.body.clientWidth <= 647)});
      this.context.router.transitionTo('new-asks');
    }.bind(this);
    setTabsState();
    window.onresize = setTabsState;
  }

  componentWillReceiveProps() {
    this.setState({tabIndex: this._getSelectedIndex()});
  }

  _getSelectedIndex() {
    return this.context.router.isActive('new-asks') ? '1' :
      this.context.router.isActive('hot-asks') ? '2' : '0';
  }

  _handleTabChange(value, e, tab) {
    this.context.router.transitionTo(tab.props.route);
    this.setState({tabIndex: this._getSelectedIndex()});
  }

  _onRightIconButtonTouchTap() {
    if (document.fblogin === "connected") {
      this.refs.leftNav.toggle();
    }
    else {
      var valueScope = 'public_profile, email';
      FB.login(window.loginStatusCallback, { scope: valueScope });
    }
  }

  _getAppbar() {
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
      {
        position: 'absolute',
        top : Spacing.desktopKeylineIncrement,
        width: '100%',
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
        backgroundColor: Colors.deepPurple500,
        width: '100%',
        bottom:0,
      }
      : {
        backgroundColor: Colors.deepPurple500,
        width: 200,
        bottom:0,
      },
      tabItemContainerStyle: {
        backgroundColor: Colors.deepPurple500,
      },
      inkBarStyle : {
        backgroundColor : Colors.grey200,
        height: 5,
        marginTop: -5
      },
      tab: this.state.mobileView ?
      {
        backgroundColor: Colors.deepPurple500,
        height: 48,
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

    var yesOrNoIcon= (
      <EnhancedButton>
        <span style={styles.span}>
          <img src="img/yesno.png" style={styles.logo}/>
        </span>
      </EnhancedButton>);

    var rightButton = (
      <IconButton style={styles.userSetting}
        onTouchTap={this._onRightIconButtonTouchTap.bind(this)}
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
        onChange={this._handleTabChange.bind(this)}>
        <Tab
          value="1"
          label="NEW"
          style={styles.tab}
          route="new-asks" />
        <Tab
          value="2"
          label="HOT"
          style={styles.tab}
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
  }

  render() {
    var styles = this.getStyles();
    return (
      <div style={styles.root}>
        { this._getAppbar() }
        <RouteHandler />
        <AppLeftNav ref="leftNav" />
      </div>
    );
  }

}

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;


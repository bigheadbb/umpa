var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppLeftNav = require('./app-left-nav.jsx');
var FullWidthSection = require('./full-width-section.jsx');
var mui = require('material-ui');
var LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
var UserSetting = require('./svg-icons/user-setting.jsx');
var Search = require('./svg-icons/search.jsx');
var Home = require('./home.jsx');
var LoginSel = require('./login-select.jsx');

var { AppBar,
      AppCanvas,
      FontIcon,
      IconButton,
      EnhancedButton,
      Menu,
      Mixins,
      RaisedButton,
      Styles,
      Snackbar,
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
      tabIndex : '0',
      snackbarMessage : '',
      dialOpen : false,
    };
  },

  getStyles: function() {
    return {
      root: {
      }
    };
  },

  componentDidMount: function() {
    console.log("master componentDidMount");
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
        window.fbLoginStatusCallback(response);
        clearTimeout(timeout);
        this.setState({tabIndex: this._getSelectedIndex()});

        if (window.location.href.indexOf('#') === -1 || window.location.href.split('#')[1] === "/") {
          this.context.router.transitionTo('new-asks');
        }
      }.bind(this)
    );

    document.addEventListener("fbUserInfo",
      function statusChangeCallback(e) {
        console.log('master fbUserInfo statusChangeCallback');
        this.setState({snackbarMessage: "Hi, " + document.user.name});
        this.refs.snackbar.show();
      }.bind(this)
    );

    document.addEventListener("kakaoLogin",
      function statusChangeCallback(e) {
        console.log('master kakaoLogin statusChangeCallback');
        console.log(e.detail.res);
        var response = e.detail.res;
        window.kakaoLoginStatusCallback(response);
        clearTimeout(timeout);
        this.setState({tabIndex: this._getSelectedIndex()});

        if (window.location.href.indexOf('#') === -1 || window.location.href.split('#')[1] === "/") {
          this.context.router.transitionTo('new-asks');
        }
      }.bind(this)
    );

    document.addEventListener("kakaoUserInfo",
      function statusChangeCallback(e) {
        console.log('master fbUserInfo statusChangeCallback');
        this.setState({snackbarMessage: "Hi, " + document.user.name});
        this.refs.snackbar.show();
      }.bind(this)
    );

    // FIXME : Diable swipe because it makes wrong behavior sometimes
    //document.body.addEventListener('touchstart', this._onBodyTouchStart);
  },

  componentWillMount: function(){
    console.log("master componentWillMount");
    this.setState({tabIndex: this._getSelectedIndex()});
    var setTabsState = function() {
      this.setState({mobileView: (document.body.clientWidth <= 647)});
    }.bind(this);
    setTabsState();
    window.onresize = setTabsState;
  },

  componentWillReceiveProps: function() {
    console.log("master componentWillReceiveProps");
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

  _onRightUserSettingButtonTouchTap: function() {
    if (document.user !== undefined) {
      this.refs.rightSideMenu.toggle();
    }
    else {
      this._loginOpen();
    }
  },

  _onRightSearchButtonTouchTap: function() {
    this.context.router.transitionTo('search-asks');
  },

  _onMainIconTouchTap: function() {
    window.location = window.location.href.split('#')[0];
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
        left: (Spacing.desktopGutter/2) + 110,
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
        width: 200,
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
        height: 55,
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
        height: 55,
        fontWeight: 'bold',
      },
      userSetting: {
        position: 'fixed',
        right: Spacing.desktopGutter/2,
        top: 8,
        zIndex: 5,
        color: 'white'
      },
      search: {
        position: 'fixed',
        right: Spacing.desktopGutter/2 + 40,
        top: 8,
        zIndex: 5,
        color: 'white'
      },
      logo: {
        width: 76,
        height: 20
      }
    };

    var newTabStyle = this._getSelectedIndex() == 1 ? styles.selectedTab : styles.tab ;
    var hotTabStyle = this._getSelectedIndex() == 2 ? styles.selectedTab : styles.tab ;

    var yesOrNoIcon = (
      <EnhancedButton
        onTouchTap={this._onMainIconTouchTap}>
        <span style={styles.span}>
          <img src="img/askus.png" style={styles.logo}/>
        </span>
      </EnhancedButton>);

    var userSettingButton = (
      <IconButton style={styles.userSetting}
        onTouchTap={this._onRightUserSettingButtonTouchTap}
      >
        <UserSetting />
      </IconButton>
    );

    var searchButton = !this.context.router.isActive("search-asks") ?
    (
      <IconButton style={styles.search}
        onTouchTap={this._onRightSearchButtonTouchTap}
      >
        <Search />
      </IconButton>
    ) : null;

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

    return (
      <div>
        <Paper
          zDepth={0}
          rounded={false}
          style={styles.root}>
          {yesOrNoIcon}
          <div style={styles.container}>
            {tabs}
          </div>
          {searchButton}
          {userSettingButton}
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
        <AppLeftNav 
          ref="rightSideMenu" />
        <Snackbar
          ref="snackbar"
          autoHideDuration={2000}
          message={this.state.snackbarMessage} />
        <LoginSel
          openstate={this.state.dialOpen}
          close={this._loginClose}>
        </LoginSel>
      </div>
    );
  },

  _onBodyTouchStart: function (e) {
    var touchStartX = e.touches[0].pageX;
    var touchStartY = e.touches[0].pageY;

    this._maybeSwiping = true;
    this._touchStartX = touchStartX;
    this._touchStartY = touchStartY;

    document.body.addEventListener('touchend', this._onBodyTouchEnd);
    document.body.addEventListener('touchcancel', this._onBodyTouchEnd);
  },

  _onBodyTouchEnd: function (e) {
    if (this._maybeSwiping) {
      var currentX = e.changedTouches[0].pageX;
      var currentY = e.changedTouches[0].pageY;

      var dX = (currentX - this._touchStartX);
      var dY = (currentY - this._touchStartY);
      var dXAbs = Math.abs(currentX - this._touchStartX);
      var dYAbs = Math.abs(currentY - this._touchStartY);

      var thresholdX = 150;
      var thresholdY = 20;

      if (this.refs.rightSideMenu.isOpen() === false) {
        if (dXAbs > thresholdX && dX > 0 && dYAbs < thresholdY) {
          console.log("touch left swipe nav open : " + this.refs.rightSideMenu.isOpen());
          if (this.context.router.isActive("hot-asks")) {
            this.context.router.transitionTo('new-asks');
          } else if (this.context.router.isActive("my-asks")) {
            this.context.router.transitionTo('new-asks');
          } else if (this.context.router.isActive("voted-asks")) {
            this.context.router.transitionTo('new-asks');
          } else if (this.context.router.isActive("create-new-ask")) {
            this.context.router.transitionTo('new-asks');
          }
        }
        else if (dXAbs > thresholdX && dX < 0 && dYAbs < thresholdY) {
          console.log("touch right swipe nav open : " + this.refs.rightSideMenu.isOpen());
          if (this.context.router.isActive("new-asks")) {
            this.context.router.transitionTo('hot-asks');
          }
        }
      }
    }

    this._maybeSwiping = false;

    document.body.removeEventListener('touchend', this._onBodyTouchEnd);
    document.body.removeEventListener('touchcancel', this._onBodyTouchEnd);
  },

  _loginOpen: function() {
    this.setState({dialOpen: true});
  },

  _loginClose: function() {
    this.setState({dialOpen: false});
  },

});

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;


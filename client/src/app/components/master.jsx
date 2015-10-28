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
      data : "init" 
    };
  }

  getStyles() {
    return {
      root: {
      }
    };
  }

  componentDidMount() {
    setTimeout(
      function(){ 
        this.setState({data: "recieved"});
        this.setState({tabIndex: this._getSelectedIndex()});
        if (document.body.clientWidth <= 647) {
          this.context.router.transitionTo('feed');
        } else {
          this.context.router.transitionTo('new-feed');
        }
      }.bind(this), 2000);
  }

  componentWillMount(){
    this.setState({tabIndex: this._getSelectedIndex()});
    var setTabsState = function() {
      this.setState({renderTabs: !(document.body.clientWidth <= 647)});
      if (document.body.clientWidth <= 647) {
        this.context.router.transitionTo('feed');
      } else {
        this.context.router.transitionTo('new-feed');
      }
    }.bind(this);
    setTabsState();
    window.onresize = setTabsState;
  }

  componentWillReceiveProps() {
    this.setState({tabIndex: this._getSelectedIndex()});
  }

  _getSelectedIndex() {
    return this.context.router.isActive('new-feed') ? '1' :
      this.context.router.isActive('hot-feed') ? '2' :
      this.context.router.isActive('my-poll') ? '3' : '0';
  }

  _handleTabChange(value, e, tab) {
    this.context.router.transitionTo(tab.props.route);
    this.setState({tabIndex: this._getSelectedIndex()});
  }

  _onRightIconButtonTouchTap() {
    this.refs.leftNav.toggle();
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
      container: {
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
      tabs: {
        backgroundColor: Colors.deepPurple500,
        width: 200,
        bottom:0,
      },
      tabItemContainerStyle: {
        backgroundColor: Colors.deepPurple500,
      },
      inkBarStyle : {
      backgroundColor : Colors.yellow200,
      },
      tab: {
        backgroundColor: Colors.deepPurple500,
        height: 64
      },
      userSetting: {
        position: 'fixed',
        right: Spacing.desktopGutter/2,
        top: 8,
        zIndex: 5,
        color: 'white'
      },
    };

    var yesOrNoIcon= (
      <EnhancedButton>
        <span style={styles.span}>Y|N</span>
      </EnhancedButton>);

    var rightButton = (
      <IconButton style={styles.userSetting}
        onTouchTap={this._onRightIconButtonTouchTap.bind(this)}
      >
        <UserSetting />
      </IconButton>
    );

    var tabs = 
      this.state.renderTabs ? 
      (
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
            route="new-feed" />
          <Tab
            value="2"
            label="HOT"
            style={styles.tab}
            route="hot-feed"/>
          <Tab
            value="3"
            label="MY"
            style={styles.tab}
            route="my-poll"/>
         </Tabs>
       ) : null;

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
        { this.state.data == "recieved" ? this._getAppbar() : null }
        { this.state.data == "recieved" ? <RouteHandler /> : <Home /> }
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


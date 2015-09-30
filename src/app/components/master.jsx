var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppLeftNav = require('./app-left-nav.jsx');
var FullWidthSection = require('./full-width-section.jsx');
var mui = require('material-ui');
var LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');


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
    this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    }
  }

  getStyles() {
    var darkWhite = Colors.darkWhite;
    return {
      root: {
        margin: '0px'
      },
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center',
        padding: DesktopGutter + 'px'
      },
      a: {
        color: darkWhite
      },
      p: {
        margin: '0 auto',
        padding: '0',
        color: Colors.lightWhite,
        maxWidth: '335px'
      },
      iconButton: {
        color: darkWhite
      }
    };
  }

  componentDidMount() {
    document.addEventListener("fbLogin",
      function statusChangeCallback(e) {
        if (this.context.router.getCurrentPath() != "/home") {
          console.log('master fbLogin statusChangeCallback');
          console.log(e.detail.res);
          var response = e.detail.res;
          if (response.status == 'connected') {
            document.fblogin = "connected";
          } else if (response.status === 'not_authorized') {
            document.fblogin = "not_authorized";
            this.context.router.transitionTo('home');
          } else {
            document.fblogin = "not_logged";
            this.context.router.transitionTo('home');
          }
        }
      }.bind(this)
    );
  }

  componentWillMount(){
    /*
    ThemeManager.setComponentThemes({
      inkBar: {
        backgroundColor: Colors.yellow200,
      },
    });
    */
    this.setState({tabIndex: this._getSelectedIndex()});
    var setTabsState = function() {
      this.setState({renderTabs: !(document.body.clientWidth <= 647)});
    }.bind(this);
    setTabsState();
    window.onresize = setTabsState;
  }

  componentWillReceiveProps() {
    this.setState({tabIndex: this._getSelectedIndex()});
  }

  _getTabs() {
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
        right: 0,
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
      svgLogoContainer: {
        position: 'fixed',
        width: 300,
        left: Spacing.desktopGutter,
      },
      svgLogo: {
        width: 65,
        backgroundColor: Colors.deepPurple500,
        position: 'absolute',
        top: 20,
      },
      tabs: {
        backgroundColor: Colors.deepPurple500,
        width: 325,
        bottom:0,
      },
      tab: {
        backgroundColor: Colors.deepPurple500,
        height: 64
      }
    };

    var materialIcon= this.state.tabIndex !== '0' ? (
      <EnhancedButton
        linkButton={true}
        href="/#/home">
        <span style={styles.span}>Hide Book</span>
      </EnhancedButton>) : null;

    return(
      <div>
        <Paper
          zDepth={0}
          rounded={false}
          style={styles.root}>
          {materialIcon}
          <div style={styles.container}>
            <Tabs
              style={styles.tabs}
              value={this.state.tabIndex}
              onChange={this._handleTabChange.bind(this)}>
              <Tab
                value="1"
                label="GETTING STARTED"
                style={styles.tab}
                route="get-started" />
              <Tab
                value="2"
                label="FEED"
                style={styles.tab}
                route="feed"/>
            </Tabs>
          </div>
        </Paper>
      </div>
    );
  }

  _getAppBar() {
    var title =
      this.context.router.isActive('get-started') ? 'Get Started' :
      this.context.router.isActive('feed') ? 'Feed' :
      this.context.router.isActive('component') ? 'Component' :
      this.context.router.isActive('text-component') ? 'Text Component' :
      "";

    var githubButton = (
      <IconButton
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}/>
    );

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap.bind(this)}
          title={title}
          zDepth={0}
          iconElementRight={githubButton}
          style={{position: 'absolute',top: 0, backgroundColor: Colors.deepPurple500}}/>
      </div>);
  }

  _getSelectedIndex() {
    return this.context.router.isActive('get-started') ? '1' :
      this.context.router.isActive('feed') ? '2' : '0';
  }

  _handleTabChange(value, e, tab) {
    this.context.router.transitionTo(tab.props.route);
    this.setState({tabIndex: this._getSelectedIndex()});
  }

  render() {
    var styles = this.getStyles();
    var rightButton = (
      <IconButton
        iconStyle={styles.iconButton}
        iconClassName="muidocs-icon-custom-github"
        linkButton={true} />
    );

    var githubButton = (
      <IconButton
        iconStyle={styles.iconButton}
        iconClassName="muidocs-icon-custom-github"
        linkButton={true} />
    );

    return (
      <AppCanvas style={styles.root}>

        {this.state.renderTabs ? this._getTabs(): this._getAppBar()}

        <AppLeftNav ref="leftNav" />

        <RouteHandler />

        <div style={styles.footer}>
          <p style={styles.p}>
            Hide book was made by <a style={styles.a} href="https://github.com/luckypapa/AMAG/graphs/contributors">Big head brothers band</a>.
          </p>
        </div>

      </AppCanvas>
    );
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }
}

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;

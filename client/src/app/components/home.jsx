var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var CircularProgress = mui.CircularProgress;
var FullWidthSection = require('./full-width-section.jsx');

var {StylePropable, StyleResizable} = mui.Mixins;
var {Colors, Spacing, Typography} = mui.Styles;


var HomePage = React.createClass({

  mixins: [StylePropable, StyleResizable],

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    var style = {
    };

    return (
      <div style={style}>
        { this._getHomePageHero() }
      </div>
    );
  },

  _getHomePageHero: function() {
    var tagLigeMarginTop = (window.innerHeight - 72) / 2;

    var styles = {
      root: {
        backgroundColor: Colors.deepPurple500,
        height: window.innerHeight, 
      },
      svgLogo: {
        marginLeft: (window.innerWidth * 0.5) - 130 + 'px',
        width: '420px'
      },
      tagline: {
        textAlign: 'center',
        marginTop: tagLigeMarginTop,
      },
      label: {
        color: Colors.deepPurple500,
      },
      githubStyle: {
        margin: '16px 32px 0px 8px'
      },
      demoStyle: {
        margin: '16px 32px 0px 32px'
      },
      h1: {
        color: Colors.darkWhite,
        fontWeight: Typography.fontWeightLight,
        fontSize: 40
      },
      h2: {
        //.mui-font-style-title
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
      },
      nowrap: {
        whiteSpace: 'nowrap'
      },
      taglineWhenLarge: {
        marginTop: '32px'
      },
      h1WhenLarge: {
        fontSize: '56px'
      },
      h2WhenLarge: {
        //.mui-font-style-headline;
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px'
      },
      logo : {
        width: 144,
        height: 36,
      }
    };

    styles.h2 = this.mergeStyles(styles.h1, styles.h2);

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.h1 = this.mergeStyles(styles.h1, styles.h1WhenLarge);
      styles.h2 = this.mergeStyles(styles.h2, styles.h2WhenLarge);
    }

    return (
      <FullWidthSection style={styles.root}>
          <div style={styles.tagline}>
            <img src="img/askus.png" style={styles.logo}/>
          </div>
      </FullWidthSection>
    );
  }
});

module.exports = HomePage;

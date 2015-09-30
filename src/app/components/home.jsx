var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var HomeFeature = require('./home-feature.jsx');
var FullWidthSection = require('./full-width-section.jsx');

var {StylePropable, StyleResizable} = mui.Mixins;
var {Colors, Spacing, Typography} = mui.Styles;

var FacebookLogin = require('./fblogin.jsx');

var HomePage = React.createClass({

  mixins: [StylePropable, StyleResizable],

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    var style = {
      paddingTop: Spacing.desktopKeylineIncrement
    };

    return (
      <div style={style}>
        {this._getHomePageHero()}
      </div>
    );
  },

  _getHomePageHero: function() {
    var styles = {
      root: {
        backgroundColor: Colors.deepPurple500,
        overflow: 'hidden'
      },
      svgLogo: {
        marginLeft: (window.innerWidth * 0.5) - 130 + 'px',
        width: '420px'
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: '575px'
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
        fontSize: 30
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
      }
    };

    styles.h2 = this.mergeStyles(styles.h1, styles.h2);

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.tagline = this.mergeStyles(styles.tagline, styles.taglineWhenLarge);
      styles.h1 = this.mergeStyles(styles.h1, styles.h1WhenLarge);
      styles.h2 = this.mergeStyles(styles.h2, styles.h2WhenLarge);
    }

    return (
      <FullWidthSection style={styles.root}>
          <div style={styles.tagline}>
            <h1 style={styles.h1}>Y | N</h1>
            <h2 style={styles.h2}>
              Choose Now
            </h2>
            <FacebookLogin
              appId="1088597931155576"
              scope="public_profile,email,user_friends" />
          </div>
      </FullWidthSection>
    );
  }
});

module.exports = HomePage;

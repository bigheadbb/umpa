var React = require('react');
var mui = require('material-ui');
var FullWidthSection = require('./full-width-section.jsx');
var {Spacing, Typography} = mui.Styles;

class GetStarted extends React.Component {

  getStyles() {
    return {
      root: {
        paddingTop: Spacing.desktopKeylineIncrement
      },
      fullWidthSection: {
        maxWidth: '650px',
        margin: '0 auto'
      },
      headline: {
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '0px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: '#f00'//Typography.textDarkBlack
      }
    };
  }

  render() {
    var styles = this.getStyles();

    return (
      <div style={styles.root}>
        <FullWidthSection useContent={true}>
          <h2 style={styles.headline}>Lets getting start hide book</h2>
          <p>
             Talk with your facebook friends anonymously and freely    
          </p>
        </FullWidthSection>
      </div>
    );
  }

}

GetStarted.contextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = GetStarted;

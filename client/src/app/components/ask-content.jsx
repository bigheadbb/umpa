var React = require('react');
var mui = require('material-ui');
var {CardText, TextField} = mui;

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyTheme = require('./my-theme.jsx');

var AskResult = require('./ask-result.jsx');
var VoteButton = require('./vote-button.jsx');

var AskContent = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyTheme),
    };
  },

  render: function () {
    console.log("!!!!!!!Content rendered");
    var mainContent = this.props.data.mainContent.S;
    console.log('main content: ' + mainContent);

    var styles = {
      text: {
        width: '100%',
        pointerEvents: 'none'
      },
      underline: {
        display: 'none',
      }
    };
    var showContent = function () {
      return (
        <div>
          <TextField
            style={styles.text}
            underlineStyle={styles.underline}
            disabled={false}
            defaultValue={mainContent}
            rows={1}
            rowsMax={5}
            multiLine={true} />
        </div>
      );
    };

    return (
      <CardText expandable={true} >
        {showContent()}
        <VoteButton
          data={this.props.data} />
      </CardText>
    );
  }

});

module.exports = AskContent;

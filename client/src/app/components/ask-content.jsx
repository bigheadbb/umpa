var React = require('react');
var mui = require('material-ui');
var {CardText, TextField} = mui;
var Colors = mui.Styles.Colors;

var AskResult = require('./ask-result.jsx');
var VoteButton = require('./vote-button.jsx');
var VoteUser = require('./svg-icons/vote-user.jsx');

var AskContent = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  render: function () {
    console.log("!!!!!!!Content rendered");
    var mainContent = this.props.data.mainContent.S;
    var yesCount = parseInt(this.props.data.yesCount.N);
    var noCount = parseInt(this.props.data.noCount.N);
    var totalCount = yesCount + noCount;

    var styles = {
      root: {
         padding: "0px 16px 16px 16px"
       },
      vote: {
        textAlign: 'right',
        color : Colors.grey600,
        fontSize : 13,
        paddingRight: "5px"
      },
      text: {
        width: '100%',
        pointerEvents: 'none'
      },
      underline: {
        display: 'none',
      },
      totalVote: {
        position: 'relative',
        top: 2,
        width: 15,
        height: 15,
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
      <CardText
        style={styles.root}
        expandable={true} >
        {showContent()}
        <div style={styles.vote}>
          <VoteUser style={styles.totalVote} color={Colors.grey600} /> {totalCount}
        </div>
        <VoteButton
          data={this.props.data} />
      </CardText>
    );
  }

});

module.exports = AskContent;

var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var Colors = mui.Styles.Colors;
var CardActions = mui.CardActions;

var AskResult = React.createClass({
  render: function () {
    console.log("!!!!!!AskResult render");
    // TODO: it should show after voting
    var yesCount = parseInt(this.props.yesCount.N);
    var noCount = parseInt(this.props.noCount.N);
    var yesResult = (100 * yesCount / (yesCount + noCount)).toFixed(2);
    var noResult = (100 - yesResult).toFixed(2);
    console.log(yesResult + ' / ' + noResult);
    var styles = {
      resultArea: {
        width: '100%',
      },
      firstResult: {
        width: yesResult + '%',
      },
      secondResult: {
        width: noResult + '%',
      },
    };
    return (
      <CardActions expandable={true} >
        <div style={styles.resultArea}>
          <RaisedButton
            label={yesResult}
            primary={true} disabled={true}
            disabledBackgroundColor={Colors.pink300}
            disabledLabelColor={Colors.white}
            style={styles.firstResult} />
          <RaisedButton
            label={noResult}
            secondary={true} disabled={true}
            disabledBackgroundColor={Colors.cyan300}
            disabledLabelColor={Colors.white}
            style={styles.secondResult} />
        </div>
      </CardActions>
    );
  }
});

module.exports = AskResult;

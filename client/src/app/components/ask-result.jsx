var React = require('react');
var mui = require('material-ui');

var {CardText,
  LinearProgress} = mui;
var Colors = mui.Styles.Colors;

var AskResult = React.createClass({

  getInitialState: function() {
    return {
      show: false,
      result: 0
    };
  },

  render:  function () {
    console.log("!!!!!!AskResult render");

    var yesNoCount = this.props.yesNoCount;
    var totalCount = this.props.totalCount;
    console.log('yesNoCount: ' + yesNoCount + ', totalCount: ' + totalCount);
    var yesNoResultPercent = totalCount == 0 ?  50 : (100 * yesNoCount / totalCount).toFixed(2);
    console.log('percent: ' + yesNoResultPercent);
    var progressColor = this.props.color;
    var result = yesNoCount + " (" +  yesNoResultPercent + "%)";
    var styles = {
      root: this.state.show === true ?
      {
        marginTop: 10,
        height: 20,
        width: '100%',
        transition: 'width 2s',
        visibility: 'visible'
      } : {
        height: 0,
        width: 0,
        visibility: 'hidden'
      },
      progress : {
        backgroundColor: Colors.grey300,
      },
      result : {
        textAlign: 'right',
        marginTop: 3,
        color : progressColor,
        fontSize : 11
      }
    };

    return (
      <div style={styles.root}>
        <LinearProgress
          style={styles.progress}
          mode="determinate"
          color={progressColor}
          value={yesNoResultPercent} />
        <div style={styles.result}>
          {result}
        </div>
      </div>
    );
  },

  show: function (count) {
    console.log('AskResult show');
    this.setState({show: true, result: count});
  },
});

module.exports = AskResult;

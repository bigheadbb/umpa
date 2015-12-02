var React = require('react');
var mui = require('material-ui');
var CardActions = mui.CardActions;
var FlatButton = mui.FlatButton;

var VoteButton = React.createClass({
  render: function () {
    var styles = {
      buttonArea: {
        width: '100%',
      },
      selectButton: {
        width: '50%',
      },
    };
    return (
      <div style={styles.buttonArea} >
        <FlatButton
          label={'Yes'}
          primary={true}
          style={styles.selectButton} />
        <FlatButton
          label={'No'}
          secondary={true}
          style={styles.selectButton} />
      </div>
    );
  }
});

module.exports = VoteButton;

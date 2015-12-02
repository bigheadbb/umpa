var React = require('react');
var mui = require('material-ui');
var CardActions = mui.CardActions;
var FlatButton = mui.FlatButton;

var VoteButton = React.createClass({
  render: function () {
    console.log('!!!!!!VoteButton render');
    // TODO: it should hide after voting
    var firstSelection = 'Yes';
    var secondSelection = 'No';
    var styles = {
      buttonArea: {
        width: '100%',
      },
      selectButton: {
        width: '50%',
      },
    };
    return (
      <CardActions expandable={true} >
        <div style={styles.buttonArea} >
          <FlatButton
            label={firstSelection}
            primary={true}
            style={styles.selectButton} />
          <FlatButton
            label={secondSelection}
            secondary={true}
            style={styles.selectButton} />
        </div>
      </CardActions>
    );
  }
});

module.exports = VoteButton;

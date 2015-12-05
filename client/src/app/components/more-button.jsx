var React = require('react');
var mui = require('material-ui');
var FlatButton = mui.FlatButton;

var MoreButton = React.createClass({
  render: function () {
    var styles = {
      buttonArea: {
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
      },
      button: {
        width: '100%',
      },
    };
    return (
      <div style={styles.buttonArea} >
        <FlatButton
          label={'more'}
          style={styles.button} />
      </div>
    );
  }
});

module.exports = MoreButton;

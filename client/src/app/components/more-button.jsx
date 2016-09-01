var React = require('react');
var mui = require('material-ui');
var { FlatButton, CircularProgress } = mui;
var { Colors, } = mui.Styles;

var MoreButton = React.createClass({
  getInitialState: function () {
    return {show: 'showButton'};
  },

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
        backgroundColor : Colors.white
      },
      spinner: {
        margin: '-10px auto',
        display: 'block',
        paddingRight: 10
      },
     };

    var showButtonOrSpinner =
      this.state.show == "showButton" ?
      <FlatButton
        onTouchTap={this.props.onTouchTap}
        label={window.textSet.more}
        style={styles.button} />
      : <CircularProgress
        style={styles.spinner}
        mode="indeterminate"
        color={Colors.deepPurple500}
        size={0.5} />;

    return (
      <div style={styles.buttonArea} >
        {showButtonOrSpinner}
      </div>
    );
  },

  showSpinner: function() {
    console.log("showSpinner called")
    this.setState({show : 'showSpinner'})
  },

  showButton: function() {
    this.setState({show : 'showButton'})
  },
});

module.exports = MoreButton;

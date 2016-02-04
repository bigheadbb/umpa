var React = require('react');
var mui = require('material-ui');
var { FlatButton, CircularProgress } = mui;
var { Colors, } = mui.Styles;

var MoreButton = React.createClass({
  getInitialState: function () {
    // noShow, showButton, showSpinner
    return {show: this.props.show};
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
      no: {
        textAlign: 'center',
        color: Colors.grey500
      }
    };

    var showButtonOrSpinner;
    if (this.state.show === 'showButton') {
      showButtonOrSpinner = <FlatButton
        onTouchTap={this.props.onTouchTap}
        label={'more'}
        style={styles.button} />;
    } else if (this.state.show === 'showSpinner') {
      showButtonOrSpinner = <CircularProgress
        style={styles.spinner}
        mode="indeterminate"
        color={Colors.deepPurple500}
        size={0.5} />;
    } else {
      showButtonOrSpinner = <div style={styles.no}>{'NO ASK'}</div>;
    }

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

var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var { FlatButton, Dialog, TextField } = mui;
var Colors = mui.Styles.Colors;

var LoginSel = React.createClass({

  render: function() {
    var styles = {
      dialCont: {
        maxWidth: '350px',
      },
      dialTitle: {
        backgroundColor: Colors.grey300,
        height: '40px',
        paddingTop: '35px',
      },
      loginKaKaoBt: {
        width: '100%',
        height: '45px',
        float: 'left',
        marginTop: '5px',
      },
      loginFaceBookBt: {
        width: '100%',
        height: '45px',
        float: 'left',
        marginTop: '5px',
      },
      kakaoText: {
        color: "#3c1e1e",
        fontSize: '15px',
      },
      fbText: {
        color: Colors.white,
        fontSize: '15px',
      },
    };

    login = this.props.openstate;

    const actions = [
      <FlatButton
        label={window.textSet.dialogClose}
        keyboardFocused={true}
        onTouchTap={this._onClose} />,
    ];

    return (
      <div>
        <Dialog
          title={window.textSet.login}
          contentStyle={styles.dialCont}
          titleStyle={styles.dialTitle}
          actions={actions}
          open={login}
          onRequestClose={this._onClose}>
          <FlatButton
            style={styles.loginKaKaoBt}
            backgroundColor="#fce808"
            onTouchTap={this._logInKakao} >
            <div style={styles.kakaoText}>{window.textSet.kakaoLogin}</div>
          </FlatButton>
          <FlatButton
            style={styles.loginFaceBookBt}
            backgroundColor="#3b55a3"
            onTouchTap={this._logInFB} >
            <div style={styles.fbText}>{window.textSet.facebookLogin}</div>
          </FlatButton>
        </Dialog>
      </div>
    );
  },

  _onClose: function() {
  	this.props.close();
  },

  _logInKakao: function() {
    this._onClose();
    Kakao.Auth.login({success : function(response) {
      window.kakaoLoginSuccessCallback(response);
    }});
  },

  _logInFB: function() {
    this._onClose();
    var valueScope = 'public_profile, email';
    FB.login(window.fbLoginStatusCallback, { scope: valueScope });
  },
});

LoginSel.contextTypes = {
  router: React.PropTypes.func
};

module.exports = LoginSel;

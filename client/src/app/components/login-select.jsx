var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var { FlatButton, Dialog, TextField } = mui;
var Colors = mui.Styles.Colors;

var LoginSel = React.createClass({

  render: function() {
    var styles = {
      loginDial: {
        width: '250px',
      },
      loginRoot: {
        width: '200px',
        height: '45px',
        margin: '2px',
        position: 'left'
      },
      loginBt: {
        width: '100%',
        height: '100%'
      },
      loginIcon: {
        position: 'relative',
        float: 'left'
      },
      kakaoText: {
        color: "#3c1e1e",
        fontSize: '20px',
        fontWeight: '800',
        height: '100px',
        position: 'absolute',
        top: '7px',
        left: '50px'
      },
      facebookText: {
        color: Colors.white,
        fontSize: '20px',
        fontWeight: '700',
        height: '100px',
        position: 'absolute',
        top: '7px',
        left: '50px'
      }
    };

    login = this.props.openstate;

    return (
      <div>
        <Dialog
          title="You need to login"
          contentStyle={styles.loginDial}
          open={login}>
          <div style={styles.loginRoot}>
            <FlatButton style={styles.loginBt} onTouchTap={this._onClose}>
              <img src="img/kakaolong.png" style={styles.loginIcon}/>
              <div style={styles.kakaoText}>KakaoTalk</div>
            </FlatButton>
          </div>
          <div style={styles.loginRoot}>
            <FlatButton style={styles.loginBt} onTouchTap={this._logInFB}>
              <img src="img/facebooklong.png" style={styles.loginIcon}/>
              <div style={styles.facebookText}>Facebook</div>
            </FlatButton>
          </div>
        </Dialog>
      </div>
    );
  },

  _onClose: function() {
  	this.props.close();
  },

  _logInFB: function() {
    this._onClose();
  	var valueScope = 'public_profile, email';
    FB.login(window.loginStatusCallback, { scope: valueScope });
  },
});

LoginSel.contextTypes = {
  router: React.PropTypes.func
};

module.exports = LoginSel;

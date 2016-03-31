var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var CircularProgress = mui.CircularProgress;
var Dialog = mui.Dialog;
var {Colors, Spacing, Typography} = mui.Styles;

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return { connected : document.kakaologin };
  },

  render: function() {
    var styles = {
      label: {
        color: Colors.indigo800,
      },
      demoStyle: {
        margin: '16px 32px 0px 32px'
      }
    };

    var kakaoLogOutActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this.handleLogOutClick, ref: 'submit' }
    ];

    var drawElement =
        !this.state.connected ?
        <CircularProgress mode="indeterminate" size={0.8} color="white"/>
        : this.state.connected == "connected" ?
          <div>
          <RaisedButton
            className="sign-out"
            label="Logout with kakao"
            onTouchTap={this.handleLogOutDialogTouchTap}
            linkButton={true}
            style={styles.demoStyle}
            labelStyle={styles.label}/>
          <Dialog
            ref="logOutDialog"
            title="Logout with kakao"
            actions={kakaoLogOutActions}
            actionFocus="submit">
            Are you sure you want to logout kakao?
          </Dialog>
          </div>
        : <RaisedButton
            className="sign-in"
            label="Login with kakaotalk"
            onTouchTap={this.handleLogInClick}
            linkButton={true}
            style={styles.demoStyle}
            labelStyle={styles.label}/>;

    console.log("kakaolog status : " + this.state.connected);

    return (
      <div>
      {drawElement}
      </div>
    )
  },

  componentDidMount: function() {
    document.addEventListener("kakaoLogin",
     function statusChangeCallback(e) {
        console.log('kakao statusChangeCallback');
        console.log(e.detail.res);
        var response = e.detail.res;
        this.kakaoLoginStatusCallback(e.detail.res)
      }.bind(this)
    );
  },

  kakaoLoginStatusCallback: function(response) {
    console.log('kakaoLoginStatusCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for Kakao.Auoth.getStatus().
    if (response.status === 'connected') {
      console.log('response.status is connected');
      var uid = response.user.id;
      var accessToken = Kakao.Auth.getAccessToken();
      console.log('uid is : ' + uid);
      console.log('accessToken is : ' + accessToken);

      document.kakaologin = "connected";
      // Logged into your app and kakao.
      Kakao.API.request({
        url: '/v1/user/me',
        success: function(res) {
          console.log('Successful login for: ' + res.id);
          //doucument.user info must be configured identically with FB case
	  document.user.id = res.id;
          document.user.name = res.nickname;
          document.user.gender = NULL;
          document.user.email = NULL;
          document.user.age_range.min = 0;
          document.user.age_range.max = 0;
          document.user.profile_image = res.thumbnail_image;
          var event = new CustomEvent("kakaoUserInfo", {
            detail: {
                userInfo: res
            }
          });
          document.dispatchEvent(event);

          console.log(res);
        },
        fail: function(error) {
          alert(JSON.stringify(error))
        }
      });
    } else {
      console.log("the user isn't connected in to Kakao. Go login");
      document.kakaologin = "not_connected";
    }
  },

  handleLogInClick: function() {
    console.log('Kakao Login Click');
    Kakao.Auth.login({success : function(response) {
      this.kakaoLoginStatusCallback(response);
    }.bind(this)});
  },

  handleLogOutClick: function() {
    console.log('Kakao Logout Click');
    Kakao.Auth.logout(function(response) {
      this.kakaoLoginStatusCallback(response);
    }.bind(this));
  },

  handleLogOutDialogTouchTap : function() {
    this.refs.logOutDialog.show();
  }
});


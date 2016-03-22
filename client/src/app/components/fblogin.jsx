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
    return { connected : document.fblogin };
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

    var logOutActions = [
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
            label="Logout with facebook"
            onTouchTap={this.handleLogOutDialogTouchTap}
            linkButton={true}
            style={styles.demoStyle}
            labelStyle={styles.label}/>
          <Dialog
            ref="logOutDialog"
            title="Logout with facebook"
            actions={logOutActions}
            actionFocus="submit">
            Are you sure you want to logout facebook?
          </Dialog>
          </div>
        : <RaisedButton
            className="sign-in"
            label="Login with facebook"
            onTouchTap={this.handleLogInClick}
            linkButton={true}
            style={styles.demoStyle}
            labelStyle={styles.label}/>;

    console.log("fblog status : " + this.state.connected);

    return (
      <div>
      {drawElement}
      </div>
    )
  },

  componentDidMount: function() {
    document.addEventListener("fbLogin",
     function statusChangeCallback(e) {
        console.log('fbLogin statusChangeCallback');
        console.log(e.detail.res);
        var response = e.detail.res;
        this.fbLoginStatusCallback(e.detail.res)
      }.bind(this)
    );
  },

  fbLoginStatusCallback: function(response) {
    console.log('fbLoginStatusCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      console.log('response.status is connected');
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;
      console.log('uid is : ' + uid);
      console.log('accessToken is : ' + accessToken);

      // Logged into your app and Facebook.
      FB.api('/me', function(res) {
        console.log('Successful login for: ' + res.name);
        console.log(res);
        this.context.router.transitionTo('feed');
      }.bind(this));

      FB.api(
        "/me/friends",
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            console.log("friends list : ");
            console.log(response);
          }
        });

        FB.api(
        "/me/taggable_friends",
        function (response) {
          if (response && !response.error) {
            console.log("tag friends list : ");
            console.log(response);
          }
        });

        FB.api(
        "/me/friendlists",
        function (response) {
          if (response && !response.error) {
             console.log("all friends list : ");
            console.log(response);
          }
        });

      document.fblogin = "connected"
      // this.setState({connected : "connected"});

    } else if (response.status === 'not_authorized') {
      console.log("the user is logged in to Facebook, but has not authenticated your app");
      document.fblogin = "not_authorized";
      this.setState({connected : "not_authorized"});
    } else {
      console.log("the user isn't logged in to Facebook. Go login");
      document.fblogin = "not_logged";
      this.setState({connected : "not_logged"});
    }
  },

  handleLogInClick: function() {
    console.log('FB Login Click');
    var valueScope = this.props.scope || 'public_profile, email';
    FB.login(this.fbLoginStatusCallback, { scope: valueScope });
  },

  handleLogOutClick: function() {
    console.log('FB Logout Click');
    FB.logout(function(response) {
      this.fbLoginStatusCallback(response);
    }.bind(this));
  },

  handleLogOutDialogTouchTap : function() {
    this.refs.logOutDialog.show();
  }
});


/*
  <FacebookLogin
    appId="1088597931155576"
    scope="public_profile,email,user_friends" />
*/

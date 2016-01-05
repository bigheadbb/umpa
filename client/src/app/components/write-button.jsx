var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var { FloatingActionButton, } = mui;
var { Colors, } = mui.Styles;

var WritePencil = require('./svg-icons/write-pencil.jsx');
var CreateNewAsk = require('./create-new-ask.jsx');

var WriteButton = React.createClass({

  render: function() {
    var floatingButtonStyle = {
      position: 'fixed',
      right: '30px',
      bottom: '30px',
    };

    return (
      <div>
        <FloatingActionButton
          backgroundColor={Colors.deepPurple500}
          style={floatingButtonStyle}
          onTouchTap={this.handleCreateNewAsksButtonTouchTap}>
          <WritePencil />
        </FloatingActionButton>
      </div>
    );
  },

  handleCreateNewAsksButtonTouchTap : function() {
    if (document.fblogin === "connected") {
      this.context.router.transitionTo('create-new-ask');
    }
    else {
      var valueScope = 'public_profile, email';
      FB.login(window.loginStatusCallback, { scope: valueScope });
    }
  },
});

WriteButton.contextTypes = {
  router: React.PropTypes.func
};

module.exports = WriteButton;

var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var { Card, Dialog, FloatingActionButton, Paper, TextField, Toggle, Snackbar } = mui;
var { Colors, Spacing, Typography } = mui.Styles;

var WritePencil = require('./svg-icons/write-pencil.jsx');

var WriteButton = React.createClass({

  getInitialState: function() {
    return {
      result : ""
    };
  },

  render: function() {
    var floatingButtonStyle = {
      position: 'fixed',
      right: '30px',
      bottom: '30px',
    };

    var writePollActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this.handleCreateNewAskClick, ref: 'submit' }
    ];

    var dialogStyle = {
      width: '90%',
      height: window.innerHeight,
    }

    var dialogBodyStyle = {
    }

    var contentTextField = {
      width : '100%',
    }

    var yesOrNoDivStyle = {
      marginTop: '0px',
    }

    var yesOrNoTextField = {
      width : '100%',
    }

    return (
      <div>
        <FloatingActionButton
          backgroundColor={Colors.deepPurple500}
          style={floatingButtonStyle}
          onTouchTap={this.handleWritePollDialogTouchTap}>
          <WritePencil />
        </FloatingActionButton>
        <div>
          <Dialog
            contentStyle={dialogStyle}
            autoDetectWindowHeight={true}
            autoScrollBodyContent={true}
            ref="writePoll"
            actions={writePollActions}
            actionFocus="submit">
            <div style={dialogBodyStyle}>
              <div>
                <TextField
                  ref="contentTextField"
                  style={contentTextField}
                  rows={1}
                  rowsMax={7}
                  floatingLabelText="What do you want to ask?"
                  multiLine={true} />
              </div>
              <div style={yesOrNoDivStyle}>
                <TextField
                  style={yesOrNoTextField}
                  ref="yesTextField"
                  floatingLabelText="Yes"
                  rows={1}
                  rowsMax={5}
                  multiLine={true} />
                <TextField
                  style={yesOrNoTextField}
                  ref="noTextField"
                  floatingLabelText="No"
                  rows={1}
                  rowsMax={5}
                  multiLine={true} />
              </div>
            </div>
          </Dialog>
        </div>
        <Snackbar
            ref="snackbar"
            message={this.state.result} />
      </div>
    );
  },

  handleCreateNewAskClick: function(e) {
    console.log('handleNewAskClick called');
    this.refs.writePoll.dismiss();
    var url = 'http://54.65.152.112:5000/makeNewAsk';
    var poll = {};
    poll.askerId = document.user.id;
    poll.askerName = document.user.name;
    poll.mainContent = this.refs.contentTextField.getValue();
    poll.yesContent = this.refs.yesTextField.getValue();
    poll.noContent = this.refs.noTextField.getValue();

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: poll,
      success: function (res) {
        if (res.message === undefined) {
          this.setState({result: JSON.parse(res).result});
          window.newAsksState = "UpdateNeeded";
          this.context.router.refresh();
        }
        else {
          this.setState({result: res.message});
        }
        this.refs.snackbar.show();
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({result: "Ask create fail.."});
        this.refs.snackbar.show();
      }.bind(this),
    });
  },

  handleWritePollDialogTouchTap : function() {
    if (document.fblogin === "connected") {
      this.refs.writePoll.show();
    }
    else {
      var valueScope = 'public_profile, email';
      FB.login(window.loginStatusCallback, { scope: valueScope });
    }
  },

  handleContentToggleStatusChange: function() {
    console.log('toggle status changed');
  },
});

WriteButton.contextTypes = {
  router: React.PropTypes.func
};

module.exports = WriteButton;

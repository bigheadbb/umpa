var React = require('react');
var mui = require('material-ui');
var { Card, Dialog, FloatingActionButton, Paper, TextField, Toggle } = mui;
var { Colors, Spacing, Typography } = mui.Styles;

var WritePencil = require('./svg-icons/write-pencil.jsx');

var WriteButton = React.createClass({
  render: function() {
    var floatingButtonStyle = {
      position: 'fixed',
      right: '30px',
      bottom: '30px',
    };

    var writePollActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this.handleCreatePollClick, ref: 'submit' }
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
              <div style={{marginLeft: "calc(100% - 60px)"}}>
                <Toggle
                  name="toggleContent"
                  value="toggleContentValue"
                  ref="toggleContent"
                  onToggle={this.handleContentToggleStatusChange}
                  defaultToggled={true}/>
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
      </div>
    );
  },

  handleCreatePollClick: function(e) {
    console.log('New poll is being created');
    this.refs.writePoll.dismiss();
    var url = 'http://54.65.152.112:5000/createPoll';
    var poll = {};
    poll.mainContent = this.refs.contentTextField.getValue();
    poll.yesContent = this.refs.yesTextField.getValue();
    poll.noContent = this.refs.noTextField.getValue();

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: poll,
      success: function (res) {
        this.setState({data: res});
        alert(JSON.stringify(res));
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(url, status, err.toString());
      }.bind(this),
    });
  },

  handleWritePollDialogTouchTap : function() {
    this.refs.writePoll.show();
  },

  handleContentToggleStatusChange: function() {
    console.log('toggle status changed');
  },
});

module.exports = WriteButton;

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
      height: window.innerHeight,
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
          style={floatingButtonStyle} 
          onTouchTap={this.handleWritePollDialogTouchTap}>
          <WritePencil />
        </FloatingActionButton>
        <div >
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
              <div  style={{marginLeft: "calc(100% - 60px)"}}>
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
                  floatingLabelText="Yes"
                  rows={1}
                  rowsMax={5}
                  multiLine={true} />
                <TextField
                  style={yesOrNoTextField}
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

  handleCreatePollClick: function() {
    console.log('New poll was created');
    this.refs.writePoll.dismiss();
  },

  handleWritePollDialogTouchTap : function() {
    this.refs.writePoll.show();
  },

  handleContentToggleStatusChange: function() {
    console.log('toggle status changed');
  },
});

module.exports = WriteButton;

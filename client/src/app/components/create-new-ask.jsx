var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var { Card,
  Checkbox,
  FlatButton,
  IconButton,
  TextField,
  Paper,
  Snackbar,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  RaisedButton } = mui;
var { Colors, Spacing, Typography } = mui.Styles;

var Send = require('./svg-icons/send.jsx');
var Back = require('./svg-icons/back.jsx');
var SelectTarget = require('./select-target.jsx');
var MaxLength = 1000;

var CreateNewAsk = React.createClass({

  getInitialState: function() {
    return {
      sent : false,
      result : '',
    };
  },

  componentWillMount: function () {
    console.log('CreateNewAsk componentWillMount called');
    if (document.user === undefined) {
      console.log("the user isn't logged yet");
      this.context.router.transitionTo('new-asks');
      return;
    }
  },

  componentDidMount: function () {
    console.log('CreateNewAsk componentDidMount called');
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('CreateNewAsk componentWillUpdate called');
  },

  render: function() {

    var styles = {
      root: {
        backgroundColor : Colors.grey100,
      },
      containerStyle: {
        paddingTop: document.body.clientWidth <= 647 ? Spacing.desktopKeylineIncrement: Spacing.desktopKeylineIncrement,
        paddingBottom: 0,
        maxWidth: '650px',
        margin: '0 auto',
        backgroundColor : Colors.grey100,
      },
      textFieldStyle: {
        width : '100%',
      },
      textFieldContainer: {
        backgroundColor: Colors.white,
        paddingTop : 0,
        paddingBottom : 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
      },
      toolbar: {
        padding : '0px 10px 0px 10px',
      },
      toolbarTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.deepPurple500,
        textAlign: 'center',
        width: 'calc(100% - 112px)',
        paddingTop: 2,
      },
      iconButton: {
        marginTop: 4,
      },
      checkbox: {
        width: 70,
        marginTop: 5,
        marginLeft : "calc(100% - 65px)"
      },
      checkboxLabel: {
        color: Colors.grey700
      },
      checkboxIcon: {
        marginRight : 6,
      }
    };

    return (
      <div style={styles.root}>
        <div style={styles.containerStyle}>
          <Toolbar style={styles.toolbar}>
            <ToolbarGroup firstChild={true} float="left">
              <IconButton style={styles.iconButton} tooltip="Back" onTouchTap={this.handleBackButtonTouchTap} >
                <Back />
              </IconButton>
            </ToolbarGroup>
            <ToolbarTitle text="Make Ask" style={styles.toolbarTitle} />
            <ToolbarGroup float="right">
              <IconButton
                style={styles.iconButton}
                tooltip="Send"
                disabled={this.state.sent}
                onTouchTap={this.handleCreateNewAskTouchTap} >
                <Send />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
          <Paper style={styles.textFieldContainer}>
            <TextField
              style={styles.textFieldStyle}
              floatingLabelStyle={{color: Colors.grey700}}
              underlineFocusStyle={{borderColor: Colors.grey700}}
              id="title"
              ref="contentTextField"
              rows={1}
              rowsMax={7}
              floatingLabelText="What do you want to ask?"
              multiLine={true}
              onChange={this.countText} />
            <TextField
              style={styles.textFieldStyle}
              floatingLabelStyle={{color: Colors.pink500}}
              underlineFocusStyle={{borderColor: Colors.pink500}}
              id="yes"
              ref="yesTextField"
              primary={true}
              floatingLabelText="Yes"
              rows={1}
              rowsMax={5}
              multiLine={true}
              onChange={this.countText} />
            <TextField
              style={styles.textFieldStyle}
              floatingLabelStyle={{color: Colors.cyan500}}
              underlineFocusStyle={{borderColor: Colors.cyan500}}
              id="no"
              ref="noTextField"
              floatingLabelText="No"
              rows={1}
              rowsMax={5}
              multiLine={true}
              onChange={this.countText} />
            <SelectTarget ref="selectTarget" />
            <Checkbox
              label="secret"
              ref="secretCheckBox"
              iconStyle={styles.checkboxIcon}
              labelStyle={styles.checkboxLabel}
              style={styles.checkbox} />
          </Paper>
        </div>
        <Snackbar
          ref="snackbar"
          message={this.state.result} />
      </div>
    );
  },

  countText: function(e) {
    var name = e.target.id;
    var length = e.target.value.length;

    switch(name){
      case 'title' :
        if (length > MaxLength)
          this.refs.contentTextField.setErrorText("Warning: Limit text to 1000 characters.("+length+"/"+MaxLength+")");
        else
          this.refs.contentTextField.setErrorText("");
        break;
      case 'yes' :
        if (length > MaxLength)
          this.refs.yesTextField.setErrorText("Warning: Limit text to 1000 characters.("+length+"/"+MaxLength+")");
        else
          this.refs.yesTextField.setErrorText("");
        break;
      case 'no' :
        if(length > MaxLength)
          this.refs.noTextField.setErrorText("Warning: Limit text to 1000 characters.("+length+"/"+MaxLength+")");
        else
          this.refs.noTextField.setErrorText("");
        break;
    }    
  },

  handleCreateNewAskTouchTap: function(e) {
    console.log('handleNewAskClick called');

    if (this.state.sent === true) {
      console.log('cancel duplicate call');
      return;
    }

    this.setState({sent: true});
    var url = window.server.url+'/makeNewAsk';
    var poll = {};
    poll.askerId = document.user.id;
    poll.askerName = this.refs.secretCheckBox.isChecked() ? "Anonymous" : document.user.name;
    poll.profileImage = this.refs.secretCheckBox.isChecked() ? "Anonymous" : document.user.profile_image;
    poll.mainContent = this.refs.contentTextField.getValue().substring(0, 1000);
    poll.yesContent = this.refs.yesTextField.getValue().substring(0, 1000);
    poll.noContent = this.refs.noTextField.getValue().substring(0, 1000);
    poll.gender = this.refs.selectTarget.getGender();
    poll.age = this.refs.selectTarget.getAge();
    poll.secret = this.makeSecretValue();

    console.log("poll");
    console.log(poll);

    if (poll.mainContent.length < 1
       || poll.yesContent.length < 1
       || poll.noContent.length < 1) {
      this.setState({result: "One and more text field value were empty"});
      this.refs.snackbar.show();
      this.setState({sent: false});
      return;
    }

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: poll,
      success: function (res) {
        if (res.message === undefined) {
          this.setState({result: JSON.parse(res).result});
          window.newAsksState = "UpdateNeeded";
          window.myAsksState = "UpdateNeeded";
          setTimeout(
            function(){
              this.context.router.transitionTo('new-asks');
            }.bind(this)
            , 1000
          );
        }
        else {
          this.setState({result: res.message});
        }
        this.refs.snackbar.show();
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({result: "Ask create fail.."});
        this.refs.snackbar.show();
        this.setState({sent: false});
      }.bind(this),
    });
  },
  
  handleBackButtonTouchTap: function(e) {
    this.context.router.transitionTo('new-asks');
  },

  makeSecretValue: function() {
    if (!this.refs.secretCheckBox.isChecked())
      return "none";

    if (document.user !== undefined && document.user.gender !== undefined ) {
      if (document.user.gender === "female")
        return "Ms. Lady"
      if (document.user.gender === "male")
        return "Mr. Gentleman"
    }

    return "Anonymous"
  }
});

CreateNewAsk.contextTypes = {
  router: React.PropTypes.func
};

module.exports = CreateNewAsk;

var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var { Slider, Styles, Tab, Tabs, IconButton, Toolbar, ToolbarTitle, ToolbarGroup } = require('material-ui');
var { Colors, Spacing, Typography } = mui.Styles;

var CardList = require('./card-list.jsx');
var WriteButton = require('./write-button.jsx');
var Back = require('./svg-icons/back.jsx');
var MoreButton = require('./more-button.jsx');

myVotedAsksItem = [];

var VotedAsks = React.createClass({

  getInitialState: function () {
    return {data:[]};
  },

  componentWillMount: function () {
    console.log('Voted asks componentWillMount called');
    console.log('window.myVotedAsksState is ', window.myVotedAsksState);

    if (document.user === undefined) {
      console.log("the user isn't logged yet");
      this.context.router.transitionTo('new-asks');
      return;
    }

    var query = {};
    var now = new Date().getTime();
    query.date = now;
    query.askerId = document.user.id;
    console.log('check userId ', query.askerId);

    if (window.myVotedAsksState === undefined || window.myVotedAsksState === "UpdateNeeded") {
      window.myVotedAsksState = "Updating";
      $.ajax({
        url: window.server.url+'/getMyVotedAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          myVotedAsksItem = data.Items;
          this.setState({data: myVotedAsksItem});
        }.bind(this),
        error: function (xhr, status, erro) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      window.myVotedAsksState = "Updated";
    } else if (window.myVotedAsksState === "Updated"){
      this.setState({data: myVotedAsksItem});
    }
  },

  componentDidMount: function () {
    console.log('Voted asks componentDidMount called');
    console.log('window.te is ', window.myVotedAsksState);
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('Voted asks componentWillUpdate called');
    console.log('window.myVotedAsksState is ', window.myVotedAsksState);

    if (document.user === undefined) {
      console.log("the user isn't logged yet");
      this.context.router.transitionTo('new-asks');
      return;
    }

    if (window.myVotedAsksState === undefined || window.myVotedAsksState === "UpdateNeeded") {
      var query = {};
      var now = new Date().getTime();
      query.date = now;
      query.askerId = document.user.id;

      $.ajax({
        url: window.server.url+'/getMyVotedAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          myVotedAsksItem = data.Items;
          this.setState({data: myVotedAsksItem});
        }.bind(this),
        error: function (xhr, status, erro) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });

      window.myVotedAsksState = "Updated";
    }
  },

  getMyVotedAsks: function(dateTime) {
    console.log('Voted asks getMyVotedAsks called');
    var query = {};
    var now = new Date().getTime();
    query.date = dateTime ? dateTime : now;
    query.askerId = document.user.id;

    $.ajax({
      url: window.server.url+'/getMyVotedAsks',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (recievedData) {
        console.log(recievedData.Items);
        if (recievedData.Items !== undefined && recievedData.Count > 1) {
          myVotedAsksItem = myVotedAsksItem.concat(recievedData.Items);
          setTimeout( function() {
            this.setState({data: myVotedAsksItem})
          }.bind(this), 1000);
        }
        setTimeout( function() {
          this.refs.moreButton.showButton();
        }.bind(this), 1000);
      }.bind(this),
      error: function (xhr, status, erro) {
        this.refs.moreButton.showButton();
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {

    var styles = {
      root: {
        backgroundColor: Colors.grey100,
      },
      containerStyle: {
        paddingTop: document.body.clientWidth <= 647 ? Spacing.desktopKeylineIncrement: Spacing.desktopKeylineIncrement,
        paddingBottom: 0,
        maxWidth: '650px',
        margin: '0 auto',
        backgroundColor: Colors.grey100,
      },
      toolbar: {
        padding: '0px 10px 0px 10px',
      },
      iconButton: {
        marginTop: 4,
      },
      toolbarTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.deepPurple500,
        textAlign: 'center',
        width: 'calc(100% - 112px)',
        paddingTop: 2,
      },
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
          <ToolbarTitle text="My Voted Asks" style={styles.toolbarTitle} />
        </Toolbar>
        <CardList data={this.state.data}/>
        <MoreButton
          ref='moreButton'
          onTouchTap={this.handleMoreButtonTouchTap} />
      </div>
      <WriteButton />
      </div>
    );
  },

  handleBackButtonTouchTap: function(e) {
    this.context.router.transitionTo('new-asks');
  },

  handleMoreButtonTouchTap: function() {
    console.log("handleMoreButtonTouchTap");
    console.log(myVotedAsksItem);
    console.log(myVotedAsksItem.length);
    this.refs.moreButton.showSpinner();
    if (myVotedAsksItem.length > 0) {
      this.getMyVotedAsks(myVotedAsksItem[myVotedAsksItem.length-1].date.S);
    } else {
      this.getMyVotedAsks(new Date().getTime().toString());
    }
  },
});

VotedAsks.contextTypes = {
  router: React.PropTypes.func
};

module.exports = VotedAsks;


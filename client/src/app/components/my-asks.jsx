var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var { Slider, Styles, Tab, Tabs, IconButton, Toolbar, ToolbarTitle, ToolbarGroup } = require('material-ui');
var { Colors, Spacing, Typography } = mui.Styles;

var MyCardList = require('./my-card-list.jsx');
var WriteButton = require('./write-button.jsx');
var Back = require('./svg-icons/back.jsx');

myAsks = {};

var MyAsks = React.createClass({

  getInitialState: function () {
    return {data:[]};
  },

  componentWillMount: function () {
    console.log('My asks componentWillMount called');
    console.log('window.myAsksState is ', window.myAsksState);

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

    if (window.myAsksState === undefined || window.myAsksState === "UpdateNeeded") {
      window.myAsksState = "Updating";
      $.ajax({
        url: 'http://54.65.152.112:5000/getMyAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          myAsks = data.Items;
          this.setState({data: myAsks});
        }.bind(this),
        error: function (xhr, status, erro) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      window.myAsksState = "Updated";
    } else if (window.myAsksState === "Updated"){
      this.setState({data: myAsks});
    }
  },

  componentDidMount: function () {
    console.log('My asks componentDidMount called');
    console.log('window.te is ', window.myAsksState);
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('My asks componentWillUpdate called');
    console.log('window.myAsksState is ', window.myAsksState);

    if (document.user === undefined) {
      console.log("the user isn't logged yet");
      this.context.router.transitionTo('new-asks');
      return;
    }

    if (window.myAsksState === undefined || window.myAsksState === "UpdateNeeded") {
      var query = {};
      var now = new Date().getTime();
      query.date = now;
      query.askerId = document.user.id;

      $.ajax({
        url: 'http://54.65.152.112:5000/getMyAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          myAsks = data.Items;
          this.setState({data: myAsks});
        }.bind(this),
        error: function (xhr, status, erro) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });

      window.myAsksState = "Updated";
    }
  },

  getMyAsks: function() {
    console.log('My asks getMyAsks called');
    var query = {};
    var now = new Date().getTime();
    query.date = now;
    query.askerId = document.user.id;

    $.ajax({
      url: 'http://54.65.152.112:5000/getMyAsks',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (data) {
        myAsks = data.Items;
        this.setState({data: myAsks});
      }.bind(this),
      error: function (xhr, status, erro) {
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
          <ToolbarTitle text="My Asks" style={styles.toolbarTitle} />
        </Toolbar>
        <MyCardList data={this.state.data}/>
      </div>
      <WriteButton />
      </div>
    );
  },

  handleBackButtonTouchTap: function(e) {
    this.context.router.transitionTo('new-asks');
  },
});

MyAsks.contextTypes = {
  router: React.PropTypes.func
};

module.exports = MyAsks;

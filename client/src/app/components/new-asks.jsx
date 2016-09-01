var React = require('react');
var mui = require('material-ui');
var { Colors, Spacing } = mui.Styles;

var CardList = require('./card-list.jsx');
var WriteButton = require('./write-button.jsx');
var MoreButton = require('./more-button.jsx');

newAsks = [];
hotAsks = [];

var NewAsks = React.createClass({

  getInitialState: function () {
    return {newAsksData: [], hotAsksData: [], hotAsksMoreButtonShow : true};
  },

  componentWillMount: function () {
    console.log('New asks componentWillMount called');
    console.log('window.newAsksState is ', window.newAsksState);
    this.tabIndex = '1';

    if (window.newAsksState === undefined || window.newAsksState === "UpdateNeeded") {
      var query = {};
      query.date = new Date().getTime();
      window.newAsksState = "Updating";

      $.ajax({
        url: window.server.url+'/getNewAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          newAsks = data.Items;
          this.setState({newAsksData: newAsks});
        }.bind(this),
        error: function (xhr, status, erro) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      window.newAsksState = "Updated";
    } else if (window.newAsksState === "Updated"){
      this.setState({newAsksData: newAsks});
    }

    if (window.hotAsksState === undefined || window.hotAsksState === "UpdateNeeded") {
      var NUMBER_MAX_VALUE = 999999999999999999999999;
      var query = {};
      query.voteCount = NUMBER_MAX_VALUE;

      window.hotAsksState = "Updating";
      $.ajax({
        url: window.server.url+'/getHotAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          hotAsks = data.Items;
          this.setState({hotAsksData: hotAsks.slice(0, 5)});
          console.log("hotAsks : " + hotAsks);
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      window.hotAsksState = "Updated";
    } else if (window.hotAsksState === "Updated"){
      this.setState({hotAsksData: hotAsks});
    }
  },

  componentDidMount: function () {
    console.log('New asks componentDidMount called');
    console.log('window.newAsksState is ', window.newAsksState);
    document.addEventListener("tabChanged",
      function statusChangeCallback(e) {
        this.tabIndex = e.detail.value;
      }.bind(this)
    );
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('New asks componentWillUpdate called');
    console.log('New asks window.newAsksState is ', window.newAsksState);

    if (window.newAsksState === undefined || window.newAsksState === "UpdateNeeded") {
      var query = {};
      query.date = new Date().getTime();
      window.newAsksState = "Updating";

      $.ajax({
        url: window.server.url+'/getNewAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          newAsks = data.Items;
          this.setState({newAsksData: newAsks});
        }.bind(this),
        error: function (xhr, status, erro) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });

      window.newAsksState = "Updated";
    }

    if (window.hotAsksState === undefined || window.hotAsksState === "UpdateNeeded") {
      var NUMBER_MAX_VALUE = 999999999999999999999999;
      var query = {};
      query.voteCount = NUMBER_MAX_VALUE;

      window.hotAsksState = "Updating";
      $.ajax({
        url: window.server.url+'/getHotAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          hotAsks = data.Items;
          this.setState({hotAsksData: hotAsks.slice(0, 5)});
          console.log("hotAsks : " + hotAsks);
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      window.hotAsksState = "Updated";
    }
  },

  getNewAsks: function(dateTime) {
    console.log('New asks getNewAsks called');
    var query = {};
    var now = new Date().getTime();
    query.date = dateTime ? dateTime : now;

    $.ajax({
      url: window.server.url+'/getNewAsks',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (recievedData) {
        console.log(recievedData.Items);
        if (recievedData.Items !== undefined && recievedData.Count > 1) {
          newAsks = newAsks.concat(recievedData.Items);
          setTimeout( function() {
            this.setState({newAsksData: newAsks})
          }.bind(this), 1000);
        }
        setTimeout( function() {
          console.log("jungo");
          this.refs.newAsksMoreButton.showButton();
        }.bind(this), 1000);
      }.bind(this),
      error: function (xhr, status, erro) {
        this.refs.newAsksMoreButton.showButton();
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    console.log("new Asks rendering : " + this.tabIndex);
    var root = {
      backgroundColor : Colors.grey100,
    };

    var containerStyle = {
      paddingTop: document.body.clientWidth <= 647 ? Spacing.desktopKeylineIncrement+48: Spacing.desktopKeylineIncrement,
      paddingBottom: 0,
      maxWidth: '650px',
      margin: '0 auto',
      backgroundColor : Colors.grey100,
    };

    var newTabStyle = this.tabIndex === "1" ?
    {
      position: "absolute",
      top: document.body.clientWidth <= 647 ? Spacing.desktopKeylineIncrement+48: Spacing.desktopKeylineIncrement,
      width: "100%",
      maxWidth : 650,
    }
    : {
      position: "absolute",
      top: document.body.clientWidth <= 647 ? Spacing.desktopKeylineIncrement+48: Spacing.desktopKeylineIncrement,
      top: -10000,
      left: -10000,
      width: "100%",
      maxWidth : 650,
    };

    var hotTabStyle = this.tabIndex === "2" ?
    {
      position: "absolute",
      top: document.body.clientWidth <= 647 ? Spacing.desktopKeylineIncrement+48: Spacing.desktopKeylineIncrement,
      width: "100%",
      maxWidth : 650,
    }
    : {
      position: "absolute",
      top: document.body.clientWidth <= 647 ? Spacing.desktopKeylineIncrement+48: Spacing.desktopKeylineIncrement,
      top: -10000,
      left: -10000,
      width: "100%",
      maxWidth : 650,
    };

    var hotAsksMoreButton = this.state.hotAsksMoreButtonShow ?
      <MoreButton
        ref='hotAsksMoreButton'
        onTouchTap={this.handleHotAsksMoreButtonTouchTap} />
      : null;

    return (
      <div style={root}>
      <div style={containerStyle}>
        <div style={newTabStyle}>
          <CardList data={this.state.newAsksData}/>
          <MoreButton
            ref='newAsksMoreButton'
            onTouchTap={this.handleNewAsksMoreButtonTouchTap} />
        </div>
        <div style={hotTabStyle}>
          <CardList data={this.state.hotAsksData}/>
          {hotAsksMoreButton}
        </div>
      </div>
      <WriteButton />
      </div>
    );
  },

  handleNewAsksMoreButtonTouchTap: function() {
    console.log("handleNewAsksMoreButtonTouchTap");
    console.log(newAsks);
    console.log(newAsks.length);
    this.refs.newAsksMoreButton.showSpinner();
    if (newAsks.length > 0) {
      this.getNewAsks(newAsks[newAsks.length-1].date.S);
    } else {
      this.getNewAsks(new Date().getTime().toString());
    }
  },

  handleHotAsksMoreButtonTouchTap: function() {
    console.log("handleHotAsksMoreButtonTouchTap");
    console.log(hotAsks);
    console.log(hotAsks.length);
    this.refs.hotAsksMoreButton.showSpinner();
    setTimeout( function() {
      this.setState({hotAsksData: hotAsks, hotAsksMoreButtonShow: false});
    }.bind(this), 1000);
  },
});

NewAsks.contextTypes = {
  router: React.PropTypes.func
};

module.exports = NewAsks;


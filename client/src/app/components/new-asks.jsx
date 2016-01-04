var React = require('react');
var mui = require('material-ui');
var { Slider, Styles, Tab, Tabs } = require('material-ui');
var { Colors, Spacing, Typography } = mui.Styles;

var CardList = require('./card-list.jsx');
var WriteButton = require('./write-button.jsx');

var NewAsks = React.createClass({

  Asks : {
  },

  getInitialState: function () {
    return {data:[]};
  },

  componentWillMount: function () {
    window.newAsksState = undefined;
    console.log('New asks componentWillMount called');
    console.log('window.newAsksState is ', window.newAsksState);
    var query = {};
    var now = new Date().getTime();
    query.date = now;

    window.newAsksState = "Updating";
    $.ajax({
      url: 'http://54.65.152.112:5000/getNewAsks',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (data) {
        this.setState({data: data.Items});
        Asks = data.Items;
      }.bind(this),
      error: function (xhr, status, erro) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    window.newAsksState = "Updated";
  },

  componentDidMount: function () {
    console.log('New asks componentDidMount called');
    console.log('window.newAsksState is ', window.newAsksState);
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('New asks componentWillUpdate called');
    console.log('window.newAsksState is ', window.newAsksState);

    if (window.newAsksState === undefined || window.newAsksState === "UpdateNeeded") {
      var query = {};
      var now = new Date().getTime();
      query.date = now;

      $.ajax({
        url: 'http://54.65.152.112:5000/getNewAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          this.setState({data: data.Items});
        }.bind(this),
        error: function (xhr, status, erro) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });

      window.newAsksState = "Updated";
    }
  },

  getNewAsks: function() {
    console.log('New asks getNewAsks called');
    var query = {};
    var now = new Date().getTime();
    query.date = now;

    $.ajax({
      url: 'http://54.65.152.112:5000/getNewAsks',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (data) {
        this.setState({data: data.Items});
      }.bind(this),
      error: function (xhr, status, erro) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
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

    return (
      <div style={root}>
      <div style={containerStyle}>
        <CardList data={this.state.data}/>
      </div>
      <WriteButton />
      </div>
    );
  },
});

module.exports = NewAsks;

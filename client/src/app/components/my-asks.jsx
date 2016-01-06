var React = require('react');
var mui = require('material-ui');
var { Slider, Styles, Tab, Tabs } = require('material-ui');
var { Colors, Spacing, Typography } = mui.Styles;

var MyCardList = require('./my-card-list.jsx');
var WriteButton = require('./write-button.jsx');

var MyAsks = React.createClass({

  myAsksItem : {
  },

  getInitialState: function () {
    return {data:[]};
  },

  componentWillMount: function () {
    console.log('My asks componentWillMount called');
    console.log('window.myAsksState is ', window.myAsksState);
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
          this.setState({data: data.Items});
          myAsksItem = data.Items;
        }.bind(this),
        error: function (xhr, status, erro) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      window.myAsksState = "Updated";
    } else if (window.myAsksState === "Updated"){
      this.setState({data: myAsksItem});
    }
  },

  componentDidMount: function () {
    console.log('My asks componentDidMount called');
    console.log('window.te is ', window.myAsksState);
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('My asks componentWillUpdate called');
    console.log('window.myAsksState is ', window.myAsksState);

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
          this.setState({data: data.Items});
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
        this.setState({data: data.Items});
      }.bind(this),
      error: function (xhr, status, erro) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    var root = {
      backgroundColor : Colors.grey200,
    };

    var containerStyle = {
      paddingTop: document.body.clientWidth <= 647 ? Spacing.desktopKeylineIncrement+48: Spacing.desktopKeylineIncrement,
      paddingBottom: 0,
      maxWidth: '650px',
      margin: '0 auto',
      backgroundColor : Colors.grey200,
    };

    return (
      <div style={root}>
      <div style={containerStyle}>
        <MyCardList data={this.state.data}/>
      </div>
      <WriteButton />
      </div>
    );
  },
});

module.exports = MyAsks;

var React = require('react');
var mui = require('material-ui');
var { Slider, Styles, Tab, Tabs } = require('material-ui');
var { Colors, Spacing, Typography } = mui.Styles;

var CardList = require('./card-list.jsx');
var WriteButton = require('./write-button.jsx');

var NewAsks = React.createClass({
  getInitialState: function () {
    return {data:[]};
  },

  componentWillMount: function () {
    console.log('New asks are being loaded');
    $.ajax({
      url: 'http://54.65.152.112:5000/query',
      dataType: 'json',
      type: 'GET',
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
      paddingTop: document.body.clientWidth <= 647 ? 0: Spacing.desktopKeylineIncrement,
      paddingBottom: 0,
      maxWidth: '650px',
      margin: '0 auto',
      backgroundColor : Colors.grey200,
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

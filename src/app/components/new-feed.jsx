var React = require('react');
var mui = require('material-ui');
var { Slider, Styles, Tab, Tabs } = require('material-ui');
var { Colors, Spacing, Typography } = mui.Styles;

var CardList = require('./card-list.jsx');
var FavoriteList = require('./favorite-list.jsx');

var newFeed = React.createClass({
  loadContent: function () {
    // TODO: show data of content from server
    // this.setState({data: {content:{author:"", time:"", text:""}}});
  },

  componentDidMount: function () {
    this.loadContent();
  },

  getInitialState: function () {
    return {data:[]};
  },

  render: function() {
    var root = {
      backgroundColor : Colors.grey600,
    };

    var containerStyle = {
      paddingTop: Spacing.desktopKeylineIncrement,
      paddingBottom: 0,
      maxWidth: '650px',
      margin: '0 auto',
      backgroundColor : Colors.grey600,
    };

    return (
      <div style={root}>
      <div style={containerStyle}>
        <CardList/>
      </div>
      </div>
    );
  },
});

module.exports = newFeed;

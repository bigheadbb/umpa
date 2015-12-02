var React = require('react');
var mui = require('material-ui');
var { Slider, Styles, Tab, Tabs } = require('material-ui');
var { Colors, Spacing, Typography } = mui.Styles;

var CardList = require('./card-list.jsx');
var WriteButton = require('./write-button.jsx');

var MyAsks = React.createClass({
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
      backgroundColor : Colors.grey200,
    };

    var containerStyle = {
      paddingTop: document.body.clientWidth <= 647 ? 0: Spacing.desktopKeylineIncrement,
      paddingBottom: 0,
      maxWidth: '650px',
      margin: '0 auto',
      backgroundColor : Colors.grey200,
    };

    var button = (document.body.clientWidth <= 647 ? null : <WriteButton />);

    return (
      <div style={root}>
      <div style={containerStyle}>
        <CardList/>
      </div>
      {button}
      </div>
    );
  },
});

module.exports = MyAsks;

var React = require('react');
var mui = require('material-ui');
var { Slider, Styles, Tab, Tabs } = mui;
var { Colors, Spacing, Typography } = mui.Styles;

var WriteButton = require('./write-button.jsx');
var NewAsks = require('./new-asks.jsx');
var HotAsks = require('./hot-asks.jsx');
var MyAsks = require('./my-asks.jsx');

var Feed = React.createClass({
  loadContent: function () {
    // TODO: show data of content from server
    console.log('Feed is mounted');
  },

  componentDidMount: function () {
    this.loadContent();
  },

  getInitialState: function () {
    return {data:[]};
  },

  render: function() {
    var containerStyle = {
      paddingTop: Spacing.desktopKeylineIncrement,
      paddingBottom: 0,
      maxWidth: '650px',
      margin: '0 auto',
    };

    var inkBarStyle = {
      backgroundColor : Colors.grey200,
      height: 5,
      marginTop: -5
    };

    var tabItemContainerStyle = {
      backgroundColor : Colors.deepPurple500,
    };

    var tabStyle = {
      backgroundColor : Colors.grey200,
    };

    var labelStyle = {
     fontWeight: 'bold',
    };

    return (
      <div>
        <div style={containerStyle}>
          <Tabs style={tabStyle} tabItemContainerStyle={tabItemContainerStyle} inkBarStyle={inkBarStyle} >
            <Tab label='NEW' style={labelStyle}>
              <NewAsks/>
            </Tab>
            <Tab label='HOT' style={labelStyle}>
              <HotAsks/>
            </Tab>
          </Tabs>
        </div>
        <WriteButton />
      </div>
    );
  },
});

module.exports = Feed;

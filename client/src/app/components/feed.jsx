var React = require('react');
var mui = require('material-ui');
var { Slider, Styles, Tab, Tabs, FloatingActionButton } = mui;
var { Colors, Spacing, Typography } = mui.Styles;

var CardList = require('./card-list.jsx');
var FavoriteList = require('./favorite-list.jsx');
var WriteButton = require('./write-button.jsx');
var NewFeed = require('./new-feed.jsx');
var HotFeed = require('./hot-feed.jsx');
var MyPoll = require('./my-poll.jsx');

var Feed = React.createClass({
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
    var containerStyle = {
      paddingTop: Spacing.desktopKeylineIncrement,
      paddingBottom: 0,
      maxWidth: '650px',
      margin: '0 auto',
    };

    var inkBarStyle = {
      backgroundColor : Colors.yellow400,
      height: 5,
      marginTop: -5
    };

    var tabItemContainerStyle = {
      backgroundColor : Colors.deepPurple500,
    };

    var tabStyle = {
      backgroundColor : Colors.grey300,
    };

    return (
      <div>
        <div style={containerStyle}>
          <Tabs style={tabStyle} tabItemContainerStyle={tabItemContainerStyle} inkBarStyle={inkBarStyle} >
            <Tab label='NEW' >
              <NewFeed/>
            </Tab>
            <Tab label='HOT' >
              <HotFeed/>
            </Tab>
            <Tab label='MY'>
              <MyPoll/>
            </Tab>
          </Tabs>
        </div>
        <WriteButton />
      </div>
    );
  },
});

module.exports = Feed;

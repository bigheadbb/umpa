var React = require('react');
var mui = require('material-ui');
var { Slider, Styles, Tab, Tabs, FloatingActionButton } = mui;
var { Colors, Spacing, Typography } = mui.Styles;

var CardList = require('./card-list.jsx');
var FavoriteList = require('./favorite-list.jsx');
var WriteButton = require('./write-button.jsx');

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
      backgroundColor : Colors.yellow200,
    };

    var tabItemContainerStyle = {
      backgroundColor : Colors.deepPurple500,
    };

    var tabStyle = {
      backgroundColor : Colors.grey300,
    };

    var floatingButtonStyle = {
      position: 'fixed',
      right: '30px',
      bottom: '30px',
    };

    return (
      <div>
        <div style={containerStyle}>
          <Tabs style={tabStyle} tabItemContainerStyle={tabItemContainerStyle} inkBarStyle={inkBarStyle} >
            <Tab label='NEW' >
              <CardList/>
            </Tab>
            <Tab label='HOT' >
              <FavoriteList/>
            </Tab>
            <Tab label='MY'>
              <CardList/>
            </Tab>
          </Tabs>
        </div>
        <WriteButton />
      </div>
    );
  },
});

module.exports = Feed;

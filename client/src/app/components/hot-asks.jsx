var React = require('react');
var mui = require('material-ui');
var { Slider, Styles, Tab, Tabs } = require('material-ui');
var { Colors, Spacing, Typography } = mui.Styles;

var CardList = require('./card-list.jsx');
var WriteButton = require('./write-button.jsx');

hotAsks = [];

var HotAsks = React.createClass({

  getInitialState: function () {
    return {data:[]};
  },

  componentWillMount: function () {
    console.log('Hot asks componentWillMount called');
    console.log('window.hotAsksState is ', window.hotAsksState);
    var NUMBER_MAX_VALUE = 999999999999999999999999;
    var query = {};
    query.voteCount = NUMBER_MAX_VALUE;

    if (window.hotAsksState === undefined || window.hotAsksState === "UpdateNeeded") {
      window.hotAsksState = "Updating";
      $.ajax({
        url: window.server.url+'/getHotAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          hotAsks = data.Items;
          console.log("hotAsks : " + hotAsks);
          this.setState({data: hotAsks, valid: true});
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      window.hotAsksState = "Updated";
    } else if (window.hotAsksState === "Updated"){
      console.log("hotAsks : " + hotAsks);
      this.setState({data: hotAsks});
    }
  },

  componentDidMount: function () {
    console.log('Hot asks componentDidMount called');
    console.log('window.hotAsksState is ', window.hotAsksState);
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('Hot asks componentWillUpdate called');
    console.log('window.hotAsksState is ', window.hotAsksState);
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

HotAsks.contextTypes = {
  router: React.PropTypes.func
};

module.exports = HotAsks;


var React = require('react');
var mui = require('material-ui');
var { Colors, Spacing } = mui.Styles;

var CardList = require('./card-list.jsx');
var WriteButton = require('./write-button.jsx');
var MoreButton = require('./more-button.jsx');

newAsks = [];

var NewAsks = React.createClass({

  getInitialState: function () {
    return {data: []};
  },

  componentWillMount: function () {
    console.log('New asks componentWillMount called');
    console.log('window.newAsksState is ', window.newAsksState);
    var query = {};
    query.date = new Date().getTime();

    if (window.newAsksState === undefined || window.newAsksState === "UpdateNeeded") {
      window.newAsksState = "Updating";
      $.ajax({
        url: window.server.url+'/getNewAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          newAsks = data.Items;
          this.setState({data: newAsks});

          // prepare hot asks data
          setTimeout( function() {
            this.prepareHotAsks();
          }.bind(this), 2000);

        }.bind(this),
        error: function (xhr, status, erro) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      window.newAsksState = "Updated";
    } else if (window.newAsksState === "Updated"){
      this.setState({data: newAsks});
    }
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
      query.date = new Date().getTime();

      $.ajax({
        url: window.server.url+'/getNewAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          newAsks = data.Items;
          this.setState({data: newAsks});
        }.bind(this),
        error: function (xhr, status, erro) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });

      window.newAsksState = "Updated";
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
            this.setState({data: newAsks})
          }.bind(this), 1000);
        }
        setTimeout( function() {
          this.refs.moreButton.showButton();
        }.bind(this), 1000);
      }.bind(this),
      error: function (xhr, status, erro) {
        this.refs.moreButton.showButton();
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  prepareHotAsks: function() {
    console.log("prepareHotAsks called");
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
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      window.hotAsksState = "Updated";
    }
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
        <MoreButton
          ref='moreButton'
          onTouchTap={this.handleMoreButtonTouchTap} />
      </div>
      <WriteButton />
      </div>
    );
  },

  handleMoreButtonTouchTap: function() {
    console.log("handleMoreButtonTouchTap");
    console.log(newAsks);
    console.log(newAsks.length);
    this.refs.moreButton.showSpinner();
    if (newAsks.length > 0) {
      this.getNewAsks(newAsks[newAsks.length-1].date.S);
    } else {
      this.getNewAsks(new Date().getTime().toString());
    }
  },
});

NewAsks.contextTypes = {
  router: React.PropTypes.func
};

module.exports = NewAsks;


var React = require('react');
var mui = require('material-ui');
var { Colors, Spacing } = mui.Styles;

var CardList = require('./card-list.jsx');
var WriteButton = require('./write-button.jsx');
var MoreButton = require('./more-button.jsx');

var NewAsks = React.createClass({

  Asks : {
  },

  getInitialState: function () {
    return {data: [], valid: false};
  },

  componentWillMount: function () {
    console.log('New asks componentWillMount called');
    console.log('window.newAsksState is ', window.newAsksState);
    var query = {};
    query.date = new Date().getTime();

    if (window.newAsksState === undefined || window.newAsksState === "UpdateNeeded") {
      window.newAsksState = "Updating";
      $.ajax({
        url: 'http://54.65.152.112:5000/getNewAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          this.setState({data: data.Items, valid: true});
          Asks = data.Items;
        }.bind(this),
        error: function (xhr, status, erro) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      window.newAsksState = "Updated";
    } else if (window.newAsksState === "Updated"){
      this.setState({data: Asks});
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
      query.askerId = document.user.id;

      $.ajax({
        url: 'http://54.65.152.112:5000/getNewAsks',
        dataType: 'json',
        data : query,
        type: 'POST',
        cache: false,
        success: function (data) {
          this.setState({data: data.Items, valid: true});
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
    query.askerId = document.user.id;

    $.ajax({
      url: 'http://54.65.152.112:5000/getNewAsks',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (recievedData) {
        console.log(recievedData.Items);
        if (recievedData.Items !== undefined && recievedData.Count > 1) {
          Asks = Asks.concat(recievedData.Items);
          setTimeout( function() {
            this.setState({data: Asks, valid: true})
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
    console.log(Asks);
    console.log(Asks.length);
    this.refs.moreButton.showSpinner();
    this.getNewAsks(Asks[Asks.length-1].date.S);
  },
});

module.exports = NewAsks;

var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var { Card, FlatButton, IconButton, TextField, Paper, Snackbar, Toolbar, ToolbarGroup, ToolbarTitle, RaisedButton } = mui;
var { Colors, Spacing, Typography } = mui.Styles;

var Send = require('./svg-icons/send.jsx');
var Back = require('./svg-icons/back.jsx');
var CloseCircle = require('./svg-icons/close-circle.jsx');

var CardList = require('./card-list.jsx');
var MoreButton = require('./more-button.jsx');

searchAsks = [];

var SearchAsks = React.createClass({

  getInitialState: function() {
    return {
      result : '',
      data:[],
    };
  },

  componentWillMount: function () {
    console.log('CreateNewAsk componentWillMount called');
  },

  componentDidMount: function () {
    console.log('CreateNewAsk componentDidMount called');
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('CreateNewAsk componentWillUpdate called');
  },

  render: function() {

    var styles = {
      root: {
        backgroundColor : Colors.grey100,
      },
      containerStyle: {
        paddingTop: document.body.clientWidth <= 647 ? Spacing.desktopKeylineIncrement: Spacing.desktopKeylineIncrement,
        paddingBottom: 0,
        maxWidth: '650px',
        margin: '0 auto',
        backgroundColor : Colors.grey100,
      },
      textFieldStyle: {
        width: 'calc(100% - 27px)',
      },
      textFieldContainer: {
        backgroundColor: Colors.white,
        paddingTop: 0,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
      },
      toolbar: {
        padding: '0px 10px 0px 10px',
      },
      toolbarTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.deepPurple500,
        textAlign: 'center',
        width: 'calc(100% - 112px)',
        paddingTop: 2,
      },
      iconButton: {
        marginTop: 4,
      },
      clearButton: {
        padding: 4,
        width: 24,
        height: 24,
        top: 5,
      }
    };

    var ShowMoreButton = this.state.data.length > 0 ?
    (
      <MoreButton
        ref='moreButton'
        onTouchTap={this.handleMoreButtonTouchTap} />
    ) : null;

    return (
      <div style={styles.root}>
        <div style={styles.containerStyle}>
          <Toolbar style={styles.toolbar}>
            <ToolbarGroup firstChild={true} float="left">
              <IconButton style={styles.iconButton} tooltip="Back" onTouchTap={this.handleBackButtonTouchTap} >
                <Back />
              </IconButton>
            </ToolbarGroup>
            <ToolbarTitle text="Search" style={styles.toolbarTitle} />
            <ToolbarGroup float="right">
              <IconButton style={styles.iconButton} tooltip="Search" onTouchTap={this.handleSearchButtonTouchTap} >
                <Send />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
          <Paper style={styles.textFieldContainer}>
            <TextField
              ref="searchField"
              style={styles.textFieldStyle}
              hintStyle={{fontSize : 13}}
              hintText="#tag..."
              underlineFocusStyle={{borderColor: Colors.grey500}}
              multiLine={false} />
            <IconButton style={styles.clearButton} onTouchTap={this.handleClearTextButtonTouchTap} >
                <CloseCircle />
            </IconButton>
          </Paper>
          <CardList data={this.state.data}/>
          {ShowMoreButton}
        </div>
        <Snackbar
          ref="snackbar"
          autoHideDuration={1500}
          message={this.state.result} />
      </div>
    );
  },

  getSearchAsksByTag: function(dateTime) {
    console.log('New asks getNewAsks called');
    var query = {};
    var now = new Date().getTime();
    query.tag = '#'+this.refs.searchField.getValue();
    query.date = dateTime ? dateTime : now;

    $.ajax({
      url: window.server.url+'/getSearchAsksByTag',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (recievedData) {
        console.log(recievedData);
        searchAsks = recievedData.Items;
        this.setState({data: searchAsks});
        this.lastSearchTag = query.tag;

        if (searchAsks.length < 1) {
          this.setState({result: "No result, please type another tag..."});
          this.refs.snackbar.show();
        }
      }.bind(this),
      error: function (xhr, status, erro) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getMoreSearchAsksByTag: function(dateTime) {
    console.log('New asks getNewAsks called');
    var query = {};
    var now = new Date().getTime();
    query.tag = this.lastSearchTag;
    query.date = dateTime ? dateTime : now;

    $.ajax({
      url: window.server.url+'/getSearchAsksByTag',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (recievedData) {
        console.log(recievedData);
        if (recievedData.Items !== undefined && recievedData.Count > 1) {
          searchAsks = searchAsks.concat(recievedData.Items);
          setTimeout( function() {
            this.setState({data: searchAsks})
          }.bind(this), 1000);
        }
        setTimeout( function() {
          this.refs.moreButton.showButton();
        }.bind(this), 1000);
      }.bind(this),
      error: function (xhr, status, erro) {
        console.error(this.props.url, status, err.toString());
        this.refs.moreButton.showButton();
      }.bind(this)
    });
  },

  handleBackButtonTouchTap: function(e) {
    this.context.router.transitionTo('new-asks');
  },

  handleSearchButtonTouchTap: function(e) {
    console.log("search text : " + this.refs.searchField.getValue());
    if (this.refs.searchField.getValue().length < 1) {
      this.setState({result: "Please type #tag..."});
      this.refs.snackbar.show();
      return;
    }

    this.getSearchAsksByTag();
  },

  handleClearTextButtonTouchTap: function(e) {
    console.log("handleClearTextButtonTouchTap");
    this.refs.searchField.clearValue();
  },

  handleMoreButtonTouchTap: function() {
    console.log("handleMoreButtonTouchTap");
    console.log(searchAsks);
    console.log(searchAsks.length);
    if (searchAsks.length !== 0) {
      this.refs.moreButton.showSpinner();
      this.getMoreSearchAsksByTag(searchAsks[searchAsks.length-1].date.S);
    }
  },
});

SearchAsks.contextTypes = {
  router: React.PropTypes.func
};

module.exports = SearchAsks;


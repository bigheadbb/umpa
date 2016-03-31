var React = require('react');
var mui = require('material-ui');
var { IconButton, Toolbar, ToolbarTitle, ToolbarGroup } = require('material-ui');
var { Colors, Spacing, } = mui.Styles;

var CardList = require('./card-list.jsx');
var Back = require('./svg-icons/back.jsx');
var WriteButton = require('./write-button.jsx');

var AskByIdex = React.createClass({

  getInitialState: function () {
    return {data: []};
  },

  componentWillMount: function () {
    console.log('AskByIdex componentWillMount called');
    var query = {};
    query.index = window.location.href.split("index=")[1];

    $.ajax({
      url: 'http://54.65.152.112:5001/getAskByIndex',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (responseData) {
        this.setState({data: responseData.Items});
      }.bind(this),
      error: function (xhr, status, erro) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function () {
    console.log('AskByIdex componentDidMount called');
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('AskByIdex componentWillUpdate called');
  },

  render: function() {
    var styles = {
      root: {
        backgroundColor: Colors.grey100,
      },
      containerStyle: {
        paddingTop: document.body.clientWidth <= 647 ? Spacing.desktopKeylineIncrement: Spacing.desktopKeylineIncrement,
        paddingBottom: 0,
        maxWidth: '650px',
        margin: '0 auto',
        backgroundColor : Colors.grey100,
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
      noData: {
        color: Colors.grey700,
        fontSize: 15,
        textAlign: "center",
        marginTop: 5,
      }
    };

    var CardContent = this.state.data.length > 0 ?
                        <CardList data={this.state.data}/>
                        : <div style={styles.noData}>No data, Please recheck index value...</div>;

    return (
      <div style={styles.root}>
      <div style={styles.containerStyle}>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup firstChild={true} float="left">
            <IconButton style={styles.iconButton} tooltip="Back" onTouchTap={this.handleBackButtonTouchTap} >
              <Back />
            </IconButton>
          </ToolbarGroup>
          <ToolbarTitle text="What's your choice?" style={styles.toolbarTitle} />
        </Toolbar>
        {CardContent}
      </div>
      <WriteButton />
      </div>
    );
  },

  handleBackButtonTouchTap: function(e) {
    this.context.router.transitionTo('new-asks');
  },
});

AskByIdex.contextTypes = {
  router: React.PropTypes.func
};

module.exports = AskByIdex;

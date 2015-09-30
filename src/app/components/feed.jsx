/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react');
var mui = require('material-ui');
var Avatar = mui.Avatar;
var Card = mui.Card;
var CardActions = mui.CardActions;
var CardHeader = mui.CardHeader;
var CardText = mui.CardText;
var ClearFix = mui.ClearFix;
var Colors = mui.Styles.Colors;
var IconButton = mui.IconButton;
var TextField = mui.TextField;

var QuestionMark = require('./svg-icons/question-mark.jsx');

var {Spacing, Typography} = mui.Styles;

var Content = React.createClass({
  render: function () {
    console.log("Content render");
    var showContent = function (content) {
      return (
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/>
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.<br/>
          Donec vulputate interdum sollicitudin.<br/>
          Nunc lacinia auctor quam sed pellentesque.<br/>
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </div>
      );
    }();
    return (
      <div className="content">
        {showContent}
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function () {
    console.log("Comment render");
    var showComments = function (comment) {
      var styles = {
        commentStyle: {
          marginBottom: 7,
        },
        commentAvatarStyle: {
          marginRight: 10,
        },
      };
      return (
        <div style={styles.commentStyle}>
          <Avatar size={30} style={styles.commentAvatarStyle}> A </Avatar>
          This is a sample of comment.
        </div>
      );
    }();
    return (
      <div className="comment">
        {showComments}
        {showComments}
        {showComments}
        {showComments}
      </div>
    );
  }
});

var CardList = React.createClass({
  render: function () {

    console.log("CardList render");
    var showCards = function () {
      var styles = {
        textfield: {
          width: "100%",
        },
        cardtext: {
          backgroundColor: Colors.gray300,
          paddingBottom: 1,
          borderTop: 'solid 1px #e0e0e0',
        },
        cardlist: {
          marginTop: 15,
        }
      };
      console.log("showCards render");
      return (
        <div style={styles.cardlist}>
          <Card>
            <CardHeader
              avatar={<Avatar>A</Avatar>}
              title="author"
              subtitle="time" />
            <CardText>
              <Content data="Content"/>
            </CardText>
            <CardActions>
              <IconButton tooltip="Who?">
                <QuestionMark color={Colors.grey400} />
              </IconButton>
            </CardActions>
            <CardText style={styles.cardtext}>
              <Comment data="Comments"/>
              <TextField
                hintText="It will be read by some friends of yours."
                style={styles.textfield}/>
            </CardText>
          </Card>
        </div>
      );
    }();
    console.log("showCards end");
    return (
      <div className="cardList">
        {showCards}
        {showCards}
        {showCards}
      </div>
    );
  }
});

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
      paddingTop: Spacing.desktopKeylineIncrement + 10,
      paddingBottom: 15,
      maxWidth: '650px',
      margin: '0 auto',
    };

    return (
      <div style={containerStyle}>
        <CardList/>
      </div>
    );
  },
});

module.exports = Feed;

var React = require('react');
var mui = require('material-ui');
var {Avatar,
  Card,
  CardActions,
  CardHeader,
  CardText,
  FlatButton,
  TextField } = mui;
var Colors = mui.Styles.Colors;

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyTheme = require('./my-theme.jsx');

var AskResult = require('./ask-result.jsx');
var MoreButton = require('./more-button.jsx');
var VoteButton = require('./vote-button.jsx');

var Author = React.createClass({
  render: function () {
    console.log("!!!!!!Author rendered");
    console.log(this.props.userId.S);
    console.log(this.props.userName.S);
    console.log(this.props.date.S);
    var userId = this.props.userId.S;
    var author = this.props.userName.S;
    var yearMonthDay = new Date(parseInt(this.props.date.S)).toDateString();
    var time = new Date(parseInt(this.props.date.S)).toTimeString().split(' ')[0];
    var profile_photo = "http://graph.facebook.com/"+userId+"/picture?type=small";
    return (
      <CardHeader
        avatar={<Avatar src={profile_photo}></Avatar>}
        title={author}
        subtitle={yearMonthDay+", "+time}
        showExpandableButton={true} />
    );
  }
});

var Content = React.createClass({

  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyTheme),
    };
  },

  render: function () {
    console.log("!!!!!!Content rendered");
    var mainContent = this.props.mainContent.S;
    var yesContent = this.props.yesContent.S;
    var noContent = this.props.noContent.S;
    console.log(yesContent);
    console.log(noContent);

    var yesCount = parseInt(this.props.yesCount.N);
    var noCount = parseInt(this.props.noCount.N);
    var toTotalCount = yesCount + noCount;

    var styles = {
      yesButton: {
        color: Colors.pink300,
        width: 'calc(100% - 11px)',
        paddingLeft: 5,
        fontSize : 14,
        pointerEvents: 'none'
      },
      noButton: {
        color: Colors.cyan700,
        width: 'calc(100% - 11px)',
        paddingLeft: 5,
        fontSize : 14,
        pointerEvents: 'none'
      },
    };
    var showContent = function () {
      return (
        <div>
          <div>
            <TextField
              style={{width:'100%', pointerEvents: 'none'}}
              underlineStyle={{display:'none'}}
              disabled={false}
              defaultValue={mainContent}
              type='text'
              rows={1}
              rowsMax={5}
              multiLine={true} />
          </div>
          <div>
            <span style={{color:Colors.pink500, fontSize: 9, fontWeight:'bold', paddingLeft: 3}}>YES</span>
            <FlatButton
              style={{width:'100%', backgroundColor:Colors.pink50, pointerEvents: 'none'}}
              primary={true} >
              <TextField
                style={styles.yesButton}
                underlineStyle={{display:'none'}}
                disabled={false}
                defaultValue={yesContent}
                type='text'
                rows={1}
                rowsMax={10}
                multiLine={true} />
            </FlatButton>
          </div>
          <AskResult
            ref="yesResult"
            show={true}
            yesNoCount={yesCount}
            totalCount={toTotalCount}
            color={Colors.pink300} />
          <div style={{marginTop : 15}}>
            <span style={{color:Colors.cyan500 , fontSize: 9, fontWeight:'bold', paddingLeft: 3}}>NO</span>
            <FlatButton
              style={{width:'100%', backgroundColor:Colors.cyan50, pointerEvents: 'none'}}
              secondary={true} >
              <TextField
                style={styles.noButton}
                underlineStyle={{display:'none'}}
                disabled={false}
                defaultValue={noContent}
                type='text'
                rows={1}
                rowsMax={10}
                multiLine={true} />
            </FlatButton>
          </div>
          <AskResult
            ref="noResult"
            show={true}
            Count={noCount}
            totalCount={toTotalCount}
            color={Colors.cyan500} />
        </div>
      );
    }.bind(this);
    return (
      <CardText expandable={true} >
        {showContent()}
      </CardText>
    );
  },
});


var MyCardList = React.createClass({
  render: function () {
    console.log("!!!!!!!MyCardList render");

    var cards;
    var styles = {
      card: {
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
      }
    };

    if (this.props.data === undefined) {
      cards = function () {
        return (
          <div></div>
        );
      }();
    } else {
      cards = this.props.data.map(function (ask) {
        console.log(JSON.stringify(ask));
        return (
          <Card
            key={ask.index.S}
            initiallyExpanded={true}
            style={styles.card} >
            <Author userName={ask.userName} userId={ask.userId} date={ask.date} />
            <Content mainContent={ask.mainContent}
              yesContent={ask.yesContent}
              noContent={ask.noContent}
              yesCount={ask.yesCount}
              noCount={ask.noCount} />
          </Card>
        );
      });
    }

    return (
      <div className="MyCardList">
        {cards}
        <MoreButton />
      </div>
    );
  }
});

module.exports = MyCardList;

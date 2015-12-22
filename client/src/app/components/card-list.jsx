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
    console.log(this.props.date.S);
    var author = this.props.userId.S;
    var yearMonthDay = new Date(parseInt(this.props.date.S)).toDateString();
    var time = new Date(parseInt(this.props.date.S)).toTimeString().split(' ')[0];
    return (
      <CardHeader
        avatar={<Avatar>A</Avatar>}
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
    var styles = {
      yesButton: {
        textAlign: "left",
        color: Colors.pink300,
        width: '100%',
        borderWidth: "1px 1px 1px 15px",
        borderStyle: "solid",
        borderColor: Colors.pink500,
      },
      noButton: {
        textAlign: "left",
        color: Colors.cyan700,
        width: '100%',
        borderWidth: "1px 1px 1px 15px",
        borderStyle: "solid",
        borderColor: Colors.cyan500,
      },
    };
    var showContent = function () {
      return (
        <div>
          <div>
            <TextField
              style={{width:'100%'}}
              underlineDisabledStyle={{display:'none'}}
              disabled={true}
              defaultValue={mainContent}
              rows={1}
              rowsMax={5}
              multiLine={true} />
          </div>
          <div>
            <TextField
              style={{width:'100%'}}
              floatingLabelText="Yes"
              floatingLabelStyle={{color:Colors.pink500}}
              underlineDisabledStyle={{display:'none'}}
              disabled={true}
              rows={1}
              rowsMax={5}
              multiLine={true} />
            <FlatButton
              label={yesContent}
              primary={true}
              style={styles.yesButton} />
          </div>
          <div>
            <TextField
              style={{width:'100%'}}
              floatingLabelText="No"
              floatingLabelStyle={{color:Colors.cyan500}}
              underlineDisabledStyle={{display:'none'}}
              disabled={true}
              rows={1}
              rowsMax={5}
              multiLine={true} />
            <FlatButton
              label={noContent}
              secondary={true}
              style={styles.noButton} />
          </div>
        </div>
      );
    };
    return (
      <CardText expandable={true} >
        {showContent()}
      </CardText>
    );
  }
});


var CardList = React.createClass({
  render: function () {
    console.log("!!!!!!!CardList render");

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
            <Author userId={ask.userId} date={ask.date} />
            <Content mainContent={ask.mainContent}
              yesContent={ask.yesContent}
              noContent={ask.noContent} />
          </Card>
        );
      });
    }

    return (
      <div className="cardList">
        {cards}
        <MoreButton />
      </div>
    );
  }
});

module.exports = CardList;

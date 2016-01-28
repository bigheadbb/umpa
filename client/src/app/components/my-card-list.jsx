var React = require('react');
var mui = require('material-ui');
var {Avatar,
  Card,
  CardActions,
  CardHeader,
  CardText,
  Checkbox,
  FlatButton,
  TextField } = mui;
var Colors = mui.Styles.Colors;

var AskResult = require('./ask-result.jsx');
var VoteButton = require('./vote-button.jsx');

var Crowns = require('./crowns.jsx');
var Ages = require('./ages.jsx');
var Gender = require('./gender.jsx');

var AskHeader = React.createClass({
  render: function () {
     var styles = {
      author: {
        width:'70%',
        float: 'left',
      },
      crownContainer: {
        width:'64px',
        height:'72px',
        float:'right',
        paddingRight:'16px',
      },
    };

    console.log("!!!!!!AskHeader rendered");
    console.log(this.props.userId.S);
    console.log(this.props.userName.S);
    console.log(this.props.date.S);
    var userId = this.props.userId.S;
    var author = this.props.userName.S;
    var yearMonthDay = new Date(parseInt(this.props.date.S)).toDateString();
    var time = new Date(parseInt(this.props.date.S)).toTimeString().split(' ')[0];
    var readable = this.readableDate(this.props.date.S);
    var rank = this.props.rank;
    var age = this.props.age ? this.props.age.S : 'ALL';
    var gender = this.props.gender ? this.props.gender.S : 'ALL';
    var profile_photo = "http://graph.facebook.com/"+userId+"/picture?type=small";

    return (
      <div>
        <div style={styles.author}>
        <CardHeader
          avatar={<Avatar src={profile_photo}></Avatar>}
          title={author}
          subtitle={readable+" ("+yearMonthDay+", "+time+")"}
          showExpandableButton={true} />
        </div>
        <div style={styles.crownContainer}>
          <Crowns rank={rank}/>
          <Gender gender={gender}/>
          <Ages age={age}/>
        </div>
      </div>
    );
  },

  readableDate: function(datetime) {
    var currentTime = new Date().getTime();
    var sec =  (currentTime - datetime) / 1000;
    console.log("readableDate datetime : " + datetime);
    console.log("readableDate currentTime : " + currentTime);

    if(sec < 60)
      return sec.toFixed(0) + ((sec.toFixed(0) <= 1) ? ' second' : ' seconds');

    var min = sec / 60;
    if(min < 60)
      return min.toFixed(0) + ((min.toFixed(0) <= 1) ? ' minute' : ' minutes');

    var hour = min / 60;
    if(hour < 24)
      return hour.toFixed(0) + ((hour.toFixed(0) <= 1) ? ' hour' : ' hours');

    var day = hour / 24;
    if(day < 7)
      return day.toFixed(0) + ((day.toFixed(0) <= 1) ? ' day' : ' days');

    var week = day / 7;
    if(week < 5)
      return week.toFixed(0) + ((week.toFixed(0) <= 1) ? ' week' : ' weeks');

    var month = day / 30;
    if(month < 12)
      return month.toFixed(0) + ((month.toFixed(0) <= 1) ? ' month' : ' months');

    var year = day / 365;
    return year.toFixed(0) + ((year.toFixed(0) <= 1) ? ' year' : ' years');
  },
});


var Content = React.createClass({

  childContextTypes : {
    muiTheme: React.PropTypes.object,
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
            yesNoCount={noCount}
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
            <AskHeader
              userName={ask.userName}
              userId={ask.userId}
              date={ask.date}
              rank={ask.rank}
              age={ask.age}
              gender={ask.gender}
              secret={ask.secret} />
            {this.makeSecretCheckBox(ask.secret)}
            <Content mainContent={ask.mainContent}
              yesContent={ask.yesContent}
              noContent={ask.noContent}
              yesCount={ask.yesCount}
              noCount={ask.noCount} />
          </Card>
        );
      }.bind(this));
    }

    return (
      <div className="MyCardList">
        {cards}
      </div>
    );
  },

  makeSecretCheckBox: function(askSecret) {
    var secret = askSecret === undefined ? "none" : askSecret.S;

    var styles = {
      checkbox: {
        marginLeft : "calc(100% - 100px)",
        marginBottom: 5,
      },
      checkboxLabel: {
        color: Colors.grey700
      }
    };

    if (secret !== "none") {
     return <Checkbox
              label="secret"
              defaultChecked={true}
              disabled={true}
              labelStyle={styles.checkboxLabel}
              style={styles.checkbox} />;
    }
  }
});

module.exports = MyCardList;

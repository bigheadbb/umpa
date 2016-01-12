var React = require('react');
var mui = require('material-ui');
var {Avatar,
  Card,
  CardHeader} = mui;
var Colors = mui.Styles.Colors;

var AskContent = require('./ask-content.jsx');

var AskHeader = React.createClass({
  render: function () {
     var styles = {
      author: {
        width:'80%',
        float: 'left',
      },
      crownContainer: {
        width:'20%',
        height:'72px',
        float:'left',
      },
    };

    console.log("!!!!!!Author rendered");
    console.log(this.props.userId.S);
    console.log(this.props.userName.S);
    console.log(this.props.date.S);
    var userId = this.props.userId.S;
    var author = this.props.userName.S;
    var yearMonthDay = new Date(parseInt(this.props.date.S)).toDateString();
    var time = new Date(parseInt(this.props.date.S)).toTimeString().split(' ')[0];
    var readable = this.readableDate(this.props.date.S);
    var profile_photo = "http://graph.facebook.com/"+userId+"/picture?type=small";
    var rank = this.props.rank;

    if(rank !== undefined ){
      return (   
        <div>   
          <div style={styles.author}>
          <CardHeader
            avatar={<Avatar src={profile_photo}></Avatar>}
            title={author}
            subtitle={readable}
            showExpandableButton={true} />
          </div>
          <div style={styles.crownContainer}>
            <Crowns index={rank}/>
          </div>
          </div>
      );
    }else{
      return(
        <CardHeader
          avatar={<Avatar src={profile_photo}></Avatar>}
          title={author}
          subtitle={readable}
          showExpandableButton={true} />
      );
    }
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


var Crowns = React.createClass({
  render: function(){
    var rank = this.props.index;
    var styles = {
      gold: {
        textAlign: 'center',
        backgroundImage: "url('img/crown_gold.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 20%", 
        color : Colors.black,
        fontWeight: 'bold',
        fontSize : 20,
        height: '100%',
        paddingTop:'30px',
      },
      silver: {
        textAlign: 'center',
        backgroundImage: "url('img/crown_silver.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 20%", 
        color : Colors.black,
        fontWeight: 'bold',
        fontSize : 20,
        height: '100%',
        paddingTop:'30px',
      },
      bronze: {
        textAlign: 'center',
        backgroundImage: "url('img/crown_bronze.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 20%", 
        color : Colors.black,
        fontWeight: 'bold',
        fontSize : 20,
        height: '100%',
        paddingTop:'30px',
      },

    };

    if(rank == 1)
      return (<div style={styles.gold}>1</div>);
    else if(rank == 2)
      return (<div style={styles.silver}>2</div>);
    else if(rank == 3)
      return (<div style={styles.bronze}>3</div>);
    else
      return (<div/>);
        
  },
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

    if (this.props.valid === false) {
      console.log(".............. invalid");
      cards = function () {
        return (
          <div></div>
        );
      }();
    } else {
      console.log(".............. valid");
      cards = this.props.data.map(function (ask) {
        return (
          <Card
            key={ask.index.S}
            initiallyExpanded={true}
            style={styles.card} >
            <AskHeader
              userName={ask.userName}
              userId={ask.userId}
              date={ask.date}
              rank={ask.rank}/>
            <AskContent
              data={ask} />
          </Card>
        );
      });
    }

    return (
      <div className="cardList">
        {cards}
      </div>
    );
  }

});

module.exports = CardList;

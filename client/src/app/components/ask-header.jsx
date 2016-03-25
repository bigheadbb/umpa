var React = require('react');
var mui = require('material-ui');
var {Avatar,
  CardHeader} = mui;
var Colors = mui.Styles.Colors;

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
    var secret = this.props.secret === undefined ? "none" : this.props.secret.S;
    var userId = this.props.userId.S;
    var author = secret === "none" ? this.props.userName.S : secret;
    var yearMonthDay = new Date(parseInt(this.props.date.S)).toDateString();
    var time = new Date(parseInt(this.props.date.S)).toTimeString().split(' ')[0];
    var readable = this.readableDate(this.props.date.S);
    var rank = this.props.rank;
    var age = this.props.age ? this.props.age.S : 'ALL';
    var gender = this.props.gender ? this.props.gender.S : 'ALL';
    var profile_image = this.props.profileImage ? this.props.profileImage.S : undefined;

    return (
      <div>
        <div style={styles.author}>
        <CardHeader
          avatar={this.makeAvata(secret, profile_image)}
          title={author}
          subtitle={readable}
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

  makeAvata: function(secret, profile_image) {
    if (secret === "none") {
      if (profile_image)
        return <Avatar src={profile_image}></Avatar>;
      else // For legacy asks
        return <Avatar src={"http://graph.facebook.com/"+this.props.userId.S+"/picture?type=small"}></Avatar>;
    }
    if (secret === "Mr. Gentleman" || secret === "Ms. Lady" || secret === "Anonymous")
      return <Avatar src="img/anonymous.png"></Avatar>;

    return <Avatar>A</Avatar>
  }

});

module.exports = AskHeader;

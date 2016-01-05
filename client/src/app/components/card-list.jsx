var React = require('react');
var mui = require('material-ui');
var {Avatar,
  Card,
  CardHeader} = mui;
var Colors = mui.Styles.Colors;

var AskContent = require('./ask-content.jsx');
var MoreButton = require('./more-button.jsx');

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
            <Author
              userName={ask.userName}
              userId={ask.userId}
              date={ask.date} />
            <AskContent
              data={ask} />
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

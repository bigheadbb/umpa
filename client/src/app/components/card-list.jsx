var React = require('react');
var mui = require('material-ui');
var {Card} = mui;
var Colors = mui.Styles.Colors;

var AskContent = require('./ask-content.jsx');
var AskHeader = require('./ask-header.jsx');
var ShareAsk = require('./share-ask.jsx');

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

    if (this.props.data.length < 1) {
      console.log(".............. no data");
      cards = function () {
        return (
          <div></div>
        );
      }();
    } else {
      cards = this.props.data.map(function (ask) {
        if (ask === null || ask === undefined)
          return;
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
              profileImage={ask.profileImage}
              secret={ask.secret} />
            <AskContent
              data={ask} />
            <ShareAsk
	      shareIndex={ask.index.S} />
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

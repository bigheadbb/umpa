var React = require('react');
var mui = require('material-ui');
var {Card} = mui;
var Colors = mui.Styles.Colors;

var AskContent = require('./ask-content.jsx');
var AskHeader = require('./ask-header.jsx');

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

    if (this.props.valid === false || this.props.data.length < 1) {
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
              rank={ask.rank}
              age={ask.age}
              gender={ask.gender} />
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

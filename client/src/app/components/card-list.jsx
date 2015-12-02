var React = require('react');
var mui = require('material-ui');
var {Avatar,
  Card,
  CardActions,
  CardHeader,
  CardText } = mui;
var Colors = mui.Styles.Colors;

var AskResult = require('./ask-result.jsx');
var MoreButton = require('./more-button.jsx');
var VoteButton = require('./vote-button.jsx');

var Author = React.createClass({
  render: function () {
    console.log("!!!!!!Author rendered");
    console.log(this.props.userId.S);
    console.log(this.props.date.S);
    var author = this.props.userId.S;
    var time = this.props.date.S;
    return (
      <CardHeader
        avatar={<Avatar>A</Avatar>}
        title={author}
        subtitle={time}
        showExpandableButton={true} />
    );
  }
});

var Content = React.createClass({
  render: function () {
    console.log("!!!!!!Content rendered");
    var content = this.props.mainContent.S;
    var yesContent = this.props.yesContent.S;
    var noContent = this.props.noContent.S;
    console.log(yesContent);
    console.log(noContent);
    var showContent = function () {
      return (
        <div>
          <div>
            {content}
          </div>
          <div>
            yes - {yesContent}
          </div>
          <div>
            no - {noContent}
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
            <VoteButton />
            <AskResult yesCount={ask.yesCount}
              noCount={ask.noCount} />
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

var React = require('react');
var mui = require('material-ui');
var {Avatar,
  Card,
  CardActions,
  CardHeader,
  CardText,
  FlatButton,
  Paper,
  RaisedButton } = mui;
var Colors = mui.Styles.Colors;

var Refresh = require('./svg-icons/refresh.jsx');
var MoreAsks = require('./svg-icons/more-asks.jsx');

var Author = React.createClass({
  render: function () {
    console.log("Author rendered");
    var author = 'Author';
    var time = 'Aug 10 2015';
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
    console.log("Content rendered");
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
    };
    return (
      <CardText
        expandable={true} >
        {showContent()}
      </CardText>
    );
  }
});

var Selection = React.createClass({
  render: function () {
    var firstSelection = 'Yes';
    var secondSelection = 'No';
    var styles = {
      buttonArea: {
        width: '100%',
      },
      selectButton: {
        width: '50%',
      },
    };
    return (
      <CardActions
        expandable={true} >
        <div style={styles.buttonArea} >
          <FlatButton
            label={firstSelection}
            primary={true}
            style={styles.selectButton} />
          <FlatButton
            label={secondSelection}
            secondary={true}
            style={styles.selectButton} />
        </div>
      </CardActions>
    );
  }
});

var VoteResult = React.createClass({
  render: function () {
    console.log("VoteResult render");

    var showVoteResult = function (result) {
      var result1 = 70.5;
      var result2 = 100 - result1;
      result1 += '%';
      result2 += '%';
      var styles = {
        buttonArea: {
          width: '100%',
        },
        firstResult: {
          width: result1,
        },
        secondResult: {
          width: result2,
        },
      };
      return (
        <div style={styles.buttonArea} >
          <RaisedButton
            label={result1}
            primary={true}
            disabled={true}
            disabledBackgroundColor={Colors.pink300}
            disabledLabelColor={Colors.white}
            style={styles.firstResult} />
          <RaisedButton
            label={result2}
            secondary={true}
            disabled={true}
            disabledBackgroundColor={Colors.cyan300}
            disabledLabelColor={Colors.white}
            style={styles.secondResult} />
        </div>
      );
    };
    return (
      <CardActions
        expandable={true} >
        {showVoteResult()}
      </CardActions>
    );
  }
});

var CardList = React.createClass({
  render: function () {
    console.log("CardList render");

     var styles = {
       refresh: {
         marginTop : 10,
         textAlign: 'center',
       },
       moreItem: {
         textAlign: 'center',
       },
       buttonContainer : {
         height: 24,
         width: 24,
         margin: '0 auto',
         marginTop: 10,
         marginBottom: 10,
         textAlign: 'center',
      }
     };

    var showCard = function () {
      var styles = {
        textfield: {
          width: "100%",
        },
        cardtext: {
          backgroundColor: Colors.white,
          paddingBottom: 1,
          borderTop: 'solid 1px #e0e0e0',
        },
        cardlist: {
          marginTop: 10,
          marginBottom: 15,
          marginLeft: 10,
          marginRight: 10,
        }
      };
      return (
        <Card
          initiallyExpanded={true}
          style={styles.card} >
          <Author />
          <Content />
          <Selection />
          <VoteResult />
        </Card>
      );
    };
    return (
      <div className="cardList">
        {showCard()}
        {showCard()}
        {showCard()}
        {showCard()}
        <Paper
          zDepth={1}
          circle={true}
          style={styles.buttonContainer} >
          <MoreAsks />
        </Paper>
      </div>
    );
  }
});

module.exports = CardList;

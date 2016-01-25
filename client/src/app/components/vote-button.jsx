var React = require('react');
var mui = require('material-ui');
var {FlatButton,
  TextField} = mui;
var Colors = mui.Styles.Colors;

var AskResult = require('./ask-result.jsx');
var VotedCheck = require('./svg-icons/voted-check.jsx');
var VoteButton = React.createClass({

  askId: function () {
    return this.props.data.index.S;
  },

  getInitialState: function () {
    return {voted: false, yesno: '', yesCount: 0, noCount: 0};
  },

  render: function () {
    console.log('!!!!!!VoteButton render');
    var yesContent = this.props.data.yesContent.S;
    var noContent = this.props.data.noContent.S;
    var yesCount = parseInt(this.props.data.yesCount.N) + this.state.yesCount;
    var noCount = parseInt(this.props.data.noCount.N) + this.state.noCount;
    var totalCount = yesCount + noCount;
    var voted = this.state.voted || false; //this.props.data.voted

    var styles = {
      full: {
        width: '100%'
      },
      underline: {
        display: 'none'
      },
      checkIcon: {
        position: 'relative',
        top: '2px',
        left: '2px'
      },
      yesButtonTitle: {
        color:Colors.pink500,
        fontSize: 9,
        fontWeight:'bold',
        paddingLeft: 3,
      },
      noButtonTitle: {
        color:Colors.cyan500,
        fontSize: 9,
        fontWeight:'bold',
        paddingLeft: 3,
      },
      yesButton: {
        width:'100%',
        backgroundColor:Colors.pink50,
      },
      noButton: {
        width:'100%',
        backgroundColor:Colors.cyan50,
      },
      yesText: {
        color: Colors.pink300,
        width: 'calc(100% - 11px)',
        paddingLeft: 5,
        fontSize: 14,
        pointerEvents: 'none'
      },
      noText: {
        color: Colors.cyan700,
        width: 'calc(100% - 11px)',
        paddingLeft: 5,
        fontSize : 14,
        pointerEvents: 'none'
      },
    };

    var showResult = function (select) {
      console.log('!!!!!!show result: ' + select);
      var name = 'yesResult';
      var count = yesCount;
      var barColor = Colors.pink300;
      if (select === 'no') {
        name = 'noResult';
        count = noCount;
        barColor = Colors.cyan500;
      }
      return (
        <AskResult
          ref={name}
          show={voted}
          yesNoCount={count}
          totalCount={totalCount}
          color={barColor} />
      );
    };

    var showVotedCheck = function (select, yesno) {
      var color = select === 'yes' ? Colors.pink500 : Colors.cyan500;
      if (select === yesno) {
        return (
          <span style={styles.checkIcon}>
            <VotedCheck data={color} />
          </span>
        );
      }
    };

    return (
      <div>
        <div style={styles.full}>
          <span style={styles.yesButtonTitle}>YES</span>
          {showVotedCheck('yes', this.state.yesno)}
          <FlatButton
            style={styles.yesButton}
            primary={true}
            disabled={voted}
            onTouchTap={this._handleYesButton} >
            <TextField
              style={styles.yesText}
              underlineStyle={styles.underline}
              disabled={false}
              defaultValue={yesContent}
              type='text'
              rows={1}
              rowsMax={Number.MAX_VALUE}
              multiLine={true} />
          </FlatButton>
        </div>
        {showResult('yes')}
        <div style={{marginTop : 15}}>
          <span style={styles.noButtonTitle}>NO</span>
          {showVotedCheck('no', this.state.yesno)}
          <FlatButton
            style={styles.noButton}
            secondary={true}
            disabled={voted}
            onTouchTap={this._handleNoButton} >
            <TextField
              style={styles.noText}
              underlineStyle={styles.underline}
              disabled={false}
              defaultValue={noContent}
              rows={1}
              type='text'
              rowsMax={Number.MAX_VALUE}
              multiLine={true} />
          </FlatButton>
        </div>
        {showResult('no')}
      </div>
    );
  },

  _handleYesButton: function (e) {
    console.log('!!!!!!!_handleYesButton');
    if (this.lastTouchEvent && (e.nativeEvent.timeStamp - this.lastTouchEvent) < 250) {
      var url = 'http://54.65.152.112:5000/makeNewVote';
      var query = {};
      query.askerId = document.user.id;
      query.index = this.askId();
      query.yesno = 1;
      $.ajax({
        url: url,
        dataType: 'json',
        data: query,
        type: 'POST',
        cache: false,
        success: function (data) {
          console.log('!!!!!data: ' + JSON.stringify(data));
          this.setState({voted: true, yesno: 'yes', yesCount: 1, noCount: 0});
          this.refs.yesResult.show();
          this.refs.noResult.show();
          window.myVotedAsksState = "UpdatedNeeded";
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(url, status, err.toString());
        }.bind(this)
      });
    }
    this.lastTouchEvent = e.nativeEvent.timeStamp;
  },

  _handleNoButton: function (e) {
    console.log('!!!!!!!_handleNoButton');
    if (this.lastTouchEvent && (e.nativeEvent.timeStamp - this.lastTouchEvent) < 250) {
      var url = 'http://54.65.152.112:5000/makeNewVote';
      var query = {};
      query.askerId = document.user.id;
      query.index = this.askId();
      query.yesno = 0;
      $.ajax({
        url: url,
        dataType: 'json',
        data: query,
        type: 'POST',
        cache: false,
        success: function (data) {
          this.setState({voted: true, yesno: 'no', yesCount: 0, noCount: 1});
          this.refs.yesResult.show();
          this.refs.noResult.show();
          window.myVotedAsksState = "UpdatedNeeded";
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(url, status, err.toString());
        }.bind(this)
      });
    }
    this.lastTouchEvent = e.nativeEvent.timeStamp;
  },
});

module.exports = VoteButton;


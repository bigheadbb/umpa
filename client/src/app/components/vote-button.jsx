var React = require('react');
var mui = require('material-ui');
var {FlatButton,
  TextField} = mui;
var Colors = mui.Styles.Colors;

var AskResult = require('./ask-result.jsx');
var VotedCheck = require('./svg-icons/voted-check.jsx');
var VoteButton = React.createClass({

  askIndex: function () {
    return this.props.index;
  },

  render: function () {
    console.log('!!!!!!VoteButton render');
    var yesContent = this.props.yesContent;
    var noContent = this.props.noContent;
    var yesCount = this.props.yesCount;
    var noCount = this.props.noCount;
    var totalCount = yesCount + noCount;
    var voted = this.props.voted === 'none' ? false : true;

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
      console.log('!!!!!!show result: ' + select + ' , voted: ' + voted);
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
          {showVotedCheck('yes', voted)}
          <FlatButton
            style={styles.yesButton}
            primary={true}
            disabled={voted}
            onTouchTap={this._handleYesButtonTouched} >
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
          {showVotedCheck('no', voted)}
          <FlatButton
            style={styles.noButton}
            secondary={true}
            disabled={voted}
            onTouchTap={this._handleNoButtonTouched} >
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

  getVoted: function (yesno) {
    var url = 'http://54.65.152.112:5000/getVoted';
    var query = {};
    if (document.user !== undefined && document.user.id !== undefined) {
      query.askerId = document.user.id;
    } else {
      FB.login(window.loginStatusCallback, {scope: 'public_profile, email'});
    }
    query.index = this.askIndex();
    $.ajax({
      url: url,
      dataType: 'json',
      data:query,
      type: 'POST',
      cache: false,
      success: function (data) {
        console.log(JSON.stringify(data));
        if (data.Count > 0 && 'none' !== data.Items[0].voted) {
          this.props.handle(data.Items[0].voted,
                            this.props.yesCount,
                            this.props.noCount);
          window.myVotedAsksState = "UpdatedNeeded";
        } else {
          this.vote(yesno);
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },

  vote: function (yesno) {
    console.log('!!!!!!!   vote');
    var url = 'http://54.65.152.112:5000/makeNewVote';
    var query = {};
    query.askerId = document.user.id;
    query.index = this.askIndex();
    query.yesno = yesno === 'yes' ? 1 : 0;
    $.ajax({
      url: url,
      dataType: 'json',
      data: query,
      type: 'POST',
      cache: false,
      success: function (data) {
        console.log(JSON.stringify(data));
        if (data.Count > 0) {
          this.props.handle(yesno,
                            parseInt(data.Items[0].yesCount.N),
                            parseInt(data.Items[0].noCount.N));
          window.myVotedAsksState = "UpdatedNeeded";
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },

  _handleYesButtonTouched: function (e) {
    console.log('!!!!!!!_handleYesButton');
    if (this.lastTouchEvent &&
        (e.nativeEvent.timeStamp - this.lastTouchEvent) < 250) {
      this.getVoted('yes');
    }
    this.lastTouchEvent = e.nativeEvent.timeStamp;
  },

  _handleNoButtonTouched: function (e) {
    console.log('!!!!!!!_handleNoButton');
    if (this.lastTouchEvent &&
        (e.nativeEvent.timeStamp - this.lastTouchEvent) < 250) {
      this.getVoted('no');
    }
    this.lastTouchEvent = e.nativeEvent.timeStamp;
  },
});

module.exports = VoteButton;


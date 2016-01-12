var React = require('react');
var mui = require('material-ui');
var {FlatButton,
  TextField} = mui;
var Colors = mui.Styles.Colors;

var AskResult = require('./ask-result.jsx');
var VoteButton = React.createClass({

  askId: function () { return this.props.data.index.S; },

  getInitialState: function () {
    return {valid: true};
  },

  render: function () {
    console.log('!!!!!!VoteButton render');

    // TODO: it should hide after voting
    var yesContent = this.props.data.yesContent.S;
    var noContent = this.props.data.noContent.S;
    var yesCount = parseInt(this.props.data.yesCount.N);
    var noCount = parseInt(this.props.data.noCount.N);
    var totalCount = yesCount + noCount;
    var valid = this.state.valid;

    console.log('yesContent:' + yesContent + ', noContent:' + noContent);
    console.log('yesCount:' + yesCount + ', noCount:' + noCount + ', totalCount:' + totalCount);

    var styles = {
      full: {
        width: '100%'
      },
      underline: {
        display: 'none'
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
          yesNoCount={count}
          totalCount={totalCount}
          color={barColor} />     
      );
    };
    return (
      <div>
        <div style={styles.full}>
          <span style={styles.yesButtonTitle}>YES</span>
          <FlatButton
            style={styles.yesButton}
            primary={true}
            disabled={valid == 'true' ? true : false}
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
          <FlatButton
            style={styles.noButton}
            secondary={true}
            disabled={valid == 'true' ? true : false}
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
        this.setState({valid: false});
        this.refs.yesResult.show(data.yesCount);
        this.refs.noResult.show(data.noCount);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },

  _handleNoButton: function (e) {
    console.log('!!!!!!!_handleYesButton');
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
        this.setState({valid: false});
        this.refs.yesResult.show(data.yesCount);
        this.refs.noResult.show(data.noCount);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
});

module.exports = VoteButton;

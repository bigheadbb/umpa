var React = require('react');
var Router = require('react-router');
var Clipboard = require('react-copy-to-clipboard');
var mui = require('material-ui');
var { FlatButton,
  Dialog,
  TextField,
  IconButton,
  RaisedButton,
  Snackbar } = mui;
var Colors = mui.Styles.Colors;

var Share = require('./svg-icons/share.jsx');

var ShareAsk = React.createClass({
  getInitialState: function() {
    return {
      dialOpen : false,
      copyUrl : '',
      result : '',
    };
  },

  render: function() {
    this.askIndex = this.props.shareIndex.split('#')[0];
    this.askDate = this.props.shareIndex.split('#')[1];
    this.shareURL= window.client.url+"ask-by-index.html?index="+this.askIndex+"&date="+this.askDate;

    var styles = {
      iconButton: {
        marginRight: 10,
        marginBottom: 10,
        float: "right",
      },
      dialCont: {
        width: '160px',
      },
      dialBody:{
        backgroundColor: "#ECEFF1",
        padding: '15px'
      },
      shareBt: {
        width: '100%',
        height: '40px',
        padding: '5px',
      },
      logo: {
        float: 'left',
        width: '30px'
      },
      fontSt:{
        float: 'left',
        marginLeft: 5,
      }
    };

    const actions = [
      <FlatButton
        label={window.textSet.dialogClose}
        keyboardFocused={true}
        onTouchTap={this._onClose} />,
    ];

    return (
      <div>
        <IconButton style={styles.iconButton} onTouchTap={this.handleShareButtonTouchTap}>
          <Share />
        </IconButton>
        <Dialog
          bodyStyle={styles.dialBody}
          contentStyle={styles.dialCont}
          actions={actions}
          open={this.state.dialOpen}
          onRequestClose={this._onClose}>
          <FlatButton
            style={styles.shareBt}
            onTouchTap={this._kakaotalkShare} >
            <img src="img/kakaoIcon.png" style={styles.logo}/>
            <div style={styles.fontSt}>Kakaotalk</div>
          </FlatButton>
          <FlatButton
            style={styles.shareBt}
            onTouchTap={this._facebookShare} >
            <img src="img/facebook-box.png" style={styles.logo}/>
            <div style={styles.fontSt}>Facebook</div>
          </FlatButton>
          <Clipboard
            text={this.state.copyUrl}
            onCopy={this.handleCopy} >
            <FlatButton
              style={styles.shareBt}
              onTouchTap={this._copyUrlShare} >
              <img src="img/paperclip.png" style={styles.logo}/>
              <div style={styles.fontSt}>Copy URL</div>
            </FlatButton>
          </Clipboard>
        </Dialog>
        <Snackbar
          ref="snackbar"
          message={this.state.result} />
      </div>
    );
  },

  _kakaotalkShare: function() {
    if (!this.props.shareIndex) {
      this.setState({result: "fail kakaktalk share : index is undefined"});
      this.refs.snackbar.show();
      return;
    }

    Kakao.Link.sendTalkLink({
      label: this.props.mainContent + "\n" + this.props.yesContent + "\nVS\n" + this.props.noContent,
      webButton: {
        text: 'ASKUS YES|NO',
        url: this.shareURL,
      },
      //TODO: add marketParams after release Native App
      fail: function() {
          console.log('not supported platform');
          this.setState({result: "not supported device"});
          this.refs.snackbar.show();
      }.bind(this),
    });
  },

  _facebookShare: function() {
    FB.ui({
      method: 'feed',
      name: "Ask us anything! ASKUS",
      link: this.shareURL,
      description: this.props.mainContent + " " + this.props.yesContent + " VS " + this.props.noContent,
      caption: 'http://askus.me',
    }, function(response){});
  },

  _copyUrlShare: function() {
    console.log('copy url!!!!!!');
    console.log(this.props.shareIndex);
    if (!this.props.shareIndex) {
      this.setState({result: "fail to copy url : index is undefined"});
      this.refs.snackbar.show();
      return;
    }
    console.log(this.shareURL);
    this.setState({copyUrl: this.shareURL});
  },

  _onClose: function() {
    this.setState({dialOpen: false});
  },

  handleCopy: function() {
    this.setState({result: "success to copy this ask's url"});
    this.refs.snackbar.show();
  },

  handleShareButtonTouchTap: function() {
    this.setState({dialOpen: true});
  },
});

ShareAsk.contextTypes = {
  router: React.PropTypes.func
};

module.exports = ShareAsk;

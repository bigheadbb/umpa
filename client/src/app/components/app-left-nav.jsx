var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var {MenuItem, LeftNav, List, ListItem, Avatar, IconButton} = mui;
var {Colors, Spacing, Typography} = mui.Styles;

var ActionAssignment = require('./svg-icons/action-assignment.jsx');
var ActionGrade = require('./svg-icons/action-grade.jsx');
var ActionInfo = require('./svg-icons/action-info.jsx');
var CommunicationCall = require('./svg-icons/communication-call.jsx');
var CommunicationChatBubble = require('./svg-icons/communication-chat-bubble.jsx');
var CommunicationEmail = require('./svg-icons/communication-email.jsx');
var ContentDrafts = require('./svg-icons/content-drafts.jsx');
var ContentInbox = require('./svg-icons/content-inbox.jsx');
var ContentSend = require('./svg-icons/content-send.jsx');
var EditorInsertChart = require('./svg-icons/editor-insert-chart.jsx');
var FileFolder = require('./svg-icons/file-folder.jsx');
var ToggleStarBorder = require('./svg-icons/toggle-star-border.jsx');
var NavigationMoreButton = require('./svg-icons/navigation-more-button.jsx');

var menuItems = [
    { type: MenuItem.Types.SUBHEADER , text: 'Ask' },
    { route: 'my-asks', text: window.textSet.myAsk },
    { route: 'voted-asks', text: window.textSet.votedAsk },
    { type: MenuItem.Types.SUBHEADER , text: 'Setting' },
    { route: 'logout', text: window.textSet.navLogout },
  ];

var AppLeftNav = React.createClass({

  getStyles: function() {
    return {
      ListHead: {
        backgroundColor: Colors.grey300
      }
    }
  },

  getInitialState: function() {
    return {
      user : document.user,
    };
  },

  componentWillMount: function() {
    console.log('AppLeftNav componentWillMount called');
    this._isOpen = false;
  },

  componentDidMount: function() {
    document.addEventListener("fbUserInfo",
      function statusChangeCallback(e) {
        this.setState({user: document.user});
      }.bind(this)
    );

    document.addEventListener("kakaoUserInfo",
      function statusChangeCallback(e) {
        this.setState({user: document.user});
      }.bind(this)
    );
  },
  componentWillUpdate: function() {
    console.log('AppLeftNav componentWillUpdate called');
  },

  render: function() {
    var header = (
      <div onTouchTap={this._onHeaderClick}>
        <List style={this.getStyles().ListHead}>
          <ListItem
            leftAvatar={ document.user === undefined ? <Avatar>A</Avatar> : <Avatar src={document.user.profile_image}></Avatar> }
            primaryText={ document.user === undefined ? "" : document.user.name }
            secondaryText={ document.user === undefined ? "" : document.user.email }
          >
          </ListItem>
        </List>

      </div>
    );

    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        disableSwipeToOpen={true}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        openRight={true}
        onNavOpen={this._onOpen}
        onNavClose={this._onClose}
        onChange={this._onLeftNavChange} />
    );
  },

  _onOpen: function() {
    this._isOpen = true;
  },

  _onClose: function() {
    setTimeout( function() {
      this._isOpen = false;
    }.bind(this), 500);
  },

  isOpen: function() {
    return this._isOpen;
  },

  toggle: function() {
    this.refs.leftNav.toggle();
  },

  _getSelectedIndex: function() {
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  },

  _onLeftNavChange: function(e, key, payload) {
    console.log("_onLeftNavChange e : " + e);
    console.log("_onLeftNavChange key : " + key);
    console.log("_onLeftNavChange payload : " + payload);

    if (payload.text === window.textSet.navLogout) {
      if (document.fblogin === "connected") {
        console.log('FB Logout Click');
        FB.logout(function(response) {
          console.log(response);
        }.bind(this));
      }

       if (document.kakaologin === "connected") {
         console.log('Kakao Logout Click');
         Kakao.Auth.logout(function(response) {
           window.kakaoLoginStatusCallback(response);
           window.location.reload();
         }.bind(this));
       }
    } else if (payload.text === window.textSet.myAsk) {
      console.log('My Asks Click');
      this.context.router.transitionTo('my-asks');
    } else if (payload.text === window.textSet.votedAsk) {
      console.log('Voted Asks Click');
      this.context.router.transitionTo('voted-asks');
    }
  },

  _onHeaderClick: function() {
    this.refs.leftNav.close();
  },
});

AppLeftNav.contextTypes = {
  router: React.PropTypes.func
};

module.exports = AppLeftNav;

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
    { route: 'home', text: 'Home' },
    { route: 'get-started', text: 'Get Started' },
    { route: 'feed', text: 'Feed' },
    { route: 'text-component', text: 'Text Component' },
    { route: 'component', text: 'Component' },
    { type: MenuItem.Types.SUBHEADER, text: 'Links' },
    { type: MenuItem.Types.LINK, payload: 'https://github.com/luckypapa/AMAG', text: 'Github' },
    { type: MenuItem.Types.LINK, payload: 'http://material-ui.com', text: 'Material-UI' },
    { type: MenuItem.Types.LINK, payload: 'http://facebook.github.io/react', text: 'React' }
  ];

class AppLeftNav extends React.Component {

  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this._getSelectedIndex = this._getSelectedIndex.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
    this._onHeaderClick = this._onHeaderClick.bind(this);
  }

  getStyles() {
    return {
      ListHead: {
        backgroundColor: Colors.grey300
      }
    }
  }

  render() {
    var header = (
      <div onTouchTap={this._onHeaderClick}>
        <List style={this.getStyles().ListHead}>
          <ListItem
            leftAvatar={<Avatar>A</Avatar>}
            primaryText="Big head brothers"
            secondaryText="show me the money"
            rightIconButton={<IconButton><NavigationMoreButton color={Colors.grey600} /></IconButton>}
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
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange} />
    );
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  _getSelectedIndex() {
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  }

  _onLeftNavChange(e, key, payload) {
    this.context.router.transitionTo(payload.route);
  }

  _onHeaderClick() {
    this.refs.leftNav.close();
  }
}

AppLeftNav.contextTypes = {
  router: React.PropTypes.func
};

module.exports = AppLeftNav;

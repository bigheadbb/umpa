/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var AppBar = mui.AppBar;
var Colors = mui.Styles.Colors;
var FlatButton = mui.FlatButton;
var FontIcon = mui.FontIcon;
var List =  mui.List;
var ListItem =  mui.ListItem;
var ListDivider = mui.ListDivider;
var IconButton = mui.IconButton;
var Avatar = mui.Avatar;

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

var {Spacing, Typography} = mui.Styles;

var FavoriteList = React.createClass({

  render: function() {

    var containerStyle = {
      margin: '10',
    };

    return (
     <div style={containerStyle}>
      <List>
        <ListItem
          leftAvatar={<Avatar src="./image/ok-128.jpg" />}
          rightIconButton={<IconButton><ToggleStarBorder color={Colors.grey400} /></IconButton>}
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Brunch this weekend?</span><br/>
              I&apos;ll be in your neighborhood doing errands this weekend.
              Do you want to grab brunch?
            </p>
          }
          secondaryTextLines={2}>
          Brendan Lim
        </ListItem>
        <ListDivider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="./image/ok-128.jpg" />}
          rightIconButton={<IconButton><ToggleStarBorder color={Colors.grey400} /></IconButton>}
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Summer BBQ</span><br/>
              Wish I could come, but I&apos;m out of town this weekend.
            </p>
          }
          secondaryTextLines={2}>
          me, Scott, Jennifer
        </ListItem>
        <ListDivider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="./image/ok-128.jpg" />}
          rightIconButton={<IconButton><ToggleStarBorder color={Colors.grey400} /></IconButton>}
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Oui oui</span><br/>
              Do you have any Paris recs? Have you ever been?
            </p>
          }
          secondaryTextLines={2}>
          Grace Ng
        </ListItem>
        <ListDivider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="./image/ok-128.jpg" />}
          rightIconButton={<IconButton><ToggleStarBorder color={Colors.grey400} /></IconButton>}
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Birthday gift</span><br/>
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}>
          Kerem Suer
        </ListItem>
        <ListDivider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="./image/ok-128.jpg" />}
          rightIconButton={<IconButton><ToggleStarBorder color={Colors.grey400} /></IconButton>}
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Recipe to try</span><br/>
              We should eat this: grated squash. Corn and tomatillo tacos.
            </p>
          }
          secondaryTextLines={2}>
          Raquel Parrado
        </ListItem>
      </List>
      </div>
    );
  },
});

module.exports = FavoriteList;

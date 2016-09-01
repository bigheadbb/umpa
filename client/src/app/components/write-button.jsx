var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var { FloatingActionButton, } = mui;
var { Colors, } = mui.Styles;

var WritePencil = require('./svg-icons/write-pencil.jsx');
var LoginSel = require('./login-select.jsx');
var Tooltip = require("react-tooltip");

var WriteButton = React.createClass({

  getInitialState: function() {
    return {
      dialOpen : false,
    };
  },

  render: function() {
    var floatingButtonStyle = {
      position: 'fixed',
      right: '30px',
      bottom: '30px',
    };

    return (
      <div>
        <FloatingActionButton
          backgroundColor={Colors.deepPurple500}
          style={floatingButtonStyle}
          onTouchTap={this.handleCreateNewAsksButtonTouchTap}>
          <WritePencil data-tip data-for="write" />
        </FloatingActionButton>
        <Tooltip id="write" effect="solid" delayShow={500}>{window.textSet.makeAsks}</Tooltip>
        <LoginSel
          openstate={this.state.dialOpen}
          close={this._loginClose}>
        </LoginSel>
      </div>
    );
  },

  handleCreateNewAsksButtonTouchTap : function() {
    if (document.user !== undefined) {
      this.context.router.transitionTo('create-new-ask');
    }
    else {
      this._loginOpen();
    }
  },

  _loginOpen: function() {
    this.setState({dialOpen: true});
  },

  _loginClose: function() {
    this.setState({dialOpen: false});
  },
});

WriteButton.contextTypes = {
  router: React.PropTypes.func
};

module.exports = WriteButton;

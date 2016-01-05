var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;

var Send = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props} >
        <path fill="#673ab7" d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
      </SvgIcon>
    );
  }

});

module.exports = Send;
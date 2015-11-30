var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;

var MoreAsks = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props} >
        <path fill="#9E9E9E"  d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
      </SvgIcon>
    );
  }

});

module.exports = MoreAsks;
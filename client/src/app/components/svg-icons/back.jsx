var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;

var Back = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props} >
        <path fill="#673ab7" d="M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z"></path>
      </SvgIcon>
    );
  }

});

module.exports = Back;
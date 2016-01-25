var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;
var Colors = mui.Styles.Colors;

var VoteUser = React.createClass({

  render: function () {
    return (
      <SvgIcon style={this.props.style} >
        <path fill={this.props.color} d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"></path>
      </SvgIcon>
    );
  }
});

module.exports = VoteUser;

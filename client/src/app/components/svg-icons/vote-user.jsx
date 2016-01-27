var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;
var Colors = mui.Styles.Colors;

var VoteUser = React.createClass({

  render: function () {
    return (
      <SvgIcon style={this.props.style} >
        <path fill={this.props.color} d="M9,5A3.5,3.5 0 0,1 12.5,8.5A3.5,3.5 0 0,1 9,12A3.5,3.5 0 0,1 5.5,8.5A3.5,3.5 0 0,1 9,5M9,13.75C12.87,13.75 16,15.32 16,17.25V19H2V17.25C2,15.32 5.13,13.75 9,13.75M17,12.66L14.25,9.66L15.41,8.5L17,10.09L20.59,6.5L21.75,7.91L17,12.66Z"></path>
      </SvgIcon>
    );
  }
});

module.exports = VoteUser;
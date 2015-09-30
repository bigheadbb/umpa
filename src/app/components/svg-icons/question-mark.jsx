var React = require('react');
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;

var QuestionMark = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10,19H13V22H10V19M12,2A6,6 0 0,1 18,8C17.67,9.33 17.33,10.67 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C14.33,10 14.67,9 15,8A3,3 0 0,0 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z"/>
      </SvgIcon>
    );
  }

});

module.exports = QuestionMark;

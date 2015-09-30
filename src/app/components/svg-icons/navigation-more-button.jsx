var React = require('react');
var PureRenderMixin = React.addons.PureRenderMixin;
var mui = require('material-ui');
var SvgIcon = mui.SvgIcon;

var NavigationMoreVert = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </SvgIcon>
    );
  }

});

module.exports = NavigationMoreVert;



/** WEBPACK FOOTER **
 ** ../src/svg-icons/navigation/more-vert.jsx
 **/
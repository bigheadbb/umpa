var React = require('react');
var PageWithNav = require('./page-with-nav.jsx');

class Components extends React.Component {

  render() {
    var menuItems = [
      { route: 'feed', text: 'Feed'}
    ];

    return (
      <PageWithNav menuItems={menuItems} />
    );
  }

}

module.exports = Components;

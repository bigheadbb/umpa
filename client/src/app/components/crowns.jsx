var React = require('react');
var mui = require('material-ui');
var Colors = mui.Styles.Colors;

var Crowns = React.createClass({
  render: function(){
    var rank = this.props.index;
    var styles = {
      gold: {
        backgroundImage: "url('img/crown_gold.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: '100%',
      },
      silver: {
        backgroundImage: "url('img/crown_silver.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: '100%',
      },
      bronze: {
        backgroundImage: "url('img/crown_bronze.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: '100%',
      },

    };

    if(rank == 1)
      return (<div style={styles.gold} />);
    else if(rank == 2)
      return (<div style={styles.silver} />);
    else if(rank == 3)
      return (<div style={styles.bronze} />);
    else
      return (<div />);
        
  },
});

module.exports = Crowns;

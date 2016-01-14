var React = require('react');
var mui = require('material-ui');
var Colors = mui.Styles.Colors;

var Crowns = React.createClass({
  render: function(){
    var rank = this.props.index;
    var styles = {
      gold: {
        textAlign: 'center',
        backgroundImage: "url('img/crown_gold.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 20%", 
        color : Colors.black,
        fontWeight: 'bold',
        fontSize : 20,
        height: '100%',
        paddingTop:'30px',
      },
      silver: {
        textAlign: 'center',
        backgroundImage: "url('img/crown_silver.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 20%", 
        color : Colors.black,
        fontWeight: 'bold',
        fontSize : 20,
        height: '100%',
        paddingTop:'30px',
      },
      bronze: {
        textAlign: 'center',
        backgroundImage: "url('img/crown_bronze.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 20%", 
        color : Colors.black,
        fontWeight: 'bold',
        fontSize : 20,
        height: '100%',
        paddingTop:'30px',
      },

    };

    if(rank == 1)
      return (<div style={styles.gold}>1</div>);
    else if(rank == 2)
      return (<div style={styles.silver}>2</div>);
    else if(rank == 3)
      return (<div style={styles.bronze}>3</div>);
    else
      return (<div/>);
        
  },
});

module.exports = Crowns;

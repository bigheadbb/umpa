var React = require('react');
var mui = require('material-ui');
var Colors = mui.Styles.Colors;

var Ages = React.createClass({
  render: function(){
    var styles = {
      root:{
        position: 'relative',
        top: '30%',
        float: 'right',
        width: '24px',
        height: '24px'
      },
      ageStyle: {         
        width: '24px'
      },
    };

  var age = this.props.age;

  if (age === "UNDER20") {
    return (<div style={styles.root}>
              <img src="img/20down.png" style={styles.ageStyle} />
            </div>
    );
  }
  
  if (age === "OVER20") {
    return (<div style={styles.root}>
              <img src="img/20up.png" style={styles.ageStyle} />
            </div>
    );
  }

  return (<div />);
    
  },
});

module.exports = Ages;

var React = require('react');
var mui = require('material-ui');
var Colors = mui.Styles.Colors;

var Gender = React.createClass({
  render: function(){
    var styles = {
      root: {
        position: 'relative',
        top: '25%',
        width: '24px',
        height: '24px',
        float: 'right'
      },
    };

  var gender = this.props.gender;

  if (gender === 'MAN') {
    return (<div style={styles.root}>
              <img src="img/gender-male.png" />
            </div>
    );
  }

  if (gender === 'WOMAN') {
    return (<div style={styles.root}>
              <img src="img/gender-female.png" />
            </div>
    );
  }
  
  return (<div />);

  },
});

module.exports = Gender;

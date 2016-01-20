var React = require('react');
var mui = require('material-ui');
var Colors = mui.Styles.Colors;

var Crowns = React.createClass({
  render: function(){
    console.log("!!!!!!crown rendered");
    var rank = this.props.rank;
    var styles = {
      root: {
        position: 'relative',
        top: '20%',
        width: '52px',
        height: '32px',
        float:'right'
      },
      crownStyle: {
        position: 'relative',
        top: '-20%',
        width: '48px',
        height: '48px',
      }
    };

  if (rank === 1) {
    return (<div style={styles.root}>
              <img src="img/crown_gold.png" style={styles.crownStyle} />
            </div>
    );
  }

  if (rank === 2) {
    return (<div style={styles.root}>
              <img src="img/crown_silver.png" style={styles.crownStyle}/>
            </div>
    );
  }

  if (rank === 3) {
    return (<div style={styles.root}>
              <img src="img/crown_bronze.png" style={styles.crownStyle} />
            </div>
    );
  }

  return (<div />);

  },
});

module.exports = Crowns;

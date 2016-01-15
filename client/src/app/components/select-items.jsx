var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var { SelectField, Styles } = mui;
var { Colors, Spacing, Typography } = mui.Styles;

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyTheme = require('./my-theme.jsx');

var SelectItems = React.createClass({
  getInitialState: function() {
    return {
      genderValue: '1',
      ageValue: '1'
    };
  },

  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyTheme),
    };
  },

  render: function() {
    var styles = {
      root:{
        width: "100%",
      },
      genderSelectField: {
        width : 'calc(50% - 10px)',
        marginRight: 20,
        fontSize : 14,
      },
      ageSelectField: {
        width : 'calc(50% - 10px)',
        fontSize : 14,
      },
    };
    
    var genderItems = [
      { payload: '1', text: 'ALL' },
      { payload: '2', text: 'MAN' },
      { payload: '3', text: 'WOMAN' },
    ];

    var ageItems = [
      { payload: '1', text: 'ALL' },
      { payload: '2', text: 'UNDER 10\'s' },
      { payload: '3', text: '10\'s' },
      { payload: '4', text: '20\'s' },
      { payload: '5', text: '30\'s' },
      { payload: '6', text: '40\'s' },
      { payload: '7', text: '50\'s' },
      { payload: '8', text: 'OVER 60\'s' },
    ];

    return (
      <div style={styles.root}>
      <SelectField
        style={styles.genderSelectField}
        value={this.state.genderValue}
        floatingLabelText="Gender"
        onChange={this.handleSelectValuechange.bind(null, 'genderValue')}
        menuItems={genderItems} />
      <SelectField
        style={styles.ageSelectField}
        value={this.state.ageValue}
        floatingLabelText="Age"
        onChange={this.handleSelectValuechange.bind(null, 'ageValue')}
        menuItems={ageItems} />        
      </div>
    );
  },
  handleSelectValuechange: function(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  },
});

module.exports = SelectItems;

var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var { SelectField, Styles } = mui;
var { Colors, Spacing, Typography } = mui.Styles;

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyTheme = require('./my-theme.jsx');

var SelectTarget = React.createClass({
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

    this.genderItems = [
      { payload: '1', text: window.textSet.total },
      { payload: '2', text: window.textSet.man },
      { payload: '3', text: window.textSet.woman },
    ];

    this.ageItems = [
      { payload: '1', text: window.textSet.total },
      { payload: '2', text: window.textSet.under },
      { payload: '3', text: window.textSet.over },
    ];

    return (
      <div style={styles.root}>
      <SelectField
        ref="genderSelectField"
        style={styles.genderSelectField}
        value={this.state.genderValue}
        floatingLabelText={window.textSet.gender}
        onChange={this.handleSelectValuechange.bind(null, 'genderValue')}
        menuItems={this.genderItems} />
      <SelectField
        ref="ageSelectField"
        style={styles.ageSelectField}
        value={this.state.ageValue}
        floatingLabelText={window.textSet.age}
        onChange={this.handleSelectValuechange.bind(null, 'ageValue')}
        menuItems={this.ageItems} />
      </div>
    );
  },
  handleSelectValuechange: function(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  },

  getGender: function() {
    return this.genderItems[parseInt(this.state.genderValue)-1].text;
  },

  getAge: function() {
    return this.ageItems[parseInt(this.state.ageValue)-1].text.replace(" ", "");
  }
});

module.exports = SelectTarget;

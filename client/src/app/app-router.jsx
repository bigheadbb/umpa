
var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

var Master = require('./components/master.jsx');
var Home = require('./components/home.jsx');
var NewAsks = require('./components/new-asks.jsx');
var HotAsks = require('./components/hot-asks.jsx');
var MyAsks = require('./components/my-asks.jsx');
var VotedAsks = require('./components/voted-asks.jsx')
var CreateNewAsk = require('./components/create-new-ask.jsx');
var SearchAsks = require('./components/search-asks.jsx');

/** Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
  *
  * Routes are used to declare your view hierarchy.
  *
  * Say you go to http://material-ui.com/#/components/paper
  * The react router will search for a route named 'paper' and will recursively render its
  * handler and its parent handler like so: Paper > Components > Master
  */

var AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />
    <Route name="new-asks" handler={NewAsks} />
    <Route name="hot-asks" handler={HotAsks} />
    <Route name="my-asks" handler={MyAsks} />
    <Route name="voted-asks" handler={VotedAsks} />
    <Route name="create-new-ask" handler={CreateNewAsk} />
    <Route name="search-asks" handler={SearchAsks} />
    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;

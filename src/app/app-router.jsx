
var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

var Master = require('./components/master.jsx');
var Home = require('./components/home.jsx');
var GetStarted = require('./components/get-started.jsx');
var Feed = require('./components/feed.jsx'); 
var Component = require('./components/component.jsx');
var TextComponent = require('./components/text-component.jsx');

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
    <Route name="get-started" handler={GetStarted} />
    <Route name="feed" handler={Feed} />
    <Route name="component" handler={Component} />
    <Route name="text-component" handler={TextComponent} />
    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = AppRoutes;

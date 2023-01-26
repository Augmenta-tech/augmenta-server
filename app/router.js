import EmberRouter from '@ember/routing/router';
import config from 'augmenta-server/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('creator');
  this.route('tech');
});

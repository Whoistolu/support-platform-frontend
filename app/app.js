import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'support-platform-frontend/config/environment';
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros';
import * as ActiveStorage from '@rails/activestorage';

ActiveStorage.start();

if (macroCondition(isDevelopingApp())) {
  importSync('./deprecation-workflow');
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);

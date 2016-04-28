/*jshint browser:true */
'use strict';
// load vendor dependencies
require('./vendor');
require('./assets');;
// load the main app file
var appModule = require('../app');
// replaces ng-app="appName"
angular.element(document).ready(function () {
    angular.bootstrap(document, [appModule.name], {
        //strictDi: true
    });
});
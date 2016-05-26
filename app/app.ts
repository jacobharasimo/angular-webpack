//get the index file
require('file?name=../[name].[ext]!./index.html');
/*app entry*/
import * as angular from 'angular';

/* App Styles */
import './styles/main.scss';

/*internal modules */
import './core/assets';

const app = angular.module('app', []);

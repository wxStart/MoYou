/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

// eslint-disable-next-line no-undef
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;

AppRegistry.registerComponent(appName, () => App);

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// React Navigation Stack
import './gesture-handler';

AppRegistry.registerComponent(appName, () => App);

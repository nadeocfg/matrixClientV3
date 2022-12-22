/**
 * @format
 */
import 'react-native-url-polyfill/auto';
import { AppRegistry } from 'react-native';
import AppWrapper from './index.tsx';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppWrapper);

import {AppRegistry} from 'react-native';
import Login from './Pages/Login';
import BottomNavigation from './Pages/BottomNavigation/BottomNavigation'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => BottomNavigation);
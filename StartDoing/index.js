import {AppRegistry} from 'react-native';
import Login from './Pages/Login';
import Register from './Pages/Register';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Register);
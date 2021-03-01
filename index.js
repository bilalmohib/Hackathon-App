/**
 * @format
 */
import React from 'react'

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// For the redux confguration
import { Provider } from 'react-redux';
import store from './src/store';
// For the redux confguration



// For the redux confguration a function
const RNRedux = () => (
    <Provider store = { store }>
      <App />
    </Provider>
  )
// For the redux confguration a function


AppRegistry.registerComponent(appName, () => RNRedux);

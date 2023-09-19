/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AuthWrapper from './src/AuthWrapper';
import React from 'react';

const AppName = () => {
  return (
    <AuthWrapper>
      <App />
    </AuthWrapper>
  );
};

AppRegistry.registerComponent(appName, () => AppName);

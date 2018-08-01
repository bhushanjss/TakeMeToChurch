import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ProfileForm from './components/ProfileForm';

const RouterComponent = () => (
  <Router>
    <Scene key="root">
      <Scene key="login" component={LoginForm} title="Please Login" />
      <Scene key="profileForm" component={ProfileForm} title="Create Profile" initial />
    </Scene>
  </Router>
);

export default RouterComponent;

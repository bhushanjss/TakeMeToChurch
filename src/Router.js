import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ProfileForm from './components/ProfileForm';
import ProfileChurchForm from './components/ProfileChurchForm';
import AddChurchForm from './components/AddChurchForm';
import Profile from './components/Profile';
import Drivers from './components/Drivers';

const RouterComponent = () => (
  <Router>
    <Scene key="root">
      <Scene key="login" component={LoginForm} title="Please Login" />
      <Scene key="profileForm" component={ProfileForm} title="Create Profile" />
      <Scene key="profile" component={Profile} title="Profile" />
      <Scene key="profileChurchForm" component={ProfileChurchForm} title="Manage Church" />
      <Scene key="churchForm" component={AddChurchForm} title="Add Church" />
      <Scene key="drivers" component={Drivers} title="Drivers Nearby" initial/>
    </Scene>
  </Router>
);

export default RouterComponent;

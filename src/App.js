import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import LoginForm from './components/LoginForm';
import ProfileForm from './components/ProfileForm';
import ProfileChurchForm from './components/ProfileChurchForm';
import AddChurchForm from './components/AddChurchForm';
import Profile from './components/Profile';
import Drivers from './components/Drivers';
import configureStore from './configureStore';

import fireBaseKey from '../secretkey';

const store = configureStore();

export default class App extends Component {
  componentWillMount() {
  firebase.initializeApp(fireBaseKey);
}

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}> 
        <RootStack />         
        </View>
      </Provider>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Login: LoginForm,
    ProfileForm: ProfileForm,
    ProfileChurchForm: ProfileChurchForm,
    AddChurchForm: AddChurchForm,
    Profile: Profile,
    Drivers: Drivers
  },
  {
    initialRouteName: 'Login',
  }
);

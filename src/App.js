import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';

import LoginForm from './components/LoginForm';
import configureStore from './configureStore';

import fireBaseKey from '../secretkey';

const store = configureStore();

export default class App extends Component {
  componentWillMount() {
}

  render() {
    return (
      <Provider store={store}>
      <View style={{flex: 1}}>
          <LoginForm />
      </View>    
      </Provider>
    );
  }
}


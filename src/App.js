import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import configureStore from './configureStore';

import Router from './Router';
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
          <Router />
        </View>
      </Provider>
    );
  }
}

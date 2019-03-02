import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';

import LoginForm from './components/LoginForm';
import configureStore from './configureStore';
import Amplify from 'aws-amplify';

import fireBaseKey from '../secretkey';
import awsConfig from '../aws-exports';

const store = configureStore();
Amplify.configure(awsConfig);

class App extends Component {
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

export default App;

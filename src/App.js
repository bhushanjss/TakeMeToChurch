import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import { createDrawerNavigator, DrawerItems, SafeAreaView, StackNavigator } from 'react-navigation';
import { Button, Icon } from 'react-native-elements';

import NavigationService from './NavigationService';
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

toggleNavigation = () =>  {
  NavigationService.toggleDrawer();
}

  render() {
    return (
      <Provider store={store}>
          <View style={{ flex: 1, flexDirection: 'column' }}> 
            <View style={{ flex: 1, height: 24, paddingLeft: 24, paddingTop: 24, alignItems: 'flex-start' }}>   
              <Button
                title=''
                icon={<Icon name='menu' size={24} />}
                onPress={this.toggleNavigation.bind(this)}
                />
             </View> 
            <View style={{ height:600 }}>        
              <RootStack 
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }} />
             </View> 
          </View>
      </Provider>
    );
  }
}

const DrawerRoutes = {
    Profile: {
        name: 'Profile',
        screen: Profile
    },
    Login: {
        name: 'LoginForm',
        screen: LoginForm
    },
    ProfileForm: {
      screen: ProfileForm
    },
    ProfileChurchForm: {
      screen: ProfileChurchForm
    },
    AddChurchForm: {
      screen: AddChurchForm
    },
    Profile: {
      screen: Profile
    },
    Drivers: {
      screen: Drivers
    }
  };


const RootStack = createDrawerNavigator(
  DrawerRoutes, {
    drawerWidth: 300,
    initialRouteName: 'Login',
    contentComponent: props => {
                return (
                  <View style={{flex:1}}>                    
                    <DrawerItems {...props} />                    
                </View>);
            },
    contentOptions: {
        activeBackgroundColor: '#eee',        
        labelStyle: {
            fontSize: 16            
        }
    },
    drawerBackgroundColor: '#e0e0e0',
    backBehavior: 'none'
  }
);

const CustomDrawerContentComponent = (props) => (
  <ScrollView style={{ flex: 1 }}>
      <DrawerItems {...props} />
  </ScrollView>
);


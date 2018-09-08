import React, { Component } from 'react';
import { createDrawerNavigator, DrawerItems, SafeAreaView, StackNavigator } from 'react-navigation';
import { View, ScrollView, Text } from 'react-native';
import ProfileForm from './components/ProfileForm';
import ProfileChurchForm from './components/ProfileChurchForm';
import AddChurchForm from './components/AddChurchForm';
import Profile from './components/Profile';
import Drivers from './components/Drivers';
import NavigationService from './NavigationService';

class Routes extends Component {
  render() {
    return <RootStack 
      ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }} />
  }
}

const DrawerRoutes = {
    Profile: {
        name: 'Profile',
        screen: Profile
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
    Drivers: {
      screen: Drivers
    }
  };


const RootStack = createDrawerNavigator(
  DrawerRoutes, {
    drawerWidth: 300,
    initialRouteName: 'Drivers',
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

export default Routes;
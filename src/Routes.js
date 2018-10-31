import React, { Component } from 'react';
import { createDrawerNavigator, DrawerItems, SafeAreaView, StackNavigator } from 'react-navigation';
import { View, ScrollView, Text } from 'react-native';
import ProfileForm from './components/ProfileForm';
import ProfileChurchForm from './components/ProfileChurchForm';
import AddChurchForm from './components/AddChurchForm';
import Profile from './components/Profile';
import Drivers from './components/Drivers';
import MapMain from './components/MapMain';
import Logout from './components/Logout';
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
    },
    MapMain: {
      screen: MapMain
    },
    Logout: {
      screen: Logout
    }
  };


const RootStack = createDrawerNavigator(
  DrawerRoutes, {
    drawerWidth: 300,
    drawerMarginTop: 60,
    initialRouteName: 'Profile',
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

const defaultGetStateForAction = RootStack.router.getStateForAction;
RootStack.router.getStateForAction = (action, state) => {
  switch (action.type) {      
    case 'Navigation\/CLOSE_DRAWER':
    case 'Navigation\/DRAWER_CLOSED':
    console.log('closed');
      break;
    }

  return defaultGetStateForAction(action, state);
};
  

export default Routes;
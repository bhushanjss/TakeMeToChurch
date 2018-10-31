import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { Card, CardSection, Input, Spinner, Header } from './common';
import Toast from './common/Toast';
import { emailChange, passwordChange, resetLoginForm, loginUser, loginFacebook,
   createUser, toggleAccount, confirmPasswordChange } from '../actions/forms';
import Routes from '../Routes';
import ProfileForm from './ProfileForm';
import NavigationService from '../NavigationService';

let windowHeight = Dimensions.get('window').height

class LoginForm extends Component {

	onLoginButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });    
	}

  onFacebookLogin(data) {
    console.log("Logged in!");
    console.log(data);
    this.props.loginFacebook(data.credentials.token);
  }

  onCreateUserButtonPress() {
    const { email, password } = this.props;
    this.props.createUser({ email, password });
  }

  onAccountToggle() {
    this.props.toggleAccount(!this.props.showCreateUser);
  }

  emailChange(text) {
    this.props.emailChange(text);
  }

  passwordChange(text) {
    this.props.passwordChange(text);
  }

  confirmPasswordChange(text) {
    this.props.confirmPasswordChange(text);
  }

  toggleNavigation = () =>  {
    NavigationService.toggleDrawer();
  }

  renderButton() {
    const { loading, showCreateUser } = this.props;

    if (loading) {
      return <Spinner size="small" />;
    }

    if (showCreateUser) {
      return (
        <View style={styles.createUserView}>
          <Button title='Create User' onPress={this.onCreateUserButtonPress.bind(this)} />
        </View>  
      );
    }
    return (
      <View style={styles.createUserView}>
        <Button title='Log In' onPress={this.onLoginButtonPress.bind(this)} />

        <FBLogin style={{ marginBottom: 10, marginTop: 10, flex: 1, alignSelf: 'center' }}
        ref={(fbLogin) => { this.fbLogin = fbLogin }}
        permissions={["public_profile", "email"]}
        onLogin={this.onFacebookLogin.bind(this)}
        onLogout={function(){
          console.log("Logged out.");
        }}
        onError={function(data){
          console.log("ERROR");
          console.log(data);
        }}
      />
       </View> 
    );
  }

  renderCreateButton() {
    const { loading, showCreateUser } = this.props;
    const newAccountMessage = 'Don\'t have an Account yet. Create a New Account';
    const alreadySignedUp = 'Already have an Account. Please Login';

    if (!loading && !showCreateUser) {
      return (
        <View style={styles.createUserView}>
          <Text style={styles.createUserViewText}>
            {newAccountMessage}
          </Text>
          <Button title='Sign Up' onPress={this.onAccountToggle.bind(this)} />
        </View>
      );
    }
    if (!loading && showCreateUser) {
      return (
        <View style={styles.createUserView}>
          <Text style={styles.createUserViewText}>
            {alreadySignedUp}
          </Text>
          <Button title='Sing In' onPress={this.onAccountToggle.bind(this)} />
        </View>
      );
    }
  }

renderPassword() {
    const { password, confirmPassword, showCreateUser } = this.props;

    if (showCreateUser) {
      return (
        <CardSection>
          <Input
            placeholder="password"
            label="Password"
            secureTextEntry
            onChangeText={this.passwordChange.bind(this)}
            value={password}
          />
          <Input
            placeholder="confirm password"
            label="Confirm Password"
            secureTextEntry
            onChangeText={this.confirmPasswordChange.bind(this)}
            value={confirmPassword}
          />
        </CardSection>
      );
    }

    return (
      <CardSection>
        <Input
          placeholder="password"
          label="Password"
          secureTextEntry
          onChangeText={this.passwordChange.bind(this)}
          value={password}
        />
      </CardSection>
    );
  }

  renderError() {
    const { error } = this.props;
    if(error) {
      return(
      <Toast msg={error} type={'error'}/>
      )
    }
  }

  renderHamburger() {
    if(!this.props.drawerClosed) {
      return(
        <View style={{ height: 30, marginTop: 15, marginBottom: 0, paddingLeft: 15,
          alignItems: 'flex-start', position: 'absolute', elevation: 1 }}>   
          <Button
            title=''
            icon={<Icon name='menu' size={30} />}
            onPress={this.toggleNavigation.bind(this)}
            />
         </View>
      );
    }
  }

  renderDisplay() {
    const { email, user } = this.props;
    if(user) {
      return (
      <View style={{ position: 'absolute', height: '100%', width: '100%', }}> 
        <View style={{ height: '100%', width: '100%', position: 'absolute' }}>        
          <Routes />
        </View>
        {this.renderHamburger()}         
      </View>
      );
    }

    return (
    <View>
      <Header headerText="Take Me To Church" />
      <View style={{height: 100}} /> 
      <Card>        
        <CardSection >
          <Input
            placeholder="user@gmail.com"
            label="Email"
            onChangeText={this.emailChange.bind(this)}
            value={email}
          />
        </CardSection>
        {this.renderPassword()}
        <CardSection>
          {this.renderButton()}
        </CardSection>
        <CardSection>
          {this.renderCreateButton()}
        </CardSection>
     </Card>
    </View> 
  );

  }

	render() {
    return ( 
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
      {this.renderDisplay()}
      {this.renderError()}
    </View>
    )		
  }
}

const mapStateToProps = state => ({
  email: state.loginForm.email,
  password: state.loginForm.password,
  confirmPassword: state.loginForm.confirmPassword,
  error: state.loginForm.error,
  showCreateUser: state.loginForm.showCreateUser,
  loading: state.loginForm.loading,
  user: state.loginForm.user,
  drawerClosed: state.loginForm.drawerClosed
});

const styles = StyleSheet.create({
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
  createUserViewText: {
    paddingBottom: 10,
    paddingLeft: 5,
    paddingTop: 5
  },
  createUserView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 75
  }
});


export default connect(mapStateToProps, { emailChange,
  passwordChange,
  confirmPasswordChange,
  resetLoginForm,
  loginUser,
  loginFacebook,
  createUser,
  toggleAccount
 })(LoginForm);

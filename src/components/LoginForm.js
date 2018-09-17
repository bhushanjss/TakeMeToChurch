import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { Card, CardSection, Input, Spinner } from './common';
import { emailChange, passwordChange, resetLoginForm, loginUser, loginFacebook,
   createUser, toggleAccount, confirmPasswordChange } from '../actions/forms';
import Routes from '../Routes';
import NavigationService from '../NavigationService';

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

  renderDisplay() {
    const { email, user } = this.props;
    if(user) {
      return (
      <View style={{ flex: 1 }}> 
        <View style={{ height: 24, marginTop: 24, marginBottom: 4, paddingLeft: 16, alignItems: 'flex-start' }}>   
          <Button
            title=''
            icon={<Icon name='menu' size={24} />}
            onPress={this.toggleNavigation.bind(this)}
            />
         </View> 
        <View style={{ height:600 }}>        
          <Routes />
         </View> 
      </View>
      );
    }

    return (
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
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
        <CardSection>
          {this.renderCreateButton()}
        </CardSection>
    </Card>
  );

  }

	render() {
    return ( 
    <View>
    { this.renderDisplay() }
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
  user: state.loginForm.user
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

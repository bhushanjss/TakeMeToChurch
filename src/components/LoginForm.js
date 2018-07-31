import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { Button, Card, CardSection, Input, Spinner } from './common';
import { emailChange, passwordChange, resetLoginForm, loginUser,
   createUser, toggleAccount, confirmPasswordChange } from '../actions';

class LoginForm extends Component {

	onLoginButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
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

  renderButton() {
    const { loading, showCreateUser } = this.props;

    if (loading) {
      return <Spinner size="small" />;
    }

    if (showCreateUser) {
      return (
        <Button onPress={this.onCreateUserButtonPress.bind(this)}>
        Create User
        </Button>
      );
    }
    return (
      <Button onPress={this.onLoginButtonPress.bind(this)}>
      Log In
      </Button>
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
          <Button onPress={this.onAccountToggle.bind(this)}>
            Sign Up
          </Button>
        </View>
      );
    }
    if (!loading && showCreateUser) {
      return (
        <View style={styles.createUserView}>
          <Text style={styles.createUserViewText}>
            {alreadySignedUp}
          </Text>
          <Button onPress={this.onAccountToggle.bind(this)}>
            Sign In
          </Button>
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

	render() {
    const { email } = this.props;

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
}

const mapStateToProps = state => ({
  email: state.loginForm.email,
  password: state.loginForm.password,
  confirmPassword: state.loginForm.confirmPassword,
  error: state.loginForm.error,
  showCreateUser: state.loginForm.showCreateUser,
  loading: state.loginForm.loading
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
  createUser,
  toggleAccount
 })(LoginForm);

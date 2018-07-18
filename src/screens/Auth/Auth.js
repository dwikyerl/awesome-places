import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import { connect } from 'react-redux';

import * as actionCreators from '@/store/actions';
import startMainTabs from '@/screens/MainTabs/startMainTabs';
import DefaultInput from '@/components/UI/DefaultInput/DefaultInput';
import HeadingText from '@/components/UI/HeadingText/HeadingText';
import MainText from '@/components/UI/MainText/MainText';
import ButtonWithBackground from '@/components/UI/Button/ButtonWithBackground';

import validate from '@/utility/validation';

import backgroundImage from '@/assets/bg.jpg';

class AuthScreen extends Component {
  state = {
    authMode: 'login',
    viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword:{
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    },
    isFormValid: false
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onLogin(authData);
    startMainTabs();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      }
    })
  }

  updateStyles = () => {
    this.setState({
      viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape'
    })
  }

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }

    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      const updateState = {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: key === 'password' ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue) : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value,
            valid: validate(value, prevState.controls[key].validationRules, connectedValue),
            touched: true
          }
        }
      };

      let isFormValid = Object.keys(updateState.controls).every(input => {
        if (prevState.authMode === 'login' && input === 'confirmPassword') {
          return true;
        }
        return updateState.controls[input].valid;
      });

      return {...updateState, isFormValid };
    });
  }

  render() {
    let headingText = null;
    let confirmPasswordControl = null;

    if (this.state.viewMode === 'potrait') {
      headingText = (
        <MainText>
          <HeadingText >Please Log In</HeadingText>
        </MainText>
      );
    }

    if (this.state.authMode === 'signup') {
      confirmPasswordControl = (
        <View style={
          this.state.viewMode === 'potrait' ? 
            styles.potraitPasswordWrapper :
            styles.landscapePasswordWrapper
        }>
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            secureTextEntry={true}
            onChangeText={(val) => this.updateInputState('confirmPassword', val)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            />
        </View>
      );
    }

    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          { headingText }
          <ButtonWithBackground
            color="#29AAF4"
            onPress={this.switchAuthModeHandler}
          >Switch to {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}</ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer} >
              <DefaultInput
                placeholder="Your E-mail address"
                style={styles.input}
                value={this.state.controls.email.value}
                onChangeText={(val) => this.updateInputState('email', val)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType='email-address'
              />
              <View style={
                this.state.viewMode === 'potrait' || this.state.authMode === 'login'? 
                  styles.potraitPasswordContainer :
                  styles.landscapePasswordContainer
              }>
                <View style={
                  this.state.viewMode === 'potrait' || this.state.authMode === 'login' ? 
                    styles.potraitPasswordWrapper :
                    styles.landscapePasswordWrapper
                }>
                  <DefaultInput
                    placeholder="Password"
                    style={styles.input}
                    value={this.state.controls.password.value}
                    secureTextEntry={true}
                    onChangeText={(val) => this.updateInputState('password', val)}
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                  />
                </View>
                { confirmPasswordControl }
              </View>
            </View>
          </TouchableWithoutFeedback>
          <ButtonWithBackground
            onPress={this.loginHandler}
            color="#29AAF4"
            disabled={!this.state.isFormValid}>
            Submit
          </ButtonWithBackground>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  potraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  potraitPasswordWrapper: {
    width: '100%'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (authData) => dispatch(actionCreators.tryAuth(authData))
  }
}

export default connect(null, mapDispatchToProps)(AuthScreen);
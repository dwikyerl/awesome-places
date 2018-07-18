import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
  ImageBackground,
  Dimensions
} from 'react-native';

import startMainTabs from '@/screens/MainTabs/startMainTabs';
import DefaultInput from '@/components/UI/DefaultInput/DefaultInput';
import HeadingText from '@/components/UI/HeadingText/HeadingText';
import MainText from '@/components/UI/MainText/MainText';
import ButtonWithBackground from '@/components/UI/Button/ButtonWithBackground';

import backgroundImage from '@/assets/bg.jpg';

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        }
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        }
      },
      confirmPassword:{
        value: '',
        valid: false,
        validationRules: {
          equalTo: 6
        }
      }
    }
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  loginHandler = () => {
    startMainTabs();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles)
  }

  updateStyles = () => {
    this.setState({
      viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape'
    })
  }

  updateInputState = (key, value) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value
          }
        }
      }
    })
  }

  render() {
    let headingText = null;

    if (this.state.viewMode === 'potrait') {
      headingText = (
        <MainText>
          <HeadingText >Please Log In</HeadingText>
        </MainText>
      );
    }

    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container} >
          { headingText }
          <ButtonWithBackground
            color="#29AAF4"
            onPress={() => alert('hello')}
          >Switch To Login</ButtonWithBackground>
          <View style={styles.inputContainer} >
            <DefaultInput
              placeholder="Your e-mail address"
              style={styles.input}
              value={this.state.controls.email.value}
              onChangeText={(val) => this.updateInputState('email', val)}
            />
            <View style={
              this.state.viewMode === 'potrait' ? 
                styles.potraitPasswordContainer :
                styles.landscapePasswordContainer
            }>
              <View style={
                this.state.viewMode === 'potrait' ? 
                  styles.potraitPasswordWrapper :
                  styles.landscapePasswordWrapper
              }>
                <DefaultInput
                  placeholder="Password"
                  style={styles.input}
                  value={this.state.controls.password.value}
                  secureTextEntry={true}
                  onChangeText={(val) => this.updateInputState('password', val)}
                />
              </View>
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
                  />
              </View>
            </View>
          </View>
          <ButtonWithBackground
            onPress={this.loginHandler}
            color="#29AAF4">Submit</ButtonWithBackground>
        </View>
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

export default AuthScreen;
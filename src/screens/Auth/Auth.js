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
    respStyles: {
      pwContainerDirection: 'column',
      pwContainerJustify: 'flex-start',
      pwWrapperWidth: '100%'
    }
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', (dims) => {
      if (dims.window.height < 500) {
        this.setState({
          respStyles: {
            pwContainerDirection: 'row',
            pwContainerJustify: 'space-between',
            pwWrapperWidth: '45%'
          }
        });
      }
    });
  }
  loginHandler = () => {
    startMainTabs();
  }

  render() {
    let headingText = null;

    if (Dimensions.get('window').height > 500) {
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
            <DefaultInput placeholder="Your e-mail address" style={styles.input} />
            <View style={{
              flexDirection: this.state.respStyles.pwContainerDirection,
              justifyContent: this.state.respStyles.pwContainerJustify
            }}>
              <View style={{
                width: this.state.respStyles.pwWrapperWidth
              }}>
                <DefaultInput placeholder="Password" style={styles.input}/>
              </View>
              <View style={{
                width: this.state.respStyles.pwWrapperWidth
              }}>
                <DefaultInput placeholder="Confirm Password" style={styles.input}/>
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
  passwordContainer: {
    flexDirection: Dimensions.get('window').height > 500 ? "column" : "row",
    justifyContent: 'space-between'
  },
  passwordWrapper: {
    width: Dimensions.get('window').height > 500 ? '100%' : '50%'
  }
});

export default AuthScreen;
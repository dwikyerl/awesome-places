import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = (props) => (
  <TextInput
    {...props}
    style={[styles.input, props.style]}
    underlineColorAndroid="transparent"
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    margin: 8,
    borderRadius: 5
  }
});

export default defaultInput;
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = (props) => (
  <TextInput
    {...props}
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null ]}
    underlineColorAndroid="transparent"
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5
  },
  invalid: {
    backgroundColor: '#F9C0C0',
    borderColor: 'red'
  }
});

export default defaultInput;
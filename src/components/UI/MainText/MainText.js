import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default mainText = (props) => {
  return (
    <Text style={styles.mainText}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  mainText: {
    color: '#000',
    backgroundColor: 'transparent',
    margin: 16
  }
});


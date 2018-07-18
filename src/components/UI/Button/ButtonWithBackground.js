import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default buttonWithBackground = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.button, { backgroundColor: props.color }]} >
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff'
  }
});

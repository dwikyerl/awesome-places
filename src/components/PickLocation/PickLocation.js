import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

export default class PickLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Text>Map</Text>
        </View>
        <View style={styles.button}>
          <Button title="Locate me" onPress={() => alert('Locate me')}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 8
  },
  image: {
    width: '100%',
    height: '100%'
  }
});
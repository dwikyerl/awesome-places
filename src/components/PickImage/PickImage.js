import React, { Component } from 'react';
import { Image, StyleSheet, View, Button} from 'react-native';
import image from '@/assets/beautiful-place.jpg';

export default class PickImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image style={styles.image} source={image} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={() => alert('Pick Image')} />
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
})

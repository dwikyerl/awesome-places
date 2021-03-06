import React, { Component } from 'react';
import { 
  View,
  Text,
  Button, 
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import { connect } from 'react-redux';

import * as actionCreators from '@/store/actions';
import MainText from '@/components/UI/MainText/MainText';
import HeadingText from '@/components/UI/HeadingText/HeadingText';
import PlaceInput from '@/components/PlaceInput/PlaceInput';
import PickImage from '@/components/PickImage/PickImage';
import PickLocation from '@/components/PickLocation/PickLocation';

import validate from '@/utility/validation';

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  }

  state = {
    controls: {
      placeName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      location: {
        value: null,
        valid: false
      }
    }
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left'
        });
      }
    }
  }

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      };
    });
  };

  placeAddedHandler = () => {
    this.props.onAddPlace(this.state.controls.placeName.value, this.state.controls.location.value);
  }

  locationPickHandler = location => {
    this.setState(prevState => {
      return {
          controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      }
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation onLocationPick={this.locationPickHandler}/>
          <PlaceInput
            placeName={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}
            valid={this.state.controls.placeName.valid}
          />
          <View style={styles.button}>
            <Button
              title="Share the place!"
              onPress={this.placeAddedHandler}
              disabled={
                !this.state.controls.placeName.valid ||
                !this.state.controls.location.valid
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%'
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

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location) => dispatch(actionCreators.addPlace(placeName, location))
  };
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
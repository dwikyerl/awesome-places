import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from 'react-redux';

import * as actionCreators from '@/store/actions';

import PlaceInput from "@/components/PlaceInput/PlaceInput";
import PlaceList from "@/components/PlaceList/PlaceList";
import PlaceDetail from '@/components/PlaceDetail/PlaceDetail';

class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.props.onDeletePlace}
          onModalClosed={this.props.onDeselectPlace}/>
        <PlaceInput onPlaceAdded={this.props.onAddPlace} />
        <PlaceList
          places={this.props.places}
          onItemSelected={this.props.onSelectPlace} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (name) => dispatch(actionCreators.addPlace(name)),
    onDeletePlace: () => dispatch(actionCreators.deletePlace()),
    onSelectPlace: (key) => dispatch(actionCreators.selectPlace(key)),
    onDeselectPlace: () => dispatch(actionCreators.deselectPlace())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
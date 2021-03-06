import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import DefaultInput from '@/components/UI/DefaultInput/DefaultInput';

const placeInput = (props) => {
  return <DefaultInput
    placeholder="Place Name"
    value={props.placeName}
    onChangeText={props.onChangeText}
    {...props}
  />
}

export default placeInput;
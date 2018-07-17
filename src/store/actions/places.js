import * as actionTypes from './actionTypes';

export const addPlace = (placeName) => {
  return {
    type: actionTypes.ADD_PLACE,
    placeName
  };
};

export const deletePlace = (key) => {
  return {
    type: actionTypes.DELETE_PLACE,
    placeKey: key
  };
};

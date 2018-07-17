import * as actionTypes from '../actions/actionTypes';
import placeImage from '@/assets/beautiful-place.jpg';

const initialState = {
  places: [],
  selectedPlace: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case (actionTypes.ADD_PLACE):
    const key = ''+(Date.now() + Math.floor( Math.random() * 100));
    return {
      ...state,
      places: [
        ...state.places,
        {
          key,
          name: action.placeName,
          image: placeImage
        }
      ]
    };
    case (actionTypes.DELETE_PLACE):
      return {
        ...state,
        places: state.places.filter((place) => {
          return place.key !== state.selectedPlace.key
        }),
        selectedPlace: null
      }
    case (actionTypes.SELECT_PLACE):
      return { 
        ...state,
        selectedPlace: state.places.find(place => place.key === action.key)
      }
    case (actionTypes.DESELECT_PLACE):
      return {
        ...state,
        selectedPlace: null
      }
    default:
      return state;
  }
};

export default reducer;

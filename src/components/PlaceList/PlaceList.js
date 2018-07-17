import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import ListItem from '@/components/ListItem/ListItem';

const placeList = props => {
    return (
        <FlatList
          data={props.places}
          renderItem={(info) => (
            <ListItem
              placeName={info.item.name}
              placeImage={info.item.image}
              onItemPressed={() => props.onItemSelected(info.item.key)}/>
          )}
          style={styles.listContainer} />
    );
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%"
    }
});

export default placeList;
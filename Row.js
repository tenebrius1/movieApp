import React from "react";
import { TouchableOpacity, StyleSheet, Text, Image, View } from "react-native";

const styles = StyleSheet.create({
  row: {
    padding: 10,
    flexDirection: "row",
  },
  text: {
    fontWeight: 'bold', 
    width: 200,
    flexWrap: 'wrap'
  },
  view: {
    paddingLeft: 10,
    flexDirection: 'column',
  },
});

const Row = props => (
  <TouchableOpacity
    style={styles.row}
    onPress={() => props.onSelectMovie(props)}
  >
    <Image
      style={{ width: 80, height: 100, marginRight: 10 }}
      source={{ uri: props.img }}
    />
    <View style={ styles.view }>
      <Text style={ styles.text }>{props.title}</Text>
      <Text>{props.yearAndType}</Text>
    </View>
      
  </TouchableOpacity>
);

export default Row;

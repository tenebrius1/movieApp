import React from "react";
import { FlatList } from "react-native";
import PropTypes from "prop-types";

import Row from "./Row";

const FlatListMovies = props => (
  <FlatList
    ListEmptyComponent={props.ListEmptyComponent}
    onEndReached={props.onEndReached}
    onEndReachedThreshold = {0.5}
    renderItem={({ item }) => <Row {...item} onSelectMovie={props.onSelectMovie} /> }
    data={props.movies}
    keyExtractor={(item, index) => index.toString()}
  />
);

FlatListMovies.propTypes = {
  movies: PropTypes.array
};

export default FlatListMovies;

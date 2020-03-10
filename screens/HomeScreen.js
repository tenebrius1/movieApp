import React from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FlatListMovies from "../FlatListMovies";
import Constants from "expo-constants";

let { width } = Dimensions.get("window");

const KEY = "f5c4e49d";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      movies: [],
      page: 2,
    };
  }

  handleSelectMovie = movie => {
    this.props.navigation.navigate("Details", movie);
  };

  processSearch = movie => ({
    title: movie.Title,
    yearAndType: `${movie.Year} (${movie.Type})`,
    img: movie.Poster,
    id: movie.imdbID
  });

  fetchMovies = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${KEY}&s=${this.state.search}`
    );
    const results = await response.json();
    return results.Response === "False"
      ? (this.setState({ movies: [] }), null)
      : results.Search.map(this.processSearch);
  };

  getMovies = async () => {
    const results = await this.fetchMovies();
    return results === null ? {} : this.setState({ movies: results });
  };

  listEmptyComponent = () => <Text style={styles.text}>No results...</Text>;

  handleScroll = async () => {
    this.setState({page: this.state.page + 1})
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${KEY}&s=${this.state.search}&page=${this.state.page}`
    )
    const results = await response.json()
    if (results.Response !== "False") {
      const newData = this.state.movies.concat(results.Search.map(this.processSearch))
      this.setState({ movies: [...newData]})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoFocus
          placeholder="Enter movie name"
          onChangeText={search => this.setState({ search })}
          onSubmitEditing={this.getMovies}
          value={this.state.search}
        />
        <FlatListMovies
          ListEmptyComponent={this.listEmptyComponent}
          movies={this.state.movies}
          onSelectMovie={this.handleSelectMovie}
          onEndReached={this.handleScroll}
        />
      </View>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  return <HomeScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: "whitesmoke",
    alignItems: "center",
    flex: 1,
    paddingTop: 5
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 5,
    height: 40,
    width: width - 10
  },
  text: {
    fontSize: 20
  }
});

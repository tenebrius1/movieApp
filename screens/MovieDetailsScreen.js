import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

class MovieDetailsScreen extends React.Component {
  state = {
    moviedetails: []
  };

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.route.params.title });
    const fetchDetails = async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=f5c4e49d&i=${this.props.route.params.id}&plot=full`
      );
      const results = await response.json();
      this.setState({ moviedetails: results });
    };
    fetchDetails();
  }

  renderItem = ({ item }) => {
    let width = "";
    if (
      item.Value[0] === "1" &&
      item.Value[1] === "0" &&
      item.Value[2] === "0"
    ) {
      width = "100";
    } else {
      width = item.Value.replace(/[^0-9]/g, "").substring(0, 2);
    }
    return (
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 10 }}>
          {`${item.Source} : ${item.Value}`}
        </Text>
        <View
          style={{
            width: Number(width) * 3,
            height: 20,
            backgroundColor: "green",
            borderRadius: 10
          }}
        ></View>
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.view}>
          <Image
            style={{ width: 200, height: 300, marginBottom: 10 }}
            source={{ uri: this.state.moviedetails.Poster }}
          />
          <Text style={styles.title}> {this.state.moviedetails.Title} ({this.state.moviedetails.Year})</Text>
          <Text> {this.state.moviedetails.Rated} ({this.state.moviedetails.Runtime}) </Text>
          <Text style={styles.plot}>{this.state.moviedetails.Plot} </Text>
        </View>
        <View style={{marginHorizontal: 20}}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.moviedetails.Ratings}
            renderItem={this.renderItem}
          />
        </View>
      </ScrollView>
    );
  }
}

export default function(props) {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <MovieDetailsScreen {...props} navigation={navigation} route={route} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  view: {
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  plot: {
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 40,
    fontStyle: "italic",
    fontSize: 14,
    textAlign: "left"
  }
});

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Homescreen",
            headerTitleStyle: {
              fontWeight: "bold"
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name='Details'
          component={MovieDetailsScreen}
          options={({ route }) => ({
            title: route.params.name,
            headerTitleStyle: {
              fontWeight: "bold"
            },
            headerTitleAlign: "center",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

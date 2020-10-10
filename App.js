import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import About from "./screens/About";
import VideoSearch from "./screens/VideoSearch";
import Covid from "./screens/Covid";

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContentOptions={{
          activeTintColor: "#150578",
          activeBackgroundColor: "#15077811",
          labelStyle: {
            fontSize: 18,
            fontWeight: '900',
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={() => ({
            title: "Home",
            drawerIcon: () => (
              <MaterialCommunityIcons name="home" size={26} color="#150578" />
            ),
          })}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Video Search"
          component={VideoSearch}
          options={() => ({
            title: "Video Search",
            drawerIcon: () => (
              <MaterialCommunityIcons name="play" size={26} color="#150578" />
            ),
          })}
        ></Drawer.Screen>
        <Drawer.Screen
          name="COVID-19 Tracker"
          component={Covid}
          options={() => ({
            title: "COVID-19 Tracker",
            drawerIcon: () => (
              <MaterialCommunityIcons name="database-search" size={26} color="#150578" />
            ),
          })}
        ></Drawer.Screen>
        <Drawer.Screen
          name="About"
          component={About}
          options={() => ({
            title: "About",
            drawerIcon: () => (
              <MaterialCommunityIcons name="information" size={26} color="#150578" />
            ),
          })}
        ></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

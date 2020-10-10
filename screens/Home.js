import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Weather from "./weather/Weather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Map from "./maps/Map";
import DistanceCalculator from "./maps/DistanceCalculator";

export default function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
    initialRouteName="Weather"
      tabBarOptions={{
        labelStyle:{
          fontSize: 15,
          marginBottom: 2,
          marginTop: -5
        },
        activeTintColor: "#150578",
        inactiveTintColor: "#a3a3a3"
      }}
    >
      <Tab.Screen
        name="Weather"
        component={Weather}
        options={{
          tabBarLabel: "Weather",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cloud" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={Map}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Distance"
        component={DistanceCalculator}
        options={{
          tabBarLabel: "Distance",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker-distance" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

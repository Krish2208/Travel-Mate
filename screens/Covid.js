import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo } from "@expo/vector-icons";
import World from './Covid/World';
import Country from './Covid/Country';

export default function Covid() {
      const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator
        initialRouteName="World"
        tabBarOptions={{
          labelStyle: {
            fontSize: 15,
            marginBottom: 2,
            marginTop: -5,
          },
          activeTintColor: "#150578",
          inactiveTintColor: "#a3a3a3",
        }}
      >
        <Tab.Screen
          name="World"
          component={World}
          options={{
            tabBarLabel: "World",
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-globe" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="India"
          component={Country}
          options={{
            tabBarLabel: "India",
            tabBarIcon: ({ color }) => (
              <Entypo
                name="linkedin"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
}

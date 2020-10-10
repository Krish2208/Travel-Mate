import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { colors } from "../utils/index";
import * as Location from "expo-location";
import ReloadIcon from "./weather/ReloadIcon";
import * as WebBrowser from "expo-web-browser";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "react-native-paper";

const API_KEY = "AIzaSyAPHwRiCIpUPqgntbSzBpnOxHnVaxJwPjw";
const BASE_LOCATION_URL = "http://www.mapquestapi.com/geocoding/v1/reverse?";
const MAPS_API = "YOUR_API";

const _handlePressButtonAsync = async (link) => {
  let result = await WebBrowser.openBrowserAsync(link);
};

function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <Card
        onPress={async () => {
          let result = await WebBrowser.openBrowserAsync(item.contentUrl);
        }}
      >
        <Card.Cover source={{ uri: item.thumbnailUrl }} style={{height:150}} />
        <Card.Title title={item.name} titleNumberOfLines={2} titleStyle={{fontSize: 16}}/>
      </Card>
      {/* <View>
        <Image
          source={{
            uri: item.thumbnailUrl,
          }}
          style={{ width: 130, height: 80, borderRadius: 2 }}
        />
      </View>
      <View
        style={{
          alignItems: "flex-start",
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, flexWrap: "wrap" }}>
          {item.name}
        </Text>
      </View>
      <View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
        <MaterialCommunityIcons
          name="play"
          size={26}
          color="#150578"
          onPress={async () => {
            let result = await WebBrowser.openBrowserAsync(item.contentUrl);
          }}
        />
        </View> */}
    </View>
  );
}
export default function VideoSearch() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [videos, setVideos] = useState(null);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    load();
  }, []);
  async function load() {
    try {
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      const response1 = await fetch(
        `${BASE_LOCATION_URL}key=${MAPS_API}&location=${latitude},${longitude}`
      );
      const result1 = await response1.json();

      if (response1.ok) {
        setCurrent(result1.results[0].locations[0].adminArea3);
        const response2 = await fetch(
          `https://rapidapi.p.rapidapi.com/videos/search?q=${result1.results[0].locations[0].adminArea3}%20Tourism&count=30`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "bing-video-search1.p.rapidapi.com",
              "x-rapidapi-key":
                "YOUR_API",
            },
          }
        );
        const result2 = await response2.json();
        if (response2.ok) {
          setVideos(result2.value);
        }
      } else {
        setErrorMessage("Unable to fetch");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  if (videos != null) {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#4fb4f0",
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            Smart Tourism Video Search
          </Text>
        </View>
        <FlatList
          style={{ flex: 1, marginTop: 20 }}
          data={videos}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.webSearchUrl}
        />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text style={{ textAlign: "center" }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
  reloadIcon: {
    position: "absolute",
    top: 30,
    right: 30,
    zIndex: 5,
  },
  listItem: {
    margin: 10,
    backgroundColor: "#FFF",
    alignContent: 'center',
    width: "95%",
    borderRadius: 5,
  },
});

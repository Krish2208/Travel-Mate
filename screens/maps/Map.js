import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../utils/index";


export default function Map() {
  const [errorMessage, setErrorMessage] = useState(null);
  
  const [CurrentLocation, setCurrentLocation] = useState(null);
  
  useEffect(() => {
    load();
  }, []);
  async function load() {
    try {
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setCurrentLocation({ latitude: latitude, longitude: longitude });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  if (
    CurrentLocation != null &&
    CurrentLocation != null &&
    errorMessage == null
  ) {
    return (
      <View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: CurrentLocation.latitude,
            longitude: CurrentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={CurrentLocation}
            title="Current Location"
          ></Marker>
        </MapView>
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <Text>Error Unable to load the map</Text>
        <Text>{errorMessage}</Text>
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
function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

const styles = StyleSheet.create({
  map: {
    height:Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

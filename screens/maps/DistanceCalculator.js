import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { colors } from '../../utils/index'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
//const BASE_URL_GEOCODER = "http://open.mapquestapi.com/geocoding/v1/address?";
const BASE_URL_ROUTE = "http://www.mapquestapi.com/directions/v2/routematrix?";
const MAPS_API = "YOUR_API";
const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors

export default function DistanceCalculator() {
  const [startCity, setStartCity] = useState("");
  const [finalCity, setFinalCity] = useState("");
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);
  return (
    <View style={{ paddingVertical: 40, paddingHorizontal: 10, flex: 1 }}>
        <View style={{zIndex: 1, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical:20, borderRadius: 20, borderColor: '#150578', borderWidth:3 }}>
      <TextInput
        style={{
          height: 45,
          borderColor: "#150578",
          borderWidth: 2,
          borderRadius: 5,
          paddingHorizontal: 10,
          fontSize: 18,
          marginVertical: 7,
          zIndex: 1,
        }}
        onChangeText={(text) => setStartCity(text)}
        value={startCity}
        placeholder="Start Point"
      ></TextInput>
      <TextInput
        style={{
          height: 45,
          borderColor: "#150578",
          borderWidth: 2,
          borderRadius: 5,
          paddingHorizontal: 10,
          fontSize: 18,
          marginVertical: 7,
          zIndex: 1
        }}
        onChangeText={(text) => setFinalCity(text)}
        value={finalCity}
        placeholder="Final Point"
      ></TextInput>
      <View style={{ marginVertical: 7 }}>
        <Button
          color="#150578"
          title="Submit"
          onPress={async () => {
            try {
              //   const startAddress = startCity.replace(" ", "+");
              //   const finalAddress = finalCity.replace(" ", "+");
              //   const startUrl = `${BASE_URL_GEOCODER}key=${MAPS_API}&location=${startAddress}`;
              //   const finalUrl = `${BASE_URL_GEOCODER}key=${MAPS_API}&location=${finalAddress}`;
              //   const response1 = await fetch(startUrl);
              //   const response2 = await fetch(finalUrl);
              //   if (response1.ok && response2.ok) {
              //     const result1 = await response1.json();
              //     const result2 = await response2.json();
              //     alert(result1.results[0].locations[0].latLng.lat);

              //   } else {
              //     alert("Failure");
              //   }
              const url = `${BASE_URL_ROUTE}key=${MAPS_API}`;
              const response = await fetch(url, {
                method: "POST",
                body: `{
                    "locations": [
                      ${startCity},
                      ${finalCity}
                    ],
                    "options": {
                      "manyToOne": true
                    }
                  }`,
              });
              const result = await response.json();
              if (response.ok) {
                setDistance(result.distance[1]+ " km");
                setTime(result.time[1]);
              }
            } catch (err) {
              alert(err);
            }
          }}
        />
        </View>
      </View>
      <View style={styles.weatherDetails}>
        <View style={styles.weatherDetailsRow}>
          <View
            style={{
              ...styles.weatherDetailsBox,
            }}
          >
            <View style={styles.weatherDetailsRow}>
              <FontAwesome5
                name="ruler"
                size={25}
                color={PRIMARY_COLOR}
              />
              <View style={styles.weatherDetailsItems}>
                <Text>Distance :</Text>
        <Text style={styles.textSecondary}>{distance}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.weatherDetailsRow,
            borderTopWidth: 1,
            borderTopColor: BORDER_COLOR,
          }}
        >
          <View
            style={{
              ...styles.weatherDetailsBox,
            }}
          >
            <View style={styles.weatherDetailsRow}>
              <MaterialCommunityIcons
                name="clock"
                size={30}
                color={PRIMARY_COLOR}
              />
              <View style={styles.weatherDetailsItems}>
                <Text>Estimated Time :</Text>
        <Text style={styles.textSecondary}>{secondsToDhms(time)}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
const styles = StyleSheet.create({
    weatherDetails: {
        marginTop: 'auto',
        margin: 15,
        borderWidth: 3,
        backgroundColor: 'white',
        borderColor: '#150578',
        borderRadius: 20,
    },
    weatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    weatherDetailsBox: {
        flex: 1,
        padding: 20,
    },
    weatherDetailsItems: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    textSecondary: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        fontWeight: '700',
        margin: 7,
    },
})
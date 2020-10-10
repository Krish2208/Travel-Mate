import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { colors } from "../../utils/index";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;
export default function World() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [search, setSearch] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    load();
  }, []);
  async function load() {
    try {
      const response1 = await fetch("https://api.covid19api.com/world/total");
      const result1 = await response1.json();
      if (response1.ok) {
        setData(result1);
      } else {
        alert("Failed");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  if (data != null) {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#4fb4f0",
            height: 70,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
            position: "absolute",
            top: 0,
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            COVID-19 Tracker :- World
          </Text>
        </View>
        <View style={styles.weatherDetails}>
          <View style={styles.weatherDetailsRow}>
            <View
              style={{
                ...styles.weatherDetailsBox,
                borderRightWidth: 1,
                borderRightColor: BORDER_COLOR,
              }}
            >
              <View style={styles.weatherDetailsRow}>
                <View style={styles.weatherDetailsItems}>
                  <Text>Total Confirmed</Text>
                  <Text style={styles.textSecondary}>
                    {data.TotalConfirmed}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.weatherDetailsBox}>
              <View style={styles.weatherDetailsRow}>
                <View style={styles.weatherDetailsItems}>
                  <Text>Total Active</Text>
                  <Text style={styles.textSecondary}>
                    {data.TotalConfirmed -
                      data.TotalDeaths -
                      data.TotalRecovered}
                  </Text>
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
                borderRightWidth: 1,
                borderRightColor: BORDER_COLOR,
              }}
            >
              <View style={styles.weatherDetailsRow}>
                <View style={styles.weatherDetailsItems}>
                  <Text style={{color: 'green'}}>Total Recovered</Text>
                  <Text style={styles.textSecondary}>
                    {data.TotalRecovered}{" "}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.weatherDetailsBox}>
              <View style={styles.weatherDetailsRow}>
                <View style={styles.weatherDetailsItems}>
                  <Text style={{color: 'red'}}>Total Deaths</Text>
                  <Text style={styles.textSecondary}>{data.TotalDeaths}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
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
  weatherDetails: {
    margin: 20,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 10,
  },
  weatherDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailsItems: {
    alignItems: "center",
    justifyContent: "center",
  },
  textSecondary: {
    fontSize: 15,
    color: SECONDARY_COLOR,
    fontWeight: "700",
    margin: 7,
  },
});

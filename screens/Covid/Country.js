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
import { DataTable } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

export default function Country() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [search, setSearch] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    load();
  }, []);
  async function load() {
    try {
      const response2 = await fetch("https://api.covid19india.org/data.json");
      const result2 = await response2.json();
      if (response2.ok) {
        result2.statewise.sort((a, b) => b.confirmed - a.confirmed);
        const filteredPeople = result2.statewise.filter(
          (item) => item.state !== "State Unassigned"
        );
        setData(filteredPeople);
      } else {
        setErrorMessage("Unable to fetch");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  if (data != null) {
    return (
      // <View style={styles.container}>
      //   </View>
      <SafeAreaView>
        <ScrollView>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>State/UT</DataTable.Title>
              <DataTable.Title>Active</DataTable.Title>
              <DataTable.Title>Recovered</DataTable.Title>
              <DataTable.Title>Deaths</DataTable.Title>
            </DataTable.Header>
            {data.map((item) => {
              return (
                <DataTable.Row key={item.statecode}>
                  <DataTable.Cell>{item.state}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.active}</DataTable.Cell>
                  <DataTable.Cell numeric><Text style={{color: 'green'}}>{item.recovered}</Text></DataTable.Cell>
                  <DataTable.Cell numeric><Text style={{color: 'red'}}>{item.deaths}</Text></DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </ScrollView>
      </SafeAreaView>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
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
});

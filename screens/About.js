import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button, Modal, SafeAreaView, SectionList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function About() {
  const [modalVisible, setModalVisible] = useState(false);
  const DATA = [
    {
      title: "Language",
      data: ["Javascript"],
    },
    {
      title: "Framework",
      data: ["React Native with Expo"],
    },
    {
      title: "APIs Used",
      data: [
        "Open Weather Map :- Weather",
        "MapQuest :- Distance, Geocode",
        "Google Maps :- Rendering Map",
        "Bing Video Search",
        "Covid-19 India",
        "Covid-19 World",
      ],
    },
    {
      title: "Splash Screen",
      data: ["Image:- Unsplash", "Designed with :- Figma"],
    },
  ];
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Image style={{ marginTop: 80 }} source={require("../assets/icon.png")} />
      <Text style={{ fontSize: 40, fontWeight: "700", color: "#150578" }}>
        Travel Mate
      </Text>
      <View style={styles.main}>
        <Text
          style={{
            fontSize: 22,
            marginVertical: 3,
            color: "#160578",
            fontWeight: "700",
          }}
        >
          Developed by:-
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginVertical: 3,
            color: "#160578",
            fontWeight: "700",
          }}
        >
          Krish Agrawal
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginVertical: 3,
            color: "#160578",
            fontWeight: "700",
          }}
        >
          Class :- 12
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginVertical: 3,
            color: "#160578",
            fontWeight: "700",
          }}
        >
          Section :- A
        </Text>
      </View>
      <View style={{ alignItems: "flex-end", marginVertical: 20 }}>
        <Button
          title="More Info"
          color="#150578"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <Modal animationType="fade" transparent={false} visible={modalVisible}>
        <View>
          <View style={styles.reloadIcon}>
            <Ionicons
              name="ios-close-circle-outline"
              color="#150578"
              size={30}
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
          <View style={styles.modalView}>
              <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.header}>{title}</Text>
                )}
              />
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  main: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 60,
  },
  modalView: {
    marginTop: 20,
    margin: 20,
  },
  reloadIcon: {
    position: "absolute",
    top: 30,
    right: 30,
    zIndex: 5,
  },
  item: {
    backgroundColor: '#15077811',
    padding: 5,
  },
  header: {
    fontSize: 25,
    backgroundColor: "#fff",
    marginVertical:10,
    color: '#000',
    fontWeight: '700'
  },
  title: {
    fontSize: 18,
    color: '#150578'
  }
});

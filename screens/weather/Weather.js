import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  Modal,
  Image,
  FlatList,
} from "react-native";
import * as Location from 'expo-location'
import ReloadIcon from './ReloadIcon'
import WeatherDetails from './WeatherDetails'
import WeatherInfo from './WeatherInfo'
import {colors} from "../../utils/index";
import {Ionicons} from "@expo/vector-icons";
import moment from "moment";

const WEATHER_API_KEY = 'YOUR_API';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/onecall?exclude=current,minutely,hourly,alerts&units=metric&'

function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <View style={{ alignItems: "center", flex: 1 }}>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`,
          }}
          style={{ width: 60, height: 60, borderRadius: 30 }}
        />
        <Text>{item.weather[0].main}</Text>
      </View>
      <View
        style={{ alignItems: "flex-start", flex: 1, justifyContent: "center" }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {moment.unix(item.dt).format("DD MMM YYYY")}
        </Text>
      </View>
      <View
        style={{
          alignItems: "flex-start",
          flex: 1,
          justifyContent: 'center',
          paddingLeft: 20
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 14 }}>
          {item.temp.min}°C
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 14 }}>
          {item.temp.max}°C
        </Text>
      </View>
    </View>
  );
}
export default function Weather() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [unitsSystem, setUnitsSystem] = useState('metric')
    const [modalVisible, setModalVisible] = useState(false);
    const [forecastWeather, setForecastWeather] = useState(null);

    useEffect(() => {
        load()
    }, [unitsSystem])

    async function load() {
        setCurrentWeather(null)
        setErrorMessage(null)
        try {
            let { status } = await Location.requestPermissionsAsync()

            if (status !== 'granted') {
                setErrorMessage('Access to location is needed to run the app')
                return
            }
            const location = await Location.getCurrentPositionAsync()

            const { latitude, longitude } = location.coords

            const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

            const response = await fetch(weatherUrl)

            const result = await response.json()

            if (response.ok) {
                setCurrentWeather(result)
            } else {
                setErrorMessage(result.message)
            }

            const forecastUrl = `${FORECAST_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
            const response2 = await fetch(forecastUrl)
            const result2 = await response2.json()
            if (response2.ok){
                const data = result2.daily.map(v=> ({...v, index: String(v.dt)}))
                setForecastWeather(data)
            }
            else{
                setErrorMessage(result2.message)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    if (currentWeather) {
        return (
          <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.main}>
              <ReloadIcon load={load} />
              <WeatherInfo currentWeather={currentWeather} />
            </View>
            <FlatList
              style={{ flex: 1, marginTop:10 }}
              data={forecastWeather}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.index}
            />
            {/* <WeatherDetails
              currentWeather={currentWeather}
              unitsSystem={unitsSystem}
            /> */}
          </View>
        );
    } else if (errorMessage) {
        return (
            <View style={styles.container}>
                <ReloadIcon load={load} />
                <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
                <StatusBar style="auto" />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
                <StatusBar style="auto" />
            </View>
        )
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
    margin: 5,
    padding: 10,
    backgroundColor: "#FFF",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
});
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import cities from "@/configuration/cities";
import React, { useState } from "react";

export default function CityButtonScreen(props: { current: string }) {
  const params = useLocalSearchParams();
  const [CurrentCity, setCurrentCity] = useState<string>(
    params.currentcity ? (params.currentcity as string) : props.current
  );
  //console.log(params)
  //let CurrentCity = params.currentcity ? params.currentcity : props.current;
  const data: any[] = [];
  for (let i = 0; i < cities.length / 3; i += 1) {
    var temp: any[] = [];
    for (let j = 0; j < (cities.length - 3 * i) % 3; j += 1) {
      temp.push(cities[i * 3 + j]);
    }
    data.push(temp);
  }
  return (
    <SafeAreaView>
      <TextInput
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          borderRadius: 20,
          width: 200,
          marginLeft: 50,
        }}
        placeholder="Search the city"
        inlineImageLeft="search_icon"
        placeholderTextColor="white"
        onChangeText={(text) => {
          //setQuery(text);
          //searchByPinyin(text);
        }}
        //value={query}
      />
      <Text style={styles.title}>current city:{CurrentCity}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {data.map((cityrow, i) => {
        return (
          <View style={styles.buttonrow} key={i}>
            {cityrow.map((city) => {
              return (
                <TouchableOpacity
                  style={styles.button}
                  onPress={(item) => {
                    setCurrentCity(city.name);
                  }}
                  key={city.key}
                >
                  <Text style={styles.buttontext}>{city.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
        if (i % 3 == 0) {
        } else {
          return (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {}}
              key={city.key}
            >
              <Text style={styles.buttontext}>{city.name}</Text>
            </TouchableOpacity>
          );
        }
      })}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonrow: {
    flexDirection: "row",
    height: 50,
    //textTransform: "capitalize",
  },
  buttontext: {
    color: "#fff",
    fontSize: 16,
    //textTransform: "capitalize",
  },
  button: {
    //flex: 1,
    borderRadius: 30,
    padding: 15,
    //position: "absolute",
    bottom: 0,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    marginLeft: 20,
    color: "#fff",
    backgroundColor: "#273746",
  },
});

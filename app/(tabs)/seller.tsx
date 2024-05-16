import {
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useNavigationState } from "@react-navigation/native";
import webviewscreen from "../webviewscreen";
import realestatewebsite from "../../configuration/realestatewebsite";
import HouseBox from "@/components/HouseBox";
import React, { useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";

export default function SellerScreen(props: { currentcity: string }) {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  /* React.useEffect(() => {  
    // 页面加载时设置 tab bar 的 title  
    //console.log(navigation)
    let city = params.currentcity? params.currentcity as string : props.currentcity
    console.log(city)
    navigation.setOptions({  
      headertitle: city, // 设置当前 tab 的 title  
    });  
  }, [navigation]);  */
  //const [City, setCity] = useState<String>(params.currentcity ? (params.currentcity as string) : props.currentcity)
  //setCity(params.currentcity ? (params.currentcity as string) : props.currentcity)
  let City = params.currentcity ? (params.currentcity as string) : props.currentcity
  //console.log(City)
  const websites: any = [];
  websites.push(
    <View style={styles.header} key="header"> 
      <TouchableOpacity
        style={{
          marginLeft: 5,
          paddingTop: 50,
          width: "20%",
          flexDirection: "row",

          //flex: 1,
        }}
        onPress={() =>
          router.navigate({
            pathname: "/citylistscreen",
            params: { currentcity: City },
          })
        }
      >
        <Entypo //不同的类，不同的图标
          name="location"
          //title="City"
          size={25}
          //color={Colors[colorScheme ?? 'light'].text}
          color="purple" //修改图标颜色
          style={{ marginLeft: 15 }}
        />
      </TouchableOpacity>
      <Text style={{ marginLeft: -25,paddingTop:55, color: "green", fontSize: 15 }} key="citytext">
        {City}
      </Text>
    </View>
  );
  websites.push(
    <Text style={styles.title} key="title">
      Usefull websites
    </Text>
  );
  //websites.push(<SafeAreaView style={styles.container} key="container"></SafeAreaView>)
  for (let i = 0; i < realestatewebsite.length; i += 1) {
    websites.push(
      <SafeAreaView style={{ marginTop: 0 }} key={realestatewebsite[i].key}>
        {/* <View style={styles.separator} lightColor="purple" darkColor="rgba(255,255,255,0.1)" /> */}
        <HouseBox
          websitelink={realestatewebsite[i].link}
          websitename={realestatewebsite[i].name}
          description={realestatewebsite[i].description}
          image={realestatewebsite[i].image}
        ></HouseBox>
      </SafeAreaView>
    );
  }
  return websites;
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    height: 50,
    textAlign: "center",
  },
  separator: {
    marginVertical: 1,
    height: 0.5,
    width: "100%",
  },
  header: {
    //flex: 1,
    height: "12%",
    backgroundColor: "skyblue",
    flexDirection: "row",
  },
});

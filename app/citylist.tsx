import { StatusBar } from "expo-status-bar";
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SectionList,
  FlatList,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import cities from "@/assets/configurations/cities";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Input, Icon } from '@rneui/themed';

const CityList = ({ data }) => {
  const [selectedLetter, setSelectedLetter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const colorScheme = useColorScheme();
  //console.log(colorScheme)
  const handleLetterPress = (firstletter:string) => {
    //寻找数组里面第一个首字母和所选字母的元素的index
    const findindex = filteredCities.findIndex((city: { name: { toString: () => string; }; }) => 
      city.name.toString().substring(0, 1) === firstletter
    );
    //console.log(findindex)
    //定位到该元素
    if (listRef.current && findindex != -1) { 
      listRef.current.scrollToIndex({
        index: findindex,
        animated: true,
        viewOffset: 0,
        viewPosition: 0,   //为0是将该元素定位到最顶端，1时底端。0.5是中间
      });
    }
  };
  const getItemLayout = (data: any, index: number) => ({
    length: 50,
    offset: index * 50,
    index,
  });
  const sortCities = data.sort((a: { name: string; }, b: { name: any; }) => {
    return a.name.localeCompare(b.name);
  });
  const filteredCities = sortCities.filter((city: { name: string; }) => {
    return city.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  // /console.log(filteredCities);
  const listRef = useRef(null);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: -40 }}>
      <Input
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginLeft: 20,

          width: "90%",
          paddingHorizontal: 10,
          borderRadius: 20, // 设置边框圆角
          flexDirection: "row",
          alignItems: "center",
          textAlign: "left",
          color: Colors[colorScheme ?? "light"].text, //根据手机是否dark模式选择字体颜色
        }}
        placeholder="Search city"
        placeholderTextColor="#bdc6cf"
        inlineImageLeft="search_icon"
        clearButtonMode="always"
        //inlineImageLeft=""
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
        // 添加左侧搜索图标
        leftIcon={
          <Ionicons
            name="search"
            size={24}
            color={Colors[colorScheme ?? "light"].tabIconDefault}
            
          />
        }
        
      />
      <SafeAreaView style={{ flexDirection: "row", paddingTop: 10 }}>
        {/* <SectionList
          style={{ width: "80%" }}
          sections={filteredCities}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ref={listRef}
        /> */}

        <FlatList //flatlist 比scrollview更高效
          ref={listRef}
          contentContainerStyle={{}}
          data={filteredCities}
          keyExtractor={(item, index) => index.toString()}
          //style={{ height: "100%" }}
          getItemLayout={getItemLayout}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                height: 50,
                borderBottomWidth: 1,
                borderColor: "grey",
                borderRadius: 10,
                flex: 1,
              }}
              onPress={() => {
                router.navigate({
                  pathname: "/houseexplore",
                  params: { currentcity: item.name },
                });
              }}
            >
              <Text
                style={{
                  flex: 1,
                  textAlign: "left",
                  textAlignVertical: "bottom",
                  paddingHorizontal: 20,
                  fontSize: 20,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        ></FlatList>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "10%",
          }}
        >
          {Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode(65 + i)
          ).map((letter, index) => (
            <TouchableOpacity
              key={letter}
              onPress={() => handleLetterPress(letter)}
            >
              <Text
                style={{
                  margin: 2,
                  fontWeight: selectedLetter === letter ? "bold" : "normal",
                }}
              >
                {letter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default function CityListScreen() {
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <CityList data={cities} />
    </View>
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
});

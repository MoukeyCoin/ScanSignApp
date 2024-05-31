import { SafeAreaView, View, Text, useColorScheme } from "react-native";
import AgencyList from "../../assets/configurations/agencylist";
import {  Card } from "@rneui/themed";
import * as React from "react";
import Colors from "@/constants/Colors";



export default function HouseExploreScreen(props: { currentcity: string }) {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView >
      <Text style={{color:Colors[colorScheme ?? 'light'].text}}>Let's start our explore</Text>
      <Agencies />
    </SafeAreaView>
  );
}

export function Agencies() {
  const Content: any = [];
  for (let i = 0; i < AgencyList.length; i += 1) {
    Content.push(
      <View style={{ marginTop: 0 }} key={AgencyList[i].key}>
        <Card>
          <Card.Title>{AgencyList[i].name}</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri: AgencyList[i].name,
            }}
          />
          <Text style={{ marginBottom: 10 }}>{AgencyList[i].name}</Text>
        </Card>
      </View>
    );
  }
  return Content;
}

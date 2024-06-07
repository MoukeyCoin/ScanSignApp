import { Dimensions, Pressable, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { PricingCard, Icon, Image, Card, Divider } from "@rneui/themed";
import Products from "../../assets/configurations/products";
import {
  SafeAreaInsetsContext,
  SafeAreaView,
} from "react-native-safe-area-context";
import { Double, Float } from "react-native/Libraries/Types/CodegenTypes";
import { PreventRemoveProvider } from "@react-navigation/native";
import { router } from "expo-router";

export default function HomeScreen() {
  let screenWidth = Dimensions.get("window").width;
  function clickCard(link: string) {
    router.navigate({
      pathname: "/webview",
      params: { link },
    });
  }
  return (
    <ScrollView>
      <SafeAreaView
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          width: "95%",
        }}
      >
        <SafeAreaView
          style={{
            flexDirection: "column",
            flexWrap: "wrap",
            //justifyContent: "center",
            //alignSelf: "flex-start",
            flex: 1,
            marginTop: -50,
          }}
        >
          {Products.filter((item, i) => i % 2 === 0).map((item, i) => (
            <PriceCard
              imageuri={item.image}
              title={item.title}
              price={item.price}
              information={item.description}
              onclick={() => clickCard(item.link)}
              key={"col_1_" + i.toString()}
            />
          ))}
        </SafeAreaView>
        <SafeAreaView
          style={{
            flexDirection: "column",
            flexWrap: "wrap",
            //justifyContent: "center",
            flex: 1,
            marginLeft: 5,
            marginTop: -50,
          }}
        >
          {Products.filter((item, i) => i % 2 === 1).map((item, i) => (
            <PriceCard
              imageuri={item.image}
              title={item.title}
              price={item.price}
              information={item.description}
              onclick={() => clickCard(item.link)}
              key={"col_2_" + i.toString()}
            />
          ))}
        </SafeAreaView>
      </SafeAreaView>
    </ScrollView>
  );
}

export function PriceCard(
  props: {
    imageuri: Double;
    title: string;
    price: string;
    information: string;
    onclick?(): void;
  },
  key: string
) {
  return (
    <View
      key={key}
      style={{
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "lime",
        flexDirection: "column",
        marginTop: 5,
        marginLeft: 10,
      }}
    >
      <Pressable onPress={props.onclick}>
        <Image
          style={{ height: 200, width: "100%", borderRadius: 10 }}
          source={props.imageuri}
          resizeMode="contain"
        />

        <Text style={{ fontSize: 16, color: "#2089dc", textAlign: "center" }}>
          {props.title}
        </Text>
        <Divider width={1} />
        <Text style={{ fontSize: 20, color: "#ff190c", textAlign: "center" }}>
          {props.price}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "#aa49eb",
            textAlign: "left",
            marginLeft: 2,
          }}
        >
          {props.information}
        </Text>
        {/* <PricingCard title={item.title} price={item.price}  /> */}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
});

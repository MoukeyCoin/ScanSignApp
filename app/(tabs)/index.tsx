import "react-native-gesture-handler";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Header, ListItem, Image } from "@rneui/themed";
import { Link } from "expo-router";
import * as React from "react";
import {
  Button,
  Dimensions,
  Linking,
  Pressable,
  SafeAreaView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import Colors from "@/constants/Colors";

const drawlist = [
  {
    id: 1,
    name: "Share App",
    icon: <FontAwesome5 name="user-friends" size={24} color="#52c41a" />,
    function: "scan",
  },
  {
    id: 2,
    name: "Help",
    icon: <Entypo name="help-with-circle" size={24} color="#faad14" />,
    function: "consultation",
  },
  {
    id: 3,
    name: "Rating",
    icon: <AntDesign name="star" size={24} color="#ff190c" />,
    function: "rating",
  },
];
export default function HomeScreen() {
  const [open, setOpen] = React.useState(false);
  let screenWidth = Dimensions.get("window").width;
  const colorScheme = useColorScheme();

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return (
          <View style={{ backgroundColor: "#e1e8ee", height: "100%" }}>
            <View style={{ height: "30%", width: "100%" }}>
              <Image
                style={{ height: "100%", width: "100%" }}
                source={require("../../assets/images/icon.png")}
                resizeMode="cover"
              />
            </View>
            {drawlist.map((item, i) => (
              <ListItem
                key={i}
                bottomDivider
                containerStyle={{
                  backgroundColor: "#e1e8ee",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
                //onPress={() => RunFunction(item.function as string)}
              >
                {item.icon}
                <ListItem.Content right>
                  <ListItem.Title style={{ color: "#080808" }}></ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Title style={{ color: "#080808", width: 120 }}>
                    {item.name}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        );
      }}
    >
      <Header containerStyle={{ height: 90, flexDirection: "row" }}>
        <SafeAreaView style={{ flexDirection: "row" }}>
          <Pressable onPress={() => setOpen(true)}>
            {({ pressed }) => (
              <Entypo
                name="list"
                size={25}
                color={Colors[colorScheme ?? "light"].text}
                style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
          <Text
            style={{
              color: Colors[colorScheme ?? "light"].text,
              marginLeft: 5,
              textAlignVertical: "bottom",
              fontSize: 16,
              width: screenWidth * 0.72,
              textAlign: "center",
            }}
          >
            Scan Sign Technology
          </Text>
          <SafeAreaView></SafeAreaView>
        </SafeAreaView>
      </Header>
    </Drawer>
  );
}

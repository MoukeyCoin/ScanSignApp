import "react-native-gesture-handler";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  Header,
  ListItem,
  Image,
  Divider,
  Overlay,
  Input,
  Button,
} from "@rneui/themed";
import { Link } from "expo-router";
import * as React from "react";
import {
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
import { Rating } from "react-native-ratings";
import { useState } from "react";

const drawlist = [
  {
    id: 1,
    name: "Invite friends",
    icon: <FontAwesome5 name="user-friends" size={24} color="#52c41a" />,
    function: "invite",
  },
  {
    id: 2,
    name: "Help",
    icon: <Entypo name="help-with-circle" size={24} color="#faad14" />,
    function: "consultation",
  },
  {
    id: 3,
    name: "Email",
    icon: <MaterialIcons name="email" size={24} color="#2089dc" />,
    function: "email",
  },
  {
    id: 4,
    name: "Phone",
    icon: <Entypo name="phone" size={24} color="#aa49eb" />,
    function: "phone",
  },
  {
    id: 5,
    name: "Rating",
    icon: <AntDesign name="star" size={24} color="#ff190c" />,
    function: "rating",
  },
];
export default function HomeScreen() {
  const [open, setOpen] = useState(false);
  let screenWidth = Dimensions.get("window").width;
  const colorScheme = useColorScheme();
  const [OverlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlayVisible = () => {
    setOverlayVisible(!OverlayVisible);
  };
  async function RunFunction(functionname: string) {
    if (functionname == "invite") {
    } else if (functionname == "email") {
      //const subject = "";
      //const body = "This is the email body from my Expo app.";
      //const mailto = `mailto:?subject=<span class="math-inline">\{subject\}&body\=</span>{body}`;
      await Linking.openURL("mailto:info@scansign.com");
    } else if (functionname == "phone") {
      await Linking.openURL("tel:+8619925351103");
    }
    else if (functionname == "rating") {
      setOverlayVisible(true)
    }
  }
  const submitComment = () => {
    //console.log(OverlayVisible)
    //toggleOverlayVisible
    setOverlayVisible(false);
  };
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
            <View style={{ height: "60%" }}>
              {drawlist.map((item, i) => (
                <ListItem
                  key={i}
                  bottomDivider
                  containerStyle={{
                    backgroundColor: "#e1e8ee",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                  onPress={() => RunFunction(item.function as string)}
                >
                  {item.icon}
                  <ListItem.Content right>
                    <ListItem.Title
                      style={{ color: "#080808" }}
                    ></ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Content right>
                    <ListItem.Title style={{ color: "#080808", width: 120 }}>
                      {item.name}
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
            <Divider
              style={{
                borderColor: "#242424",
                borderWidth: 1,
              }}
            />
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Scan Sign Technology ©{new Date().getFullYear()}{" "}
            </Text>
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
          <SafeAreaView>
            <Overlay
              animationType="fade"
              isVisible={OverlayVisible}
              onBackdropPress={toggleOverlayVisible}
              overlayStyle={{
                //position: "absolute",
                //bottom: 0,
                width: "90%",
                backgroundColor: Colors[colorScheme ?? "light"].background,
                //height: "30%",
              }}
            >
              <Rating
                type="heart"
                ratingCount={5}
                imageSize={50}
                showRating
                startingValue={5}
                jumpValue={0.5}
                /* reviews={[
                  'Terrible',
                  'Bad',     
                  'Good',
                  'Amazing',
                  'Unbelievable',

                ]} */
                //onFinishRating={this.ratingCompleted}
              />

              <Divider />
              <Text style={{ fontSize: 20, textAlign: "center" }}>Comment</Text>
              <Input
                multiline={true}
                //placeholder="Input Website"
                numberOfLines={10}
                style={{
                  borderWidth: 1,
                  textAlignVertical: "top",
                  textAlign: "left",
                  marginTop: 5,
                }}
              ></Input>
              <Button
                title="Submit"
                titleStyle={{ fontWeight: "700" }}
                buttonStyle={{
                  backgroundColor: "rgba(90, 154, 230, 1)",
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 100,
                  marginVertical: 0,
                  position: "relative",
                  left: screenWidth * 0.95 - 150,
                }}
                onPress={submitComment}
              />
            </Overlay>
          </SafeAreaView>
        </SafeAreaView>
      </Header>
    </Drawer>
  );
}

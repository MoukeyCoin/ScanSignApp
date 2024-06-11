import {
  SafeAreaView,
  View,
  Text,
  useColorScheme,
  ScrollView,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AgencyList from "../../assets/configurations/agencylist";
import {
  Card,
  Divider,
  Header,
  Image,
  ListItem,
  Overlay,
  Input,
  Button,
} from "@rneui/themed";
import * as React from "react";
import Colors from "@/constants/Colors";
import { Link, router, useLocalSearchParams } from "expo-router";
import { AntDesign, Entypo, Fontisto, Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import { useState } from "react";
import { Linking } from "react-native";
import { Rating } from "react-native-ratings";


const menulist = [
  {
    id: 1,
    name: "Scan",
    icon: <AntDesign name="scan1" size={24} color="#52c41a" />,
    function: "scan",
  },
  {
    id: 2,
    name: "Consultation",
    icon: <Fontisto name="email" size={24} color="#faad14" />,
    function: "consultation",
  },
  {
    id: 3,
    name: "Rating",
    icon: <AntDesign name="staro" size={24} color="#ff190c" />,
    function: "rating",
  },
];
export default function HouseExploreScreen(props: { currentcity: string }) {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();
  const [visible, setVisible] = useState(false);
  const [OverlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlayVisible = () => {
    setOverlayVisible(!OverlayVisible);
  };
  let City = params.currentcity
    ? (params.currentcity as string)
    : props.currentcity;
  //屏幕宽度
  let screenWidth = Dimensions.get("window").width;
  async function RunFunction(functionname: string) {
    if (functionname == "scan") {
      router.navigate({
        pathname: "/qrscanner",
      });
    } else if (functionname == "consultation") {
      //const subject = "";
      //const body = "This is the email body from my Expo app.";
      //const mailto = `mailto:?subject=<span class="math-inline">\{subject\}&body\=</span>{body}`;
      await Linking.openURL("mailto:info@scansign.com");
    } else if (functionname == "rating") {
      setOverlayVisible(true)
      //console.log(OverlayVisible);
    }
    setVisible(false);
  }
  const submitComment = () => {
    console.log(OverlayVisible)
    toggleOverlayVisible
    setOverlayVisible(false)
  }
  return (
    <View style={{ flex: 1 }}>
      {/* pin header at the top of the page. use header and scrollview*/}
      <Header containerStyle={{ height: 90, flexDirection: "row" }}>
        <SafeAreaView style={{ flexDirection: "row" }}>
          <Link href="/citylist" asChild>
            <Pressable>
              {({ pressed }) => (
                <Entypo
                  name="location"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
          <Text
            style={{
              color: Colors[colorScheme ?? "light"].text,
              marginLeft: 5,
              textAlignVertical: "bottom",
              fontSize: 16,
              width: screenWidth * 0.72,
            }}
          >
            {City}
          </Text>
          <SafeAreaView>
            {/* when click ListItem, close the menu  */}
            <Menu
              opened={visible}
              onOpen={() => setVisible(true)}
              onBackdropPress={() => setVisible(false)}
            >
              <MenuTrigger
                customStyles={{
                  triggerWrapper: {
                    //paddingTop: 0,
                    //width: 80,
                  },
                }}
                onPress={() => setVisible(true)}
              >
                <AntDesign
                  name="pluscircleo"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  position: "absolute",
                  marginLeft: 20,
                  marginTop: 30,
                  width: 200,
                  backgroundColor: "#393e42",
                }}
              >
                {menulist.map((item, i) => (
                  <ListItem
                    key={i}
                    bottomDivider
                    containerStyle={{
                      backgroundColor: "#393e42",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                    onPress={() => RunFunction(item.function as string)}
                  >
                    {item.icon}
                    <ListItem.Content right>
                      <ListItem.Title
                        style={{ color: "#e1e8ee" }}
                      ></ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content right>
                      <ListItem.Title style={{ color: "#e1e8ee", width: 120 }}>
                        {item.name}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </MenuOptions>
            </Menu>
          </SafeAreaView>
        </SafeAreaView>
      </Header>
      <ScrollView style={{ flex: 1 }}>
        <Text
          style={{
            color: Colors[colorScheme ?? "light"].text,
            textAlign: "center",
            fontSize: 25,
            fontStyle: "italic",
          }}
        >
          Let's start our explore
        </Text>
        <Agencies />
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
            //onFinishRating={this.ratingCompleted}
          />
          <Divider />
          <Text style={{ fontSize: 24, textAlign: "center" }}>Comment</Text>
          <Input
            multiline={true}
            numberOfLines={10}
            style={{
              borderWidth: 1,
              textAlignVertical: "top",
              textAlign: "left",
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
      </ScrollView>
    </View>
  );
}

export function Agencies() {
  const Content: any = [];
  for (let i = 0; i < AgencyList.length; i += 1) {
    Content.push(
      <View style={{ marginTop: 0 }} key={AgencyList[i].key}>
        <Pressable
          onPress={() =>
            router.navigate({
              pathname: "/webview",
              params: { link: AgencyList[i].link },
            })
          }
        >
          <Card containerStyle={{ borderRadius: 10, borderColor: "purple" }}>
            <Card.Title>{AgencyList[i].name}</Card.Title>
            <Card.Divider color="blue" />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                //borderWidth: 1,
                //borderBlockColor: "#2089dc",
              }}
            >
              <Image
                style={{ padding: 0, height: 100, width: 100 }}
                resizeMode="contain"
                source={AgencyList[i].image}
              />
              <View style={{ marginLeft: 2, flex: 1 }}>
                <Text style={{ fontSize: 15 }}>
                  {AgencyList[i].description}
                </Text>
              </View>
            </View>
          </Card>
        </Pressable>
      </View>
    );
  }
  return Content;
}

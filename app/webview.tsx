import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Share,
  Dimensions,
  useColorScheme,
} from "react-native";
import React, { useRef, useState } from "react";
import { Text, View } from "@/components/Themed";
import { WebView } from "react-native-webview";
import {
  useLocalSearchParams,
  useRouter,
  useNavigation,
  router,
} from "expo-router"; //通过路由传参数输入的对象
import { useNavigationState } from "@react-navigation/native";
import {
  Ionicons,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import QRCodeScreen from "@/app/qrcode";
import { Header, ListItem, Overlay, Button, Divider } from "@rneui/themed";
import Colors from "@/constants/Colors";
import { Linking } from "react-native";
import Drawer from "@/components/Drawer";

/* const BuyerScreen = () => {
    return (
      <WebView
        source={{ uri: "https://www.zillow.com/z/canada/canada-homes/" }}
      />
      
    );
  }; */

export default function WebViewScreen(props: { url: string }) {
  const menulist = [
    {
      id: 1,
      name: "Share",
      icon: <Entypo name="share" size={30} color="#52c41a" />,
      function: "sharewebsite",
    },
    {
      id: 2,
      name: "Generate QR Code",
      icon: (
        <MaterialCommunityIcons name="qrcode-edit" size={30} color="#ca71eb" />
      ),
      function: "generateqrcode",
    },
    {
      id: 3,
      name: "Open with Browser",
      icon: <FontAwesome5 name="firefox-browser" size={30} color="#cfbe27" />,
      function: "openwithbrowser",
    },
    {
      id: 4,
      name: "Refresh",
      icon: <FontAwesome name="refresh" size={30} color="#439ce0" />,
      function: "refresh",
    },
  ];
  //prop of open or close overlay
  const [visible, setVisible] = useState(false);
  // open or close the overlay
  const toggleOverlay = () => {
    //console.log(visible);
    setVisible(!visible);
  };
  let screenWidth = Dimensions.get("window").width;
  const colorScheme = useColorScheme();
  const ref = useRef(null);
  const params = useLocalSearchParams(); //获取navigate的param
  const link = params.link == null ? props.url : params.link; //存储最新的webview访问地址
  const [latestlink, setlatestlink] = useState<string | null>(null); //存储最新的webview访问地址
  const [webTitle, setwebTitle] = useState<string | null>(null);
  function webViewgoback() {
    if (latestlink !== null && ref.current != null) {
      ref.current.goBack();
      
    } else {
      router.back();
    }
  }
  async function RunFunction(functionname: string) {
    console.log( functionname);
    if (functionname == "generateqrcode") {
      router.navigate({
        pathname:"/qrcode",
        params: { content: latestlink == null ? link : latestlink },
      });
      /*  return (
          <SafeAreaView style={styles.container}>
            <QRCodeScreen />
          </SafeAreaView>
        ); */
    } else if (functionname == "sharewebsite") {
      
      Share.share({
        message: latestlink == null ? (link as string) : latestlink,
      }).catch((error) => console.log(error));
    }else if (functionname == "openwithbrowser") {
      let result = await Linking.openURL( latestlink == null ? (link as string) : latestlink);
      //console.log(result);
      
    }else if(functionname == "refresh"){
      //refresh == reload current link
      ref.current.reload(latestlink == null ? link : latestlink );
    }
    toggleOverlay
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header containerStyle={{ height: 90, flexDirection: "row" }}>
        <SafeAreaView style={{ flexDirection: "row" }}>
          <Ionicons //不同的类，不同的图标.需要在前面import
            name="arrow-back"
            size={25}
            //color={Colors[colorScheme ?? 'light'].text}
            color="black" //修改图标颜色
            style={{ opacity: 1, width: 80, marginLeft: 10 }}
            allowsBackForwardNavigationGestures
            onPress={webViewgoback}
          />
          <SafeAreaView style={{ width: screenWidth * 0.6 }}>
            <Text>{webTitle}</Text>
          </SafeAreaView>
          <SafeAreaView>
            <Entypo
              name="dots-three-vertical"
              size={24}
              color="black"
              style={{ opacity: 1, marginLeft: 10 }}
              onPress={toggleOverlay}
            />
          </SafeAreaView>
        </SafeAreaView>
      </Header>
      <Overlay
        animationType="slide"
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: Colors[colorScheme ?? "light"].background,
          height: "30%",
        }}
      >
        <SafeAreaView
          style={{ flexDirection: "row", justifyContent: "flex-start" }}
        >
          {menulist.map((item, i) => (
            <Pressable
              key={"view_" + i.toString()}
              style={{ width: 80, height: 150, flexDirection: "column" }}
              onPress= {() => RunFunction(item.function as string)}
            >
              <Button
                key={"button_" + i.toString()}
                icon={item.icon}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ fontWeight: "700" }}
                type="outline"
                size="lg"
                buttonStyle={{
                  //backgroundColor: "rgba(90, 154, 230, 1)",
                  borderColor: Colors[colorScheme ?? "light"].text,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                containerStyle={{
                  width: 60,
                  //height: 200,
                  marginHorizontal: 15,
                  marginVertical: 20,
                }}
                onPress= {() => RunFunction(item.function as string)}
              />
              <Text
                key={"text_" + i.toString()}
                style={{
                  color: Colors[colorScheme ?? "light"].text,
                  textAlign: "center",
                  marginTop: -10,
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </SafeAreaView>

        <Divider />
        <Button
          title="Cancel"
          buttonStyle={{
            backgroundColor: Colors[colorScheme ?? "light"].background,
            //borderWidth: 2,
            //borderColor: Colors[colorScheme ?? "light"].text,
            //borderRadius: 30,
          }}
          containerStyle={{
            width: "100%",
            //marginHorizontal:100,
            marginVertical: 10,
            position: "absolute",
            bottom: 0,
          }}
          titleStyle={{
            fontWeight: "bold",
            color: Colors[colorScheme ?? "light"].text,
          }}
          onPress={toggleOverlay}
        ></Button>
      </Overlay>
      <WebView
        //style={styles.ActivityIndicatorStyle}
        ref={ref}
        source={{ uri: link.toString() }}
        onNavigationStateChange={(navState) => {
          if (navState.canGoBack) {
            setlatestlink(navState.url);
          } else {
            setlatestlink(null);
          }
          setwebTitle(navState.title);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  menucontainer: {
    flex: 1,
    //backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "column",
    width: "15%",
  },
  header: {
    //flex: 1,
    height: "10%",
    backgroundColor: "skyblue",
    flexDirection: "row",
  },
});

import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Share,
} from "react-native";
import React, { useRef, useState } from "react";
import { Text, View } from "@/components/Themed";
import HouseBox from "@/components/HouseBox";
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
} from "@expo/vector-icons";
import QRCodeScreen from "@/app/qrcodescreen";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";


/* const BuyerScreen = () => {
  return (
    <WebView
      source={{ uri: "https://www.zillow.com/z/canada/canada-homes/" }}
    />
    
  );
}; */
export default function WebViewScreen(props: { url: string }) {
  const ref = useRef(null);
  const params = useLocalSearchParams(); //获取navigate的param
  const link = params.link == null ? props.url : params.link; //存储最新的webview访问地址
  const [latestlink, setlatestlink] = useState<string | null>(null); //存储最新的webview访问地址
  const menulist = [
    {
      id: 1,
      name: "Share",
      icon: <FontAwesome name="share-alt" size={24} color="purple" />,
      function: "sharewebsite",
    },
    {
      id: 2,
      name: "Generate QR Code",
      icon: (
        <MaterialCommunityIcons name="qrcode-edit" size={24} color="purple" />
      ),
      function: "generateqrcode",
    },
  ];
  function webViewgoback() {
    if (latestlink !== null) {
      ref.current.goBack();
    } else {
      router.back();
    }
  }

  function runffunction(functionname: string) {
    if (functionname == "generateqrcode") {
      router.navigate({
        pathname: "/qrcodescreen",
        params: { content: latestlink == null ? link : latestlink },
      });
      /*  return (
        <SafeAreaView style={styles.container}>
          <QRCodeScreen />
        </SafeAreaView>
      ); */
    } else if (functionname == "sharewebsite") {
      //console.log( latestlink ,link);
      Share.share({message:latestlink == null ? link as string : latestlink,}).catch((error) => console.log(error));
    }
  }

  return (
    <MenuProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              marginLeft: 20,
              paddingTop:50,
              width: "15%",
              flexDirection: "row",
              //flex: 1,
            }}
            onPress={webViewgoback}
          >
            <Ionicons //不同的类，不同的图标.需要在前面import
              name="arrow-back"
              size={25}
              //color={Colors[colorScheme ?? 'light'].text}
              color="purple" //修改图标颜色
              style={{ opacity: 1, width: 80 }}
              allowsBackForwardNavigationGestures
            />
          </TouchableOpacity>
          <View style={{ width: "70%", backgroundColor: "skyblue" }} />
          <SafeAreaView style={styles.menucontainer}>
            <Menu>
              <MenuTrigger
                customStyles={{
                  triggerWrapper: {
                    paddingTop: 40,
                    width: 80,
                    marginStart: 40,
                  },
                }}
              >
                <Entypo
                  name="dots-three-vertical"
                  size={24}
                  color="purple"
                  style={{ marginRight: 50 }}
                />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  position: "absolute",
                  marginLeft: -10,
                  marginTop: 70,
                  width: 170,
                  height: 100,
                  backgroundColor: "white",
                }}
              >
                <FlatList
                  contentContainerStyle={{ paddingTop: 10 }}
                  data={menulist}
                  keyExtractor={(item) => item.id}
                  style={{ height: 200 }}
                  renderItem={({ item }) => (
                    <MenuOption
                      onSelect={() => runffunction(item.function as string)}
                      customStyles={{
                        optionWrapper: {
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        },
                      }}
                    >
                      <Text>{item.icon}</Text>
                      <Text
                        style={{
                          color: "purple",
                          fontStyle: "italic",
                          justifyContent: "center",
                        }}
                      >
                        {item.name}
                      </Text>
                    </MenuOption>
                  )}
                />
              </MenuOptions>
            </Menu>
          </SafeAreaView>
        </View>

        <WebView
          //style={styles.ActivityIndicatorStyle}
          ref={ref}
          source={{ uri: link }}
          onNavigationStateChange={(navState) => {
            if (navState.canGoBack) {
              setlatestlink(navState.url);
            } else {
              setlatestlink(null);
            }
          }}
        />
      </SafeAreaView>
    </MenuProvider>
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

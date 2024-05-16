import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Animated,
  Image,
  Easing,
} from "react-native";
import {
  CameraView,
  Camera,
  useCameraPermissions,
  CameraViewRef,
} from "expo-camera";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
//import WebViewScreen from "./webviewscreen";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
//import QRCodeReader from "react-native-qrcode-local-image";
import { BarCodeScanner, Constants } from "expo-barcode-scanner";

//const finderWidth: number = 280;
const finderHeight: number = 300;
const width = Dimensions.get("window").width;
//const height = Dimensions.get("window").height;
//const viewMinX = (width - finderWidth) / 2;
//const viewMinY = (height - finderHeight) / 2;

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [image, setImage] = useState(null);
  const [face, setFace] = useState("back"); //摄像头前后   和后面的setFace方法联合使用
  const [flashMode, setFlashMode] = useState<boolean>(false); //开关灯
  const [flashstatus, setflashstatus] = useState("on");
  const [showScanner, setShowScanner] = useState(false);

  //设置动画，y轴初始值为0
  /* const translateValue = useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    translateValue.setValue(0)
    Animated.timing(translateValue, {
      toValue: 300,              //变化到y为300
      duration: 8000,            //变化事件5s
      easing: Easing.linear,     //变化为线性扫描
      useNativeDriver: true
    }).start(() => startAnimation());    //5s后再重复执行
  }; */

  function toggleCameraFacing() {
    setFace((current) => (current === "back" ? "front" : "back"));
  }

  function toggleTorch() {
    setFlashMode(flashMode ? false : true);
    //console.log(flashMode);
    setflashstatus(flashstatus == "off" ? "on" : "off");
  }
  function handleQrCodeScanned(data: any) {
    //setResult(data);
    //console.log(data);
    //setResult(data);
    //setShowScanner(false);
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false, //是否允许编辑
      aspect: [4, 3],
      quality: 1,
      base64: true, //返回base64值
    });
    if (!result.canceled) {
      //setImage(result.assets[0].uri);
      scanBarcodeFromUrl(result.assets[0].uri);
    }
    setShowScanner(true);
  };
  async function scanBarcodeFromUrl(url: string) {
    //console.log(url);
    try {
      const data = await BarCodeScanner.scanFromURLAsync(url);
      if (data) {
        handledata(data[0].data);
      } else {
        console.log("No QR code found in the image.");
      }
    } catch (error) {
      console.error("Error decoding QR code:", error);
    }
  }
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  /* function pickerImg(){
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      includeBase64:true
    }).then(image => {
		handleImage(image);
    });
  }
  function handleImage(image){
    if(image.data){
      handleBarCodeScanned(image.data)
    }
  } */

  const handleBarCodeScanned = (result: { data: string }) => {
    //startAnimation()

    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    let data = result.data as string;
    //console.log(data);
    handledata(data);
    setScanned(false);
  };
  function handledata(data: string) {
    if (data.indexOf("http") !== -1) {
      router.navigate({
        pathname: "/webviewscreen",
        params: { link: data },
      });
    } else {
      alert(data);
    }
  }
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  //startAnimation();
  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={{ height: "85%", width: width }}
        enableTorch={flashMode} //闪光灯开关  这两个属性在expo手册中查出来的
        facing={face} //摄像头前后
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <Pressable
            style={{ marginRight: 20, alignItems: "flex-end" }}
            onPress={toggleCameraFacing}
          >
            {({ pressed }) => (
              //tabBarIcon  这里没用这个function，因为这里写死fontawsome类型。我用了其他图标
              <MaterialIcons //不同的类，不同的图标.需要在前面import
                name="flip-camera-ios"
                size={40}
                //color={Colors[colorScheme ?? 'light'].text}
                color="white" //修改图标颜色
                style={{ marginBottom: 15, opacity: pressed ? 0.5 : 1 }} //按上时透明度0.5，没按上时1
              />
            )}
          </Pressable>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.itemStyle} />
          <View style={styles.rectangle}>
            <Image
              style={[
                styles.rectangle,
                { position: "absolute", left: 0, top: 0 },
              ]}
              //source={require("../assets/images/scan-icon.png")}
            />

            <Animated.View
            /* style={[
                styles.border,
                { transform: [{ translateY: translateValue }] },   //变化的y坐标取translateValue
              ]} */
            ></Animated.View>
          </View>
          <View style={styles.itemStyle} />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: width,
            alignItems: "center",
          }}
        >
          <Text style={styles.textStyle}>Scan me</Text>
        </View>
      </CameraView>
      <View
        style={{
          height: "15%",
          //backgroundColor: "transparent",
          backgroundColor: "skyblue",
          flexDirection: "row",
        }}
      >
        <SafeAreaView style={{ flex: 1, alignItems: "center", marginTop: -20 }}>
          <Pressable
            style={{ flex: 2, alignItems: "center" }}
            onPress={toggleTorch}
          >
            {({ pressed }) => (
              //tabBarIcon  这里没用这个function，因为这里写死fontawsome类型。我用了其他图标
              <Entypo //不同的类，不同的图标.需要在前面import
                name="flashlight"
                size={35}
                //color={Colors[colorScheme ?? 'light'].text}
                color="purple" //修改图标颜色
                style={{ marginBottom: 15, opacity: pressed ? 0.5 : 1 }} //按上时透明度0.5，没按上时1
              />
            )}
          </Pressable>
          <Text style={{ flex: 1, textAlign: "center" }}>
            Torch {flashstatus}
          </Text>
        </SafeAreaView>
        <SafeAreaView style={{ flex: 1, alignItems: "center", marginTop: -20 }}>
          <Pressable
            style={{ flex: 2, alignItems: "center" }}
            onPress={pickImage}
          >
            {({ pressed }) => (
              //tabBarIcon  这里没用这个function，因为这里写死fontawsome类型。我用了其他图标
              <AntDesign //不同的类，不同的图标.需要在前面import
                name="picture"
                size={35}
                //color={Colors[colorScheme ?? 'light'].text}
                color="purple" //修改图标颜色
                style={{ marginBottom: 15, opacity: pressed ? 0.5 : 1 }} //按上时透明度0.5，没按上时1
              />
            )}
          </Pressable>

          <Text style={{ flex: 1, textAlign: "center" }}>Albums</Text>
        </SafeAreaView>
      </View>

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  button: {
    borderRadius: 30,
    padding: 15,
    position: "absolute",
    bottom: 0,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    marginBottom: 120,
    color: "#fff",
    backgroundColor: "#273746",
  },
  save: {
    color: "#fff",
    fontSize: 16,
    //textTransform: "capitalize",
  },
  itemStyle: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: (width - 300) / 2,
    height: 300,
  },
  textStyle: {
    color: "#fff",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 18,
  },
  animatedStyle: {
    height: 2,
    backgroundColor: "#00c050",
  },
  rectangle: {
    height: 300,
    width: 300,
  },
  border: {
    flex: 0,
    width: 300,
    height: 3,
    backgroundColor: "lime",
  },
});

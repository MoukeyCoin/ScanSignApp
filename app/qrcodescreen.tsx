import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useLocalSearchParams } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";

export default function QRCodeScreen(props: { content: string }) {
  const params = useLocalSearchParams();
  let ref = React.useRef();
  const saveQRCodeToBase64 = () => {
    ref.toDataURL((data: any) => {
      //console.log(data); // 输出二维码的base64字符串
      // 你可以在此方法内部将base64编码的数据保存为图片
      saveQRToDiskAsync(data);
    });
  };

  async function saveQRToDiskAsync(qrCodeBase64: string) {
    //if (Platform.OS === "android") {
    //ios也需要请求权限
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== "granted") {
      alert("ask authorization to save qr code");
      return;
    }
    //}
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "ScanSign/"
    ).catch((error) => {}); //先创建文件夹，否则会报找不到路径
    let filePath = FileSystem.documentDirectory + "ScanSign/qrcode.png";
    await FileSystem.writeAsStringAsync(
      filePath,
      qrCodeBase64.replace("data:image/png;base64,", ""),
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );
    //重新压缩图片，调整格式
    //let resizedPhoto = await ImageManipulator.manipulateAsync(filePath, [{resize: {height: 400}}], { compress: 1 });
    //const asset = await MediaLibrary.createAssetAsync(resizedPhoto.uri);

    const asset = await MediaLibrary.createAssetAsync(filePath);
    await MediaLibrary.createAlbumAsync("QR Codes", asset, false)
      .then(() => {
        Alert.alert("qr code saved!");
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert("an error occured while save qr code: " + error.message);
      });
  }

  async function shareQRCode() {
    ref.toDataURL((data: any) => {
      // console.log(data); // 输出二维码的base64字符串
      // 你可以在此方法内部将base64编码的数据保存为图片
      callback(data);
    });
  }

  async function callback(dataURL: string) {
    if (Platform.OS === "android") {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("ask authorization to save qr code");
        return;
      }
    }
    FileSystem.makeDirectoryAsync(
      FileSystem.cacheDirectory + "ScanSign/"
    ).catch((error) => {});
    let temp = FileSystem.cacheDirectory + "ScanSign/tempqrcode.png"; //在临时缓存路径下创建临时二维码文件
    await FileSystem.writeAsStringAsync(
      temp,
      dataURL.replace("data:image/png;base64,", ""),
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );

    const asset = await MediaLibrary.createAssetAsync(temp); //创建二维码图片
    //let resizedPhoto = await ImageManipulator.manipulateAsync(temp, [{resize: {width: 400}}], { compress: 0.5 });
    //const asset = await MediaLibrary.createAssetAsync(resizedPhoto.uri);
    await MediaLibrary.createAlbumAsync("QR Codes", asset, false)
      .then(() => {
        Sharing.shareAsync(temp)
          .catch((error) => console.log(error))
          .then(() => MediaLibrary.deleteAssetsAsync(temp)); //分享后删除二维码图片
      })
      .catch((error) => {
        Alert.alert(
          "an error occured while share the qr code: " + error.message
        );
      });
  }
  let content = params.content as string;
  let logo = require("../assets/images/logo-qr.png");
  return (
    <View style={styles.container}>
      <Text style={styles.qrText}>Scan Sign QR Code</Text>
      {/* <QRCODE value={content} getRef={(c) => (ref = c)} /> */}
      <QRCode
        size={300}
        value={content}
        color="purple" // 二维码主色
        backgroundColor="white"
        logo={logo}
        logoSize={50}
        logoBorderRadius={10}
        logoBackgroundColor="transparent"
        quietZone="30" //设置边框，否则用BarCodeScanner扫描时扫描不到
        //logoBackgroundColor="skyblue"
        enableLinearGradient="true" //是否渐变色
        linearGradient={["blue", "lime", "purple"]} //渐变色数组
        getRef={(c) => (ref = c)} //获取当前qrcode的ref，并返回给变量
      />
      <TouchableOpacity
        style={styles.button1}
        onPress={() => {
          saveQRCodeToBase64();
        }}
      >
        <Text style={styles.save}>Save To Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          shareQRCode();
        }}
      >
        <Text style={styles.save}>Share QR Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  button1: {
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
  button2: {
    borderRadius: 30,
    padding: 15,
    position: "absolute",
    bottom: 0,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
    backgroundColor: "#273746",
  },
  qrText: {
    top: -100,
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },

  save: {
    color: "#fff",
    fontSize: 16,
    //textTransform: "capitalize",
  },
});

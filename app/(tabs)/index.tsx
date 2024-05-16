import { StyleSheet, View, Image } from "react-native";
//import EditScreenInfo from "@/components/EditScreenInfo";
import { Text } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";

const info =
  "Contact us: \ne-mail:moukeycoin@gmail.com \ntel: +86 11111111111 \naddress: Torento in Canada";
const mainimage = require("../../assets/images/welcome.jpg");

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>welcome to scan sign</Text>
      <View style={styles.imageContainer}>
        <Image source={mainimage} style={styles.image}></Image>
      </View>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.separator} />
      <Text style={styles.content}>{info}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor:"black"
  },
  title: {
    flex: 0.5,
    fontSize: 20,
    fontWeight: "bold",
    marginTop:5
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  content: {
    flex:1.5,
    fontSize: 15,
    //fontWeight: "bold",
    //marginBottom:20,
  },
  imageContainer: {
    flex: 8,
    paddingTop: 10,
  },
  image: {
    flex: 1,
    borderRadius: 40,
  },
});

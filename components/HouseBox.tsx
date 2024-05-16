import { StyleSheet, Image, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import { ExternalLink } from "./ExternalLink";
import { WebView } from "react-native-webview";
import { Link, router } from "expo-router";

export default function HouseBox(props: {
  websitename: string;
  websitelink: string;
  description: string;
  image: any;
}) {
  return (
    <View style={styles.container}>
      <Pressable
        style={{ flex: 1, flexDirection: "row", height:"95%"}}
        onPress={() =>
          router.navigate({
            pathname: "/webviewscreen",
            params: { link: props.websitelink },
          })
        }
      >
        <Image source={props.image} style={styles.image} resizeMode="contain"></Image>
        <View style={{ flex: 4, flexDirection: "column" }}>
          <Text style={styles.title}> {props.websitename}</Text>
          <Text style={styles.description}> {props.description}</Text>
        </View>
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: 100,
    //borderColor:"lime",
    //borderWidth:1,
    borderRadius:10,
    marginTop:1,
    
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    //flexDirection:"row",
    textAlign:"center",
    fontStyle:"italic",
    //color:"violet"
  },
  description: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 2,
    textAlign:"left",
    textAlignVertical:"top",
    //color:"gold"
    //flexDirection:"row",
  },
  image: {
    //marginVertical: 30,
    marginTop: 5,
    marginLeft: 10,
    height: "95%",
    width: "95%",
    flex: 1,
    backgroundColor: "black",
    borderColor:"black",
    borderRadius:5,
    borderWidth:1,
    
    //flexDirection:"row",
  },
});

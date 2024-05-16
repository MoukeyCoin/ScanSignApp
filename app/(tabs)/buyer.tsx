import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import HouseBox from "@/components/HouseBox";
import WebViewScreen from "@/app/webviewscreen";

const BuyerScreen = () => {
  const link = "https://www.zillow.com/z/canada/canada-homes/";

  return (<WebViewScreen url={link} />);
};
export default BuyerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

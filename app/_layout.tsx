import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Link, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/(tabs)",
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
//SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      //setTimeout(SplashScreen.hideAsync, 2000);
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return  <RootLayoutNav />

}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const webviewrightmenu = [
    {
      id: 1,
      name: "Share",
      icon: <FontAwesome name="share-alt" size={24} color="black" />,
    },
    {
      id: 2,
      name: "Generate QR Code",
      icon: (
        <MaterialCommunityIcons name="qrcode-edit" size={24} color="black" />
      ),
    },
  ];

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            headerStyle: {
              backgroundColor: "skyblue",
            },
          }}
        />
        <Stack.Screen
          name="citylistscreen"
          options={{
            //presentation: "cityscreen",
            title: "City Selection",
            headerStyle: {
              backgroundColor: "skyblue",
            },
          }}
        />
        <Stack.Screen
          name="webviewscreen"
          options={{ title: "", headerShown: false }}
        />
        <Stack.Screen
          name="qrcodescreen"
          options={{
            title: "QR Code",
            headerStyle: {
              backgroundColor: "skyblue",
            },
            headerTitleAlign: "center",
          }}

          /* name="webviewscreen" 
          options={{
            //presentation: "modal",
            title: "",

            headerStyle: {
              backgroundColor: "skyblue",
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",

            headerRight: () => (
              <Pressable>
                {({ pressed }) => (
                  //tabBarIcon  这里没用这个function，因为这里写死fontawsome类型。我用了其他图标
                  <WebViewMenu menudata={webviewrightmenu} />
                )}
              </Pressable>
            ),
            headerLeft: () => (
                <Pressable>
                  {({ pressed }) => (
                    <GoBack />
                  )}
                </Pressable>

            ),
          }} */
        />
        <Stack.Screen
          name="qrscannerscreen"
          options={{
            title: "Scan Sign Scanner",
            headerTitleAlign: "center",
            //presentation: "modal",
            headerStyle: {
              backgroundColor: "skyblue",
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router, Tabs } from "expo-router";
import { Pressable, Text } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#2089dc",
          },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-city" size={24} color={color} />
          ),
          /* headerTitleAlign: "center",
          headerTitle: () => (
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              Scan Sign Technology
            </Text>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => {
                 
              }}
            >
              {({ pressed }) => (
                <MaterialCommunityIcons
                  name="timeline-help-outline"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 20, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.navigate({
                  pathname: "/webview",
                  params: { link: "http://155.138.145.189/" },
                }); 
              }}
            >
              {({ pressed }) => (
                <MaterialCommunityIcons
                  name="timeline-help-outline"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 20, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ), */
        }}
      />
      <Tabs.Screen
        name="houseexplore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="explore" size={24} color={color} />
          ),
          /* headerLeft: () => (
            <Link href="/modal" asChild>
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
          ), */
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: "Products",
          headerStyle: {
            backgroundColor: "#2089dc",
          },
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={24} color={color} />
          ),
          headerTitleAlign: "center",
          headerTitle: () => (
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              Products
            </Text>
          ),
          
        }}
      />
    </Tabs>
  );
}

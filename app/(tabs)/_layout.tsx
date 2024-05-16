import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Link,
  router,
  Tabs,
  useLocalSearchParams,
  useSegments,
} from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { Text } from "@/components/Themed";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [City, setCity] = useState<String>("Vancouver");
  const segment = useSegments();
  //setCity(params.currentcity as string)
  // get the current page from the segment
  const page = segment[segment.length - 1];
  // create an array of list pages you want to hide the tab bar in
  const pagesToHideTabBar = ["scanner"];
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        tabBarStyle: {
          backgroundColor: "skyblue",
        },

        headerShown: useClientOnlyValue(false, true),
        //headerTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "home",
          headerStyle: {
            backgroundColor: "skyblue",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          //tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          headerTitle: () => (
            <Text style={{ marginLeft: 0, color: "purple", fontSize: 20 }}>
              Scan Sign
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Pressable
                onPress={() =>
                  router.navigate({
                    pathname: "/webviewscreen",
                    params: { link: "https://moukeycoin.github.io/ScanSign/" },
                  })
                }
              >
                {({ pressed }) => (
                  //tabBarIcon  这里没用这个function，因为这里写死fontawsome类型。我用了其他图标
                  <MaterialIcons //不同的类，不同的图标.需要在前面import
                    name="help-outline"
                    size={25}
                    //color={Colors[colorScheme ?? 'light'].text}
                    color="black" //修改图标颜色
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </TouchableOpacity>
          ),
          tabBarIcon: () => (
            <FontAwesome //不同的类，不同的图标.需要在前面import
              name="home"
              size={30}
              //color={Colors[colorScheme ?? "light"].text}
              color="green" //修改图标颜色
            />
          ),
        }}
      />
      <Tabs.Screen
        name="seller"
        options={{
          //title: "sell",
          headerShown: false,
          href: {
            pathname: "/seller",
            params: { currentcity: "" },
          },
          headerStyle: {
            backgroundColor: "skyblue",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: () => (
            <Text style={{ marginLeft: 0, color: "green", fontSize: 15 }}>
              {City}
            </Text>
          ),
          //headerTitleAlign: "center",
          //tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          headerLeft: () => (
            <Pressable
              onPress={() =>
                router.navigate({
                  pathname: "/citylistscreen",
                  params: { currentcity: City },
                })
              }
            >
              {({ pressed }) => (
                <Entypo //不同的类，不同的图标
                  name="location"
                  //title="City"
                  size={25}
                  //color={Colors[colorScheme ?? 'light'].text}
                  color="purple" //修改图标颜色
                  style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),

          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  //tabBarIcon  这里没用这个function，因为这里写死fontawsome类型。我用了其他图标
                  <AntDesign //不同的类，不同的图标.需要在前面import
                    name="pluscircleo"
                    size={25}
                    //color={Colors[colorScheme ?? 'light'].text}
                    color="purple" //修改图标颜色
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          tabBarIcon: () => (
            <FontAwesome //不同的类，不同的图标.需要在前面import
              name="buysellads"
              size={30}
              //color={Colors[colorScheme ?? "light"].text}
              color="green" //修改图标颜色
            />
          ),
        }}
      />
      <Tabs.Screen
        name="buyer"
        options={{
          href: null, //隐藏该选项卡
          title: "buy",
          headerStyle: {
            backgroundColor: "skyblue",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: () => (
            <Text style={{ marginLeft: 0, color: "green", fontSize: 15 }}>
              {City}
            </Text>
          ),
          //headerTitleAlign: "center",
          //tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          headerLeft: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Entypo //不同的类，不同的图标
                    name="location"
                    //title="City"
                    size={25}
                    //color={Colors[colorScheme ?? 'light'].text}
                    color="purple" //修改图标颜色
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),

          headerRight: () => (
            <Link href="/qrscannerscreen" asChild>
              <Pressable>
                {({ pressed }) => (
                  //tabBarIcon  这里没用这个function，因为这里写死fontawsome类型。我用了其他图标
                  <MaterialCommunityIcons //不同的类，不同的图标.需要在前面import
                    name="line-scan"
                    size={25}
                    //color={Colors[colorScheme ?? 'light'].text}
                    color="purple" //修改图标颜色
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          tabBarIcon: () => (
            <MaterialIcons //不同的类，不同的图标.需要在前面import
              name="sell"
              size={25}
              //color={Colors[colorScheme ?? 'light'].text}
              color="green" //修改图标颜色
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          //href: "/scanner",
          title: "scan",
          headerStyle: {
            backgroundColor: "skyblue",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarShowLabel: false,
          //headerShown:false,
          tabBarIcon: () => (
            <MaterialCommunityIcons //不同的类，不同的图标.需要在前面import
              name="data-matrix-scan"
              size={25}
              //color={Colors[colorScheme ?? "light"].text}
              color="green" //修改图标颜色
            />
          ),
          headerTitleAlign: "center",
          headerTitle: () => (
            <Text
              style={{ alignItems: "center", color: "purple", fontSize: 20 }}
            >
              house information
            </Text>
          ),

          tabBarStyle: {
            // check if the current page is in the list then hide the tab bar
            //如果当前页时scanner，不显示tabbar
            display: pagesToHideTabBar.includes(page) ? "none" : "flex",
          },
          //因为没有tabbar，所以加一个返回键
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              {({ pressed }) => (
                <Ionicons //不同的类，不同的图标
                  name="arrow-back"
                  //title="City"
                  size={30}
                  //color={Colors[colorScheme ?? 'light'].text}
                  color="purple" //修改图标颜色
                  style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}

import { color } from "@rneui/base";
import { Overlay } from "@rneui/themed";
import React, { useState, useRef, ReactNode } from "react";
import { Animated, View, StyleSheet, Button, Dimensions } from "react-native";

interface DrawerProps {
  children?: React.ReactNode; // Define the type for children as optional ReactNode
  visible: boolean ;
  onClose?(): void;
  direction?: string; //direction is the direction of the drawer. four value :"top boteom left right"
  onBackdropPress?(): void;
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  visible,
  onClose,
  onBackdropPress,
  direction,
}) => {
  // ... your component logic
  let screenWidth = Dimensions.get("window").height;
  const opacity = useRef(new Animated.Value(0)).current; // Initial opacity 0 (transparent)
  const translateY = useRef(new Animated.Value(screenWidth)).current; // Initial translation from top
  const translateX = useRef(new Animated.Value(0)).current;
  const animateIn = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateOut = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 100,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => (onClose));
  };

  React.useEffect(() => {
    if (visible) {
      animateIn();
    } else {
      animateOut();
    }
  }, [visible]);

  const overlayStyles = {
    ...StyleSheet.absoluteFillObject,
    opacity,
    transform: [{ translateX }],
    
  };

  return (
    <Overlay animationType="slide" isVisible={visible}>
      <Animated.View style={overlayStyles} >
        <View style={{backgroundColor:"black"}}>
        {children}
        {/* Button to close the overlay */}
        <Button title="Close" onPress={onClose} />
        </View>
      </Animated.View>
      </Overlay>
    
  );
};

export default Drawer;

import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Image, StyleSheet, Easing, Text, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); // Get screen size

const SplashScreen = ({ onAnimationComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const boxAnimations = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];
  const [showBoxes, setShowBoxes] = useState(false);

  useEffect(() => {
    // Fade in the image
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      // Show the boxes with bounce effect
      setShowBoxes(true);

      boxAnimations.forEach((anim, index) => {
        setTimeout(() => {
          Animated.spring(anim, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
          }).start();
        }, index * 300);
      });

      // Hide splash after animation completes
      setTimeout(onAnimationComplete, 3000);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Image with full-screen scaling */}
      <Animated.Image
        source={require("../assets/images/Splasher.png")}
        style={[styles.image, { opacity: fadeAnim }]}
      />

      {/* Centered Text */}
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>HOPOFFER</Animated.Text>

      {/* Animated Boxes */}
      {showBoxes && (
        <View style={styles.boxContainer}>
          {boxAnimations.map((anim, index) => (
            <Animated.View
              key={index}
              style={[
                styles.box,
                {
                  transform: [{ scale: anim }],
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,  // Full-screen width
    height: height, // Full-screen height
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#344c84",
  },
  image: {
    width: width * 0.5,  // 50% of screen width
    height: height * 0.2, // 20% of screen height
    resizeMode: "contain",
    marginBottom: height * 0.05, // Scaled spacing
  },
  text: {
    fontSize: width * 0.05, // Scales with screen size
    color: "white",
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.03,
  },
  box: {
    width: width * 0.05, // Responsive box width
    height: height * 0.1, // Responsive box height
    backgroundColor: "white",
    marginHorizontal: width * 0.03,
    borderRadius: 5,
    shadowColor: "#cfe3fc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});

export default SplashScreen;

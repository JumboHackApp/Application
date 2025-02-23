import React from "react";
import { View, StyleSheet } from "react-native";
import SwipeMain from "../Components/swipeMain"; // Import Questions.tsx

export default function Index() {
  return (
    <View style={styles.container}>
      <SwipeMain />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d6e6f6",
  },
});

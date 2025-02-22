import React from "react";
import { View, StyleSheet } from "react-native";
import Questions from "../../Components/questions"; // Import Questions.tsx

export default function Index() {
  return (
    <View style={styles.container}>
      <Questions />  

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
});

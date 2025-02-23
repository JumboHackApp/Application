import React from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import SwipeMain from "../Components/swipeMain"; // Import Questions.tsx

export default function Index() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]); // Store saved jobs

  return (
    <View style={styles.container}>
      <SwipeMain setSavedJobs={setSavedJobs} />  
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

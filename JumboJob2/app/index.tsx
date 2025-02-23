import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SwipeMain from "../Components/swipeMain";
import Questions from "../Components/questions";
import SplashScreen from "../Components/SplashScreen"; // Import SplashScreen component

export default function Index() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [splashCompleted, setSplashCompleted] = useState(false);
  const [questionsCompleted, setQuestionsCompleted] = useState(false);

  return (
    <View style={styles.container}>
      {!splashCompleted ? (
        <SplashScreen onAnimationComplete={() => setSplashCompleted(true)} />
      ) : questionsCompleted ? (
        <SwipeMain setSavedJobs={setSavedJobs} />
      ) : (
        <Questions onComplete={() => setQuestionsCompleted(true)} />
      )}
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

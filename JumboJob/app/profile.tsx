import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [aboutData, setAboutData] = useState({
    achievements: "",
    freeTime: "",
    careerInspiration: "",
  });

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profilePic} />
        <Text style={styles.name}>Your Name</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#333" />
          <Text style={styles.locationText}>Medford, MA</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          Provide 3 examples (one-line each) of your top achievements (this can be anything and does not have to be school or career-based).
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter achievements..."
          value={aboutData.achievements}
          onChangeText={(text) => setAboutData({ ...aboutData, achievements: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="In one sentence, describe what you like to do in your free time."
          value={aboutData.freeTime}
          onChangeText={(text) => setAboutData({ ...aboutData, freeTime: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="What inspired you to pursue this field?"
          value={aboutData.careerInspiration}
          onChangeText={(text) => setAboutData({ ...aboutData, careerInspiration: text })}
        />
      </View>

      {/* Resume Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Resume</Text>
        {["Experiences", "Projects", "Skills", "Languages", "Certifications", "Awards"].map((item, index) => (
          <TouchableOpacity key={index} style={styles.resumeItem}>
            <Text style={styles.resumeText}>{item}</Text>
            <Ionicons name="add-outline" size={20} color="black" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6e6f6",
  },
  header: {
    backgroundColor: "#2E4A7B",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 5,
  },
  editButton: {
    backgroundColor: "#4B6EA9",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginTop: 8,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    color: "#333",
  },
  resumeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  resumeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

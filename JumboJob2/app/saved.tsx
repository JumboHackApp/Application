import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSavedJobs } from "../context/SavedJobsContext"; // Import global state

export default function SavedScreen() {
  const [activeTab, setActiveTab] = useState("Jobs");
  const { savedJobs } = useSavedJobs(); // Get saved jobs from context

  const renderTag = (text: string, color: string, key: string) => (
    <View key={key} style={[styles.tag, { backgroundColor: color }]}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>

      {/* Toggle Button */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "Jobs" ? styles.activeToggle : styles.inactiveToggle,
          ]}
          onPress={() => setActiveTab("Jobs")}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === "Jobs" ? styles.activeText : styles.inactiveText,
            ]}
          >
            Jobs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "Events" ? styles.activeToggle : styles.inactiveToggle,
          ]}
          onPress={() => setActiveTab("Events")}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === "Events" ? styles.activeText : styles.inactiveText,
            ]}
          >
            Events
          </Text>
        </TouchableOpacity>
      </View>

      {/* Job List */}
      {activeTab === "Jobs" ? (
        savedJobs.length === 0 ? (
          <Text style={styles.noJobsText}>No saved jobs yet.</Text>
        ) : (
          <FlatList
            key="jobs" // Forces re-render when switching tabs
            data={savedJobs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.jobCard}>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                  <Text style={styles.jobCompany}>{item.company}</Text>

                  {/* Display Colorful Tags */}
                  <View style={styles.tagContainer}>
                    {renderTag(item.workMode, "#87CEFA", `${item.id}-workMode`)}
                    {renderTag(item.employmentType, "#4169E1", `${item.id}-employmentType`)}
                    {renderTag(item.pay, "#E6E6FA", `${item.id}-pay`)}
                  </View>

                  <Text style={styles.jobDescription}>{item.description}</Text>
                </View>

                <TouchableOpacity>
                  <Ionicons name="bookmark" size={22} color="#1a1a1a" />
                </TouchableOpacity>
              </View>
            )}
          />
        )
      ) : (
        <View>
          <Text style={styles.noJobsText}>No saved events yet.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6e6f6",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  toggleButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  activeToggle: {
    backgroundColor: "#1a1a1a",
  },
  inactiveToggle: {
    backgroundColor: "#fff",
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  activeText: {
    color: "#fff",
  },
  inactiveText: {
    color: "#000",
  },
  jobCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  jobCompany: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 6,
  },
  tagText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  jobDescription: {
    fontSize: 13,
    color: "#666",
  },
  noJobsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default SavedScreen;

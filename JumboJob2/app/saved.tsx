import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";




import { Ionicons } from "@expo/vector-icons";

// Sample job listings
const savedJobs = [
  {
    id: "1",
    title: "Biofabrication Intern",
    description: "3D Printing | Biology | 3D Modeling",
    status: "Applied",
    bookmarked: true,
  },
  {
    id: "2",
    title: "PayPal Intern",
    description: "Front-end Web Dev Software Design",
    status: "Applied",
    bookmarked: true,
    selected: true, // Blue border for selection
  },
  {
    id: "3",
    title: "CHOB Lab Technician",
    description: "Data Collection Python | C#",
    status: "Applied",
    bookmarked: true,
  },
  {
    id: "4",
    title: "SEM Imaging Technician",
    description: "Confocal neural imaging",
    status: "Apply",
    bookmarked: true,
    apply: true, // Special Apply button color
  },
];

// Sample event listings
const savedEvents = [
  {
    id: "1",
    title: "Jumbo Hack",
    date: "Feb 22-23",
    // image: require("../assets/jumbohack.png"), // Replace with actual image path
  },
  {
    id: "2",
    title: "Hacking Injustice",
    date: "March 1 - March 2, 2025",
    // image: require("../assets/hacking_injustice.png"),
  },
  {
    id: "3",
    title: "Harvard Rare Disease Hackathon",
    date: "2025",
    // image: require("../assets/harvard_hackathon.png"),
  },
  {
    id: "4",
    title: "Paid Study - fMRI on Social Experiences",
    date: "Ongoing",
    // image: require("../assets/paid_study.png"),
  },
];

export default function SavedScreen() {
  const [activeTab, setActiveTab] = useState("Jobs");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>

      {/* Toggle Button */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "Events"
              ? styles.activeToggle
              : styles.inactiveToggle,
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
      </View>

      {/* Force re-render by changing key */}
      {activeTab === "Jobs" ? (
        <FlatList
          key="jobs" // Forces re-render when switching tabs
          data={savedJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.jobCard, item.selected && styles.selectedJob]}>
              <View style={styles.jobInfo}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.jobDescription}>{item.description}</Text>
              </View>

              <View style={styles.actions}>
                <View
                  style={[
                    styles.statusBadge,
                    item.apply ? styles.applyBadge : styles.appliedBadge,
                  ]}
                >
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>

                <TouchableOpacity>
                  <Ionicons
                    name={item.bookmarked ? "bookmark" : "bookmark-outline"}
                    size={22}
                    color="#1a1a1a"
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={22}
                    color="#1a1a1a"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <FlatList
          key="events" // Forces re-render when switching tabs
          data={savedEvents}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.eventRow}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Image source={item.image} style={styles.eventImage} />
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventDate}>{item.date}</Text>
            </View>
          )}
        />
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
  },
  toggleContainer: {
    flexDirection: "row",
    marginTop: 15,
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
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedJob: {
    borderWidth: 2,
    borderColor: "#4990e2",
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  jobDescription: {
    fontSize: 13,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 10,
  },
  appliedBadge: {
    backgroundColor: "#ccc",
  },
  applyBadge: {
    backgroundColor: "#4990e2",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  eventRow: {
    justifyContent: "space-between",
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    width: "48%",
  },
  eventImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  eventDate: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  postButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1a1a1a",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  postButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

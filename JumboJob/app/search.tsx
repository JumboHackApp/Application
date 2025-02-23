import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const jobsData = [
  { id: "1", title: "Software Engineer Intern", company: "Google" },
  { id: "2", title: "Data Analyst", company: "Facebook" },
  { id: "3", title: "UI/UX Designer", company: "Apple" },
  { id: "4", title: "Machine Learning Engineer", company: "Tesla" },
];

const eventsData = [
  { id: "1", title: "Hackathon 2025", location: "Boston, MA" },
  { id: "2", title: "AI & Robotics Conference", location: "San Francisco, CA" },
  { id: "3", title: "Startups Networking", location: "New York, NY" },
  { id: "4", title: "Tech Leadership Summit", location: "Seattle, WA" },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(["Bio Fabrication", "UI/UX"]);
  const [activeTab, setActiveTab] = useState("Jobs");

  const filteredResults = (activeTab === "Jobs" ? jobsData : eventsData).filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const router = useRouter();
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Job Titles or Companies</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === "Events" ? styles.activeToggle : styles.inactiveToggle]}
          onPress={() => setActiveTab("Events")}
        >
          <Text style={[styles.toggleText, activeTab === "Events" ? styles.activeText : styles.inactiveText]}>
            Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === "Jobs" ? styles.activeToggle : styles.inactiveToggle]}
          onPress={() => setActiveTab("Jobs")}
        >
          <Text style={[styles.toggleText, activeTab === "Jobs" ? styles.activeText : styles.inactiveText]}>
            Jobs
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          data={filters}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => setFilters(filters.filter((f) => f !== item))}
              style={styles.filterChipTouchable}
            >
              <View style={styles.filterChip}>
                <Text style={styles.filterText}>{item}</Text>
                <Text style={styles.removeFilter}>×</Text>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultTitle}>{item.title}</Text>
            <Text style={styles.resultSubtitle}>
              {activeTab === "Jobs" ? `Company: ${item.company}` : `Location: ${item.location}`}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
              style={styles.postButton}
              onPress={() => router.push("/postEvent")}
            >
              <Text style={styles.postButtonText}>Post Your Event +</Text>
            </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 10,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filtersContainer: {
    marginBottom: 10,
  },
  filtersList: {
    alignItems: 'center',
  },
  filterChipTouchable: {
    marginRight: 8,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#e1e5ea",
    alignSelf: 'flex-start', // This prevents expanding
  },
  filterText: {
    fontSize: 12,
    color: "#333",
    marginRight: 4,
  },
  removeFilter: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
    marginLeft: 2,
  },
  resultItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  resultSubtitle: {
    fontSize: 13,
    color: "#666",
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
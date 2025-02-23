import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [aboutData, setAboutData] = useState({
    achievements: "",
    freeTime: "",
    careerInspiration: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [resumeModalVisible, setResumeModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [resumeCategory, setResumeCategory] = useState("");
  const [resumeInput, setResumeInput] = useState("");
  const [resumeEntries, setResumeEntries] = useState({
    Experiences: [],
    Projects: [],
    Skills: [],
    Languages: [],
    Certifications: [],
    Awards: [],
  });

  const openEditModal = (field) => {
    setCurrentField(field);
    setModalVisible(true);
  };

  const openResumeModal = (category) => {
    setResumeCategory(category);
    setResumeModalVisible(true);
    setResumeInput(""); // Reset input
  };

  const addResumeEntry = () => {
    if (resumeInput.trim()) {
      setResumeEntries((prev) => ({
        ...prev,
        [resumeCategory]: [...prev[resumeCategory], resumeInput.trim()],
      }));
      setResumeInput("");
    }
  };

  const saveResumeEntries = () => {
    setResumeModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profilePic} />
        <Text style={styles.name}>Your Name</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#fff" />
          <Text style={styles.locationText}>Medford, MA</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About</Text>

        {Object.keys(aboutData).map((field, index) => (
          <View key={index}>
            <View style={styles.inputRow}>
              <Text style={styles.description}>
                {field === "achievements"
                  ? "Top Achievements"
                  : field === "freeTime"
                  ? "What You Like to Do"
                  : "Career Inspiration"}
              </Text>
              <TouchableOpacity onPress={() => openEditModal(field)}>
                <Ionicons name="create-outline" size={18} color="#666" />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                styles.inputText,
                aboutData[field] ? styles.filledInputText : styles.placeholderText,
              ]}
            >
              {aboutData[field] || "No details added"}
            </Text>
          </View>
        ))}
      </View>

      {/* Resume Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Resume</Text>
        {Object.keys(resumeEntries).map((category, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.resumeItem}
              onPress={() => openResumeModal(category)}
            >
              <Text style={styles.resumeText}>{category}</Text>
              <Ionicons name="add-outline" size={20} color="black" />
            </TouchableOpacity>

            {/* Display saved resume entries */}
            <FlatList
              data={resumeEntries[category]}
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => (
                <Text style={styles.savedResumeEntry}>• {item}</Text>
              )}
            />
          </View>
        ))}
      </View>

      {/* About Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Edit {currentField}</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter details..."
              multiline
              value={aboutData[currentField]}
              onChangeText={(text) =>
                setAboutData({ ...aboutData, [currentField]: text })
              }
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Resume Edit Modal */}
      <Modal visible={resumeModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add {resumeCategory}</Text>
            <TextInput
              style={styles.modalInput}
              placeholder={`Enter ${resumeCategory} details...`}
              value={resumeInput}
              onChangeText={setResumeInput}
              onSubmitEditing={addResumeEntry} // Press Enter to add
            />
            <FlatList
              data={resumeEntries[resumeCategory]}
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={({ item }) => (
                <Text style={styles.savedResumeEntry}>• {item}</Text>
              )}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveResumeEntries}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  inputText: {
    fontSize: 14,
    marginBottom: 10,
  },
  placeholderText: {
    color: "#999",
  },
  filledInputText: {
    color: "#333",
    fontWeight: "bold",
  },
  resumeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  savedResumeEntry: {
    color: "#1E4D90",
    fontWeight: "bold",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 15,
    backgroundColor: "#4B6EA9",
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
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
});

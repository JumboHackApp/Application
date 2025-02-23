import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); // Get screen size

const Questions = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    schoolEmail: "",
    university: "",
    graduationYear: "",
    major: "",
    preferredWork: "",
    jobLocation: "",
    jobType: "",
    keywords: "",
  });

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <View style={styles.phoneContainer}>
      <View style={styles.questionBox}>
        {step === 1 && (
          <>
            <Text style={styles.heading}>Hi! What is your name?</Text>
            <Text style={styles.subtext}>Please enter your first and last name</Text>
            <TextInput
              placeholder="Ex: John Doe"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              style={styles.input}
            />
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.heading}>What is your school email?</Text>
            <TextInput
              placeholder="Ex: john.doe@tufts.edu"
              value={formData.schoolEmail}
              onChangeText={(text) => setFormData({ ...formData, schoolEmail: text })}
              style={styles.input}
            />
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.heading}>What school do you go to?</Text>
            <TextInput
              placeholder="Ex: Tufts University"
              value={formData.university}
              onChangeText={(text) => setFormData({ ...formData, university: text })}
              style={styles.input}
            />
          </>
        )}

        {step === 4 && (
          <>
            <Text style={styles.heading}>What year is your graduation?</Text>
            <TextInput
              placeholder="Ex: 2027"
              value={formData.graduationYear}
              onChangeText={(text) => setFormData({ ...formData, graduationYear: text })}
              style={styles.input}
            />
          </>
        )}

        {step === 5 && (
          <>
            <Text style={styles.heading}>What is your major?</Text>
            <TextInput
              placeholder="Ex: Computer Science"
              value={formData.major}
              onChangeText={(text) => setFormData({ ...formData, major: text })}
              style={styles.input}
            />
          </>
        )}

        {step === 6 && (
          <>
            <Text style={styles.heading}>Almost there!</Text>
            <Text style={styles.subtext}>Now let's enter your job preferences</Text>
          </>
        )}

        {step === 7 && (
          <>
            <Text style={styles.heading}>What is your preferred means of work?</Text>
            <Text style={styles.subtext}>(remote / on-site / hybrid)</Text>
            <TextInput
              placeholder="Ex: On-site"
              value={formData.preferredWork}
              onChangeText={(text) => setFormData({ ...formData, preferredWork: text })}
              style={styles.input}
            />
          </>
        )}

        {step === 8 && (
          <>
            <Text style={styles.heading}>Would you like a job on-campus or in the industry?</Text>
            <TextInput
              placeholder="Ex: On-campus"
              value={formData.jobLocation}
              onChangeText={(text) => setFormData({ ...formData, jobLocation: text })}
              style={styles.input}
            />
          </>
        )}

        {step === 9 && (
          <>
            <Text style={styles.heading}>Are you looking for an internship or a full-time job?</Text>
            <TextInput
              placeholder="Ex: Internship"
              value={formData.jobType}
              onChangeText={(text) => setFormData({ ...formData, jobType: text })}
              style={styles.input}
            />
          </>
        )}

        {step === 10 && (
          <>
            <Text style={styles.heading}>Enter 7 keywords that best describe your interests</Text>
            <TextInput
              placeholder="Ex: Front-end developer"
              value={formData.keywords}
              onChangeText={(text) => setFormData({ ...formData, keywords: text })}
              style={styles.input}
            />
          </>
        )}

        {step === 11 && (
          <>
            <Text style={styles.heading}>You're All Set!</Text>
            <Text style={styles.subtext}>Make sure to complete setting up your profile</Text>
            <TouchableOpacity style={styles.doneButton}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </>
        )}

        {step < 11 && (
          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next →</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  phoneContainer: {
    width: width,
    height: height,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  questionBox: {
    width: width,
    height: height,
    backgroundColor: "#d6e6f6",
    borderRadius: 20,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
    width: "90%",
    marginBottom: 15,  // 👈 Add more space below the heading
  },
  subtext: {
    fontSize: 12,
    color: "black",
    textAlign: "left",
    width: "90%",
    marginTop: -10,
    marginBottom: 10,  // 👈 More space below subtext

  },
  input: {
    width: "90%",
    padding: 12,
    borderRadius: 20,
    backgroundColor: "#fff",
    color: "#666",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  nextButton: {
    position: "absolute",
    bottom: 50,
    right: 30,
    backgroundColor: "#4990e2",
    padding: 10,
    borderRadius: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  doneButton: {
    backgroundColor: "#4990e2",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Questions;

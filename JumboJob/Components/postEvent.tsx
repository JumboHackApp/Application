import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { storage, db } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

const MAX_TEXT_LENGTH = 3000;
const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB in bytes

const generateRandomHash = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

interface PostEventProps {
  onCancel: () => void;
  onPostSuccess: () => void;
}

const PostEvent: React.FC<PostEventProps> = ({ onCancel, onPostSuccess }) => {
  const [image, setImage] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [description, setDescription] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const validateImage = async (uri: string): Promise<boolean> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      if (blob.size > MAX_IMAGE_SIZE) {
        Alert.alert("Error", "Image size must be less than 1MB");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error validating image:", error);
      return false;
    }
  };

  const handleImageSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      try {
        const response = await fetch(result.assets[0].uri);
        const blobData = await response.blob();
        
        if (blobData.size > MAX_IMAGE_SIZE) {
          Alert.alert("Error", "Image size must be less than 1MB");
          return;
        }

        setImageBlob(blobData);
        setImage(result.assets[0].uri);  // Use the original URI for preview
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to process image");
      }
    }
  };

  const handlePost = async () => {
    if (!image || !imageBlob || !description) {
      Alert.alert("Error", "Please add both an image and description");
      return;
    }

    if (description.length > MAX_TEXT_LENGTH) {
      Alert.alert("Error", "Description must be less than 3000 characters");
      return;
    }

    try {
      setUploading(true);
      
      // Generate a simple filename with timestamp and random hash
      const fileName = `${Date.now()}-${generateRandomHash()}.jpg`;
      const storageRef = ref(storage, `events/${fileName}`);
      
      await uploadBytes(storageRef, imageBlob);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "events"), {
        imageUrl: downloadURL,
        description: description,
        createdAt: new Date(),
        date: new Date(),
      });

      setImage(null);
      setImageBlob(null);
      setDescription("");
      Alert.alert("Success", "Event posted successfully!");
      onPostSuccess();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to post event");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Your Event</Text>

      {/* Image Upload Section */}
      <TouchableOpacity 
        style={[styles.imageUploadBox, { pointerEvents: uploading ? 'none' : 'auto' }]}
        onPress={handleImageSelect}
      >
        {uploading ? (
          <View style={styles.uploadPlaceholder}>
            <Text>Uploading...</Text>
          </View>
        ) : image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <View style={styles.uploadPlaceholder}>
            <Ionicons name="image-outline" size={40} color="#666" />
            <Text style={styles.uploadText}>Tap to upload from Photo Library</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Description Input */}
      <TextInput
        style={styles.eventDescription}
        placeholder="Add Event Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={onCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.postButton} 
          onPress={handlePost}
        >
          <Text style={[styles.buttonText, { color: 'white' }]}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginBottom: 20,
  },
  imageUploadBox: {
    width: '100%',
    aspectRatio: 21/9,
    maxHeight: '40%',
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  uploadPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  uploadText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  eventDescription: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    minHeight: 120,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 10,
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  postButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PostEvent;

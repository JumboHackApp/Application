import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { validateAndResizeImage, MAX_FILE_SIZE } from '../utils/imageProcessing';

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    university: '',
    blurb: '',
    photoURL: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        setProfile(userDoc.data());
      }
      setLoading(false);
    } catch (error) {
      setError('Error loading profile');
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setError('');

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    try {
      const processedImage = await validateAndResizeImage(selectedFile);
      setFile(processedImage);
    } catch (error) {
      setError(error.message);
      e.target.value = ''; // Reset input
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let photoURL = profile.photoURL;

      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          throw new Error(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        }

        // Create a reference to the file in Firebase Storage
        const imageRef = ref(storage, `profile-pictures/${auth.currentUser.uid}`);
        
        // Set metadata to include content type and size restrictions
        const metadata = {
          contentType: 'image/jpeg',
          customMetadata: {
            'originalSize': file.size.toString(),
            'dimensions': '1024x1024'
          }
        };
        
        // Upload the file with metadata
        await uploadBytes(imageRef, file, metadata);
        
        // Get the download URL
        photoURL = await getDownloadURL(imageRef);
      }

      // Update profile in Firestore
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        ...profile,
        photoURL,
        updatedAt: new Date().toISOString()
      });

      setProfile(prev => ({
        ...prev,
        photoURL
      }));
      setFile(null);
      e.target.querySelector('input[type="file"]').value = ''; // Reset file input
    } catch (error) {
      setError(error.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      {error && <p>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          {profile.photoURL && (
            <img
              src={profile.photoURL}
              alt="Profile"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          )}
        </div>

        <div>
          <label htmlFor="photo">Profile Picture</label>
          <input
            type="file"
            id="photo"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
          />
          <small>
            Maximum file size: 1MB. Images will be resized to 1024x1024 pixels.
            Supported formats: JPEG, PNG, WebP
          </small>
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="university">University</label>
          <input
            type="text"
            id="university"
            name="university"
            value={profile.university}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="blurb">About Me</label>
          <textarea
            id="blurb"
            name="blurb"
            value={profile.blurb}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}

export default Profile; 
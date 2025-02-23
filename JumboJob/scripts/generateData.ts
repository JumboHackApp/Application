import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PLACEHOLDER_IMAGE = "https://firebasestorage.googleapis.com/v0/b/jobhunter-6994e.firebasestorage.app/o/events%2F1740339153364-lsjmw8ul41js5w6zlc8vo.jpg?alt=media&token=7b6a4b78-9aee-4a94-8494-60e19b265641";

interface Job {
  jobTitle: string;
  company: string;
  location: string;
  workMode: 'in person' | 'remote' | 'hybrid';
  employmentType: 'full time' | 'part time' | 'internship';
  pay: string;
  description: string;
}

interface Event {
  name: string;
  location: string;
  time: Timestamp;
  description: string;
  imageLink: string;
}

const companies = [
  'Google', 'Microsoft', 'Apple', 'Meta', 'Amazon', 'Tesla', 'IBM', 
  'Intel', 'Nvidia', 'AMD', 'Oracle', 'Salesforce', 'Adobe'
];

const locations = [
  'Boston, MA', 'New York, NY', 'San Francisco, CA', 'Seattle, WA',
  'Austin, TX', 'Chicago, IL', 'Los Angeles, CA', 'Denver, CO'
];

const jobTitles = [
  'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer',
  'DevOps Engineer', 'ML Engineer', 'Full Stack Developer', 'iOS Developer',
  'Android Developer', 'Cloud Architect', 'Security Engineer'
];

const eventNames = [
  'Tech Career Fair', 'Hackathon', 'AI Symposium', 'Startup Networking',
  'Code Workshop', 'Design Sprint', 'Tech Talk', 'Innovation Summit',
  'Developer Conference', 'Research Showcase'
];

const generateJob = (): Job => ({
  jobTitle: jobTitles[Math.floor(Math.random() * jobTitles.length)],
  company: companies[Math.floor(Math.random() * companies.length)],
  location: locations[Math.floor(Math.random() * locations.length)],
  workMode: ['in person', 'remote', 'hybrid'][Math.floor(Math.random() * 3)] as Job['workMode'],
  employmentType: ['full time', 'part time', 'internship'][Math.floor(Math.random() * 3)] as Job['employmentType'],
  pay: `$${Math.floor(Math.random() * 100 + 50)}k - $${Math.floor(Math.random() * 100 + 100)}k`,
  description: `We are looking for a ${jobTitles[Math.floor(Math.random() * jobTitles.length)]} to join our team at ${companies[Math.floor(Math.random() * companies.length)]}. You will be working in ${locations[Math.floor(Math.random() * locations.length)]} with a ${['in person', 'remote', 'hybrid'][Math.floor(Math.random() * 3)]} work mode. This is a ${['full time', 'part time', 'internship'][Math.floor(Math.random() * 3)]} position with a pay range of $${Math.floor(Math.random() * 100 + 50)}k - $${Math.floor(Math.random() * 100 + 100)}k.`
});

const generateEvent = (): Event => ({
  name: eventNames[Math.floor(Math.random() * eventNames.length)],
  location: locations[Math.floor(Math.random() * locations.length)],
  time: Timestamp.fromDate(new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)), // Random date within next 30 days
  description: `Join us for the ${eventNames[Math.floor(Math.random() * eventNames.length)]} at ${locations[Math.floor(Math.random() * locations.length)]}. This event will take place on ${new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString()} and will feature exciting talks and networking opportunities.`,
  imageLink: PLACEHOLDER_IMAGE
});

const uploadData = async () => {
  try {
    // Generate and upload jobs
    for (let i = 0; i < 100; i++) {
      const job = generateJob();
      await addDoc(collection(db, 'jobs'), job);
      console.log(`Uploaded job ${i + 1}/100`);
    }

    // Generate and upload events
    for (let i = 0; i < 100; i++) {
      const event = generateEvent();
      await addDoc(collection(db, 'events'), event);
      console.log(`Uploaded event ${i + 1}/100`);
    }

    console.log('Data upload complete!');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
};

uploadData(); 
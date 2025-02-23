import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import PostEvent from "../Components/postEvent";
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../Components/firebase';
import { where, orderBy, startAt, endAt } from 'firebase/firestore';


interface Job {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  workMode: string;
  employmentType: string;
  pay: string;
  description: string;
}

interface Event {
  id: string;
  name: string;
  location: string;
  time: { toDate: () => Date };
  description: string;
  imageLink: string;
}

const DEFAULT_IMAGE = 'https://via.placeholder.com/300x200?text=Event';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(["Bio Fabrication", "UI/UX"]);
  const [activeTab, setActiveTab] = useState("Jobs");
  const [showPostEvent, setShowPostEvent] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [events, setEvents] = useState<Event[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery.trim()) {
        // If search query is empty, fetch all jobs/events
        if (activeTab === "Jobs") {
          const jobsQuery = query(collection(db, 'jobs'), limit(40));
          const jobsSnapshot = await getDocs(jobsQuery);
          setJobs(jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job)));
        } else {
          const eventsQuery = query(collection(db, 'events'), limit(40));
          const eventsSnapshot = await getDocs(eventsQuery);
          setEvents(eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event)));
        }
      } else {
        // Use Firestore queries to fetch matching data
        if (activeTab === "Jobs") {
          const jobsQuery = query(
            collection(db, 'jobs'),
            orderBy('jobTitle'), // Firestore requires an index for `orderBy`
            startAt(searchQuery),
            endAt(searchQuery + '\uf8ff'),
            limit(40)
          );
          const jobsSnapshot = await getDocs(jobsQuery);
          setJobs(jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job)));
        } else {
          const eventsQuery = query(
            collection(db, 'events'),
            orderBy('name'),
            startAt(searchQuery),
            endAt(searchQuery + '\uf8ff'),
            limit(40)
          );
          const eventsSnapshot = await getDocs(eventsQuery);
          setEvents(eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event)));
        }
      }
    };

    fetchData();
}, [activeTab, searchQuery]); // Fetch when `searchQuery` changes

  const filteredResults = activeTab === "Jobs" 
    ? jobs.filter(job => job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()))
    : events.filter(event => event.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderItem = ({ item }: { item: Job | Event }) => {
    if (activeTab === "Jobs") {
      return (
        <View style={styles.jobCard}>
          <View style={styles.jobMainContent}>
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle} numberOfLines={1}>
                {(item as Job).jobTitle}
              </Text>
              <Text style={styles.jobCompany} numberOfLines={1}>
                {(item as Job).company}
              </Text>
              <Text style={styles.jobDetails}>
                {(item as Job).location} · {(item as Job).workMode}
              </Text>
            </View>
            <View style={styles.salaryContainer}>
              <Text style={styles.salaryText}>
                {(item as Job).pay}
              </Text>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.eventCard}>
        <Image 
          source={{ uri: (item as Event).imageLink || DEFAULT_IMAGE }}
          style={styles.eventImage}
          defaultSource={{ uri: DEFAULT_IMAGE }}
          onError={(e) => {
            console.log('Image loading error:', e.nativeEvent.error);
          }}
        />
        <View style={styles.eventContent}>
          <Text style={styles.eventTitle} numberOfLines={2}>
            {(item as Event).name}
          </Text>
          <Text style={styles.eventLocation} numberOfLines={1}>
            {(item as Event).location}
          </Text>
          <Text style={styles.eventTime}>
            {(item as Event).time.toDate().toLocaleDateString()}
          </Text>
        </View>
      </View>
    );
  };

  const router = useRouter();
  
  const handleShowPostEvent = () => setShowPostEvent(true);
  const handleHidePostEvent = () => setShowPostEvent(false);

  if (showPostEvent) {
    return (
      <PostEvent 
        onCancel={handleHidePostEvent}
        onPostSuccess={handleHidePostEvent}
      />
    );
  }

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
        key={activeTab}
        data={filteredResults}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={activeTab === "Events" ? 2 : 1}
        columnWrapperStyle={activeTab === "Events" ? styles.row : undefined}
        contentContainerStyle={activeTab === "Jobs" ? styles.jobsList : undefined}
      />

      {activeTab === "Events" && (
        <TouchableOpacity
          style={styles.postButton}
          onPress={handleShowPostEvent}
        >
          <Text style={styles.postButtonText}>Post Your Event +</Text>
        </TouchableOpacity>
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
  row: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobMainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  jobInfo: {
    flex: 1,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  jobDetails: {
    fontSize: 13,
    color: '#666',
  },
  salaryContainer: {
    alignItems: 'flex-end',
  },
  salaryText: {
    fontSize: 14,
    color: '#4990e2',
    fontWeight: '500',
  },
  eventCard: {
    flex: 0.48,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 10,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 12,
    color: '#666',
  },
  eventTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
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
  jobsList: {
    paddingHorizontal: 15,
  },
});
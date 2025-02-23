import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../Components/firebase';

interface Job {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  workMode: 'In-person' | 'Remote' | 'Hybrid';
  employmentType: 'Full-time' | 'Part-time' | 'Internship';
  pay: string;
  description: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const SwipeMain: React.FC<{ setSavedJobs: React.Dispatch<React.SetStateAction<Job[]>> }> = ({ setSavedJobs }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const position = new Animated.ValueXY();

  // Fetch jobs from Firestore
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsQuery = query(collection(db, 'jobs'), limit(40));
        const jobsSnapshot = await getDocs(jobsQuery);
        const jobsList = jobsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Job));
        setJobs(jobsList);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe('right');
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe('left');
      } else {
        resetPosition();
      }
    }
  });

  const forceSwipe = (direction: 'right' | 'left') => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: 'right' | 'left') => {
    if (currentJobIndex >= jobs.length) return;

    const item = jobs[currentJobIndex];
    if (item) {
      if (direction === 'right') {
        setSavedJobs(prev => [...prev, item]); // Save job when swiped right
        console.log('Interested in:', item);
      } else {
        console.log('Not interested in:', item);
      }
    }

    position.setValue({ x: 0, y: 0 });
    setCurrentJobIndex(currentJobIndex + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  };

  const getBackgroundColor = () => {
    return position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['#ffcccc', '#ffffff', '#ccffcc'], // Red for left, White neutral, Green for right
      extrapolate: 'clamp'
    });
  };

  const renderTag = (text: string, color: string, key: string) => (
    <View key={key} style={[styles.tag, { backgroundColor: color }]}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );

  const renderCard = () => {
    if (currentJobIndex >= jobs.length) {
      return (
        <View style={styles.cardStyle}>
          <Text style={styles.noMoreJobsText}>No More Jobs!</Text>
          <Text style={styles.noMoreJobsSubText}>Check back later for new opportunities</Text>
        </View>
      );
    }

    const job = jobs[currentJobIndex];
    return (
      <Animated.View
        style={[styles.cardStyle, getCardStyle(), { backgroundColor: getBackgroundColor() }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.titleText} numberOfLines={2}>
            {job.jobTitle}
          </Text>
          <Text style={styles.companyText} numberOfLines={1}>
            {job.company} - {job.location}
          </Text>
        </View>

        {/* Circles below the title */}
        <View style={styles.tagContainer}>
          {renderTag(job.workMode, '#87CEFA', `${job.id}-workMode`)}
          {renderTag(job.employmentType, '#4169E1', `${job.id}-employmentType`)}
          {renderTag(job.pay, '#E6E6FA', `${job.id}-pay`)}
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.detailsText} numberOfLines={10}>
            {job.description}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCard()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 700, // Increased height for longer description
    backgroundColor: '#d6e6f6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardStyle: {
    width: 320, // Increased width
    aspectRatio: 0.8, // Adjusted aspect ratio for more vertical space
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginBottom: 10
  },
  titleText: {
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    color: '#333'
  },
  companyText: {
    fontSize: 18, // Slightly bigger
    color: '#666',
    marginTop: 3
  },
  cardBody: {
    flex: 1,
    gap: 12
  },
  detailsText: {
    fontSize: 16, // Bigger text
    color: '#444',
    lineHeight: 24
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centering tags under the title
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12 // Space before description
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6
  },
  tagText: {
    fontSize: 14,
    color: '#333'
  },
  noMoreJobsText: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8
  },
  noMoreJobsSubText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center'
  }
});

export default SwipeMain;

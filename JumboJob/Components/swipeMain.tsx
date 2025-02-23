import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native';

interface Job {
  id: string;
  title: string;
  details: string;
  company: string;
  location: string;
  degree: 'Bachelors' | 'Masters' | 'PhD';
  type: 'Internship' | 'Part-time' | 'Full-time';
  workLocation: 'In-person' | 'Remote' | 'Hybrid';
  experience: string;
  skills: string[];
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const SwipeMain: React.FC<{ setSavedJobs: React.Dispatch<React.SetStateAction<Job[]>> }> = ({ setSavedJobs }) => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Software Engineer',
      details: 'Looking for a passionate developer with React Native experience...',
      company: 'Tech Corp',
      location: 'Boston, MA',
      degree: 'Bachelors',
      type: 'Full-time',
      workLocation: 'Hybrid',
      experience: '2+ years',
      skills: ['React Native', 'JavaScript', 'Node.js']
    },
    {
      id: '2',
      title: 'Frontend Developer',
      details: 'Join our team building modern web applications...',
      company: 'Web Solutions Inc',
      location: 'New York, NY',
      degree: 'Bachelors',
      type: 'Internship',
      workLocation: 'Remote',
      experience: '0-1 year',
      skills: ['HTML', 'CSS', 'JavaScript', 'React']
    }
  ]);

  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const position = new Animated.ValueXY();

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
    if (currentJobIndex >= jobs.length) {
      return; // Prevent accessing undefined jobs
    }

    const item = jobs[currentJobIndex];

    if (item) {
      if (direction === 'right') {
        setSavedJobs((prev) => [...prev, item]); // Save job when swiping right
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
            {job.title}
          </Text>
          <Text style={styles.companyText} numberOfLines={1}>
            {job.company} - {job.location}
          </Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.detailsText} numberOfLines={4}>
            {job.details}
          </Text>

          <View style={styles.tagsSection}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            <View style={styles.tagContainer}>
              {renderTag(job.workLocation, '#87CEFA', `${job.id}-location`)}
              {renderTag(job.type, '#4169E1', `${job.id}-type`)}
              {renderTag(job.degree, '#E6E6FA', `${job.id}-degree`)}
            </View>
          </View>

          <View style={styles.tagsSection}>
            <Text style={styles.sectionTitle}>Experience</Text>
            <View style={styles.tagContainer}>
              {renderTag(job.experience, '#98FB98', `${job.id}-experience`)}
            </View>
          </View>

          <View style={styles.tagsSection}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.tagContainer}>
              {job.skills.map((skill, index) => (
                renderTag(skill, '#E0FFFF', `${job.id}-skill-${index}`)
              ))}
            </View>
          </View>
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
    width: 320,
    height: 590,
    backgroundColor: '#d6e6f6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardStyle: {
    width: 280,
    aspectRatio: 0.7,
    borderRadius: 20,
    padding: 15,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333'
  },
  companyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 3
  },
  cardBody: {
    flex: 1,
    gap: 12
  },
  detailsText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22
  },
  tagsSection: {
    gap: 8
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
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
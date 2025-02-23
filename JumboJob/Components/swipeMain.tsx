import React, { useState, useEffect } from 'react';
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
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const SwipeMain: React.FC = () => {
  // Sample data - will be replaced with database fetch
  const [jobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Software Engineer',
      details: 'Looking for a passionate developer with React Native experience...',
      company: 'Tech Corp',
      location: 'Boston, MA',
      degree: 'Bachelors',
      type: 'Full-time',
      workLocation: 'Hybrid'
    },
    {
      id: '2',
      title: 'Frontend Developer',
      details: 'Join our team building modern web applications...',
      company: 'Web Solutions Inc',
      location: 'New York, NY',
      degree: 'Bachelors',
      type: 'Internship',
      workLocation: 'Remote'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
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
    const item = jobs[currentIndex];
    if (item) {
      direction === 'right' ? console.log('Interested in:', item.id) 
                           : console.log('Not interested in:', item.id);
    }
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(currentIndex + 1);
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

  // Add keyboard event listener
  // useEffect(() => {
  //   const handleKeyPress = (event: KeyboardEvent) => {
  //     if (event.key === 'ArrowRight') {
  //       forceSwipe('right');
  //     } else if (event.key === 'ArrowLeft') {
  //       forceSwipe('left');
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyPress);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, [currentIndex]); // Add currentIndex as dependency

  const renderCard = () => {
    if (currentIndex >= jobs.length) {
      return (
        <View style={styles.cardStyle}>
          <Text style={styles.noMoreJobsText}>No More Jobs!</Text>
        </View>
      );
    }

    const job = jobs[currentIndex];
    return (
      <Animated.View
        style={[styles.cardStyle, getCardStyle()]}
        {...panResponder.panHandlers}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.titleText} numberOfLines={2}>{job.title}</Text>
          <Text style={styles.companyText} numberOfLines={1}>{job.company}</Text>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.propertiesContainer}>
            <View style={styles.tagRow}>
              <View style={[styles.tag, styles.inPersonTag]}>
                <Text style={styles.tagText}>{job.workLocation}</Text>
              </View>
              <View style={[styles.tag, styles.internshipTag]}>
                <Text style={styles.tagText}>{job.type}</Text>
              </View>
              <View style={[styles.tag, styles.degreeTag]}>
                <Text style={styles.tagText}>{job.degree}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.detailsText} numberOfLines={6}>{job.details}</Text>
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
    backgroundColor: "#d6e6f6",
    justifyContent: "center",
    alignItems: "center",
  },
  cardStyle: {
    width: 280,
    aspectRatio: 0.7,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  companyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 3,
  },
  cardBody: {
    flex: 1,
  },
  propertiesContainer: {
    marginVertical: 10,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  inPersonTag: {
    backgroundColor: '#E1F5FE',
  },
  internshipTag: {
    backgroundColor: '#E8F5E9',
  },
  degreeTag: {
    backgroundColor: '#F3E5F5',
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
  detailsText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginTop: 10,
  },
  noMoreJobsText: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
  }
});

export default SwipeMain;

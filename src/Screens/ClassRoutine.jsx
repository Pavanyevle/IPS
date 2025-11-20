import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const routineData = {
  Monday: [
    { id: '1', teacher: 'Aditya Kumar Gupta', subject: 'I.T.', time: '8:10AM - 8:55AM',  },
    { id: '2', teacher: 'Mr. Mahesh Pd. Singh', subject: 'Maths', time: '8:55AM - 9:35AM',  },
    { id: '3', teacher: 'Mary Priyanka', subject: 'English Language', time: '9:45AM - 10:20AM',  },
    { id: '4', teacher: 'Ajeet Kumar', subject: 'S.St (Geo.)', time: '10:20AM - 10:55AM',  },
    { id: '5', teacher: 'Mary Priyanka', subject: 'Moral', time: '11:15AM - 11:50AM', },
    { id: '6', teacher: 'Miss Sushan Lepcha', subject: 'Chemistry', time: '11:50AM - 12:25PM',  },
    { id: '7', teacher: 'Arun Kumar Poddar', subject: 'Physics', time: '12:25PM - 1:00PM',  },
  ],
  Tuesday:  [
    { id: '1', teacher: 'Aditya Kumar Gupta', subject: 'I.T.', time: '8:10AM - 8:55AM',  },
    { id: '2', teacher: 'Mr. Mahesh Pd. Singh', subject: 'Maths', time: '8:55AM - 9:35AM',  },
    { id: '3', teacher: 'Mary Priyanka', subject: 'English Language', time: '9:45AM - 10:20AM',  },
    { id: '4', teacher: 'Ajeet Kumar', subject: 'S.St (Geo.)', time: '10:20AM - 10:55AM',  },
    { id: '5', teacher: 'Mary Priyanka', subject: 'Moral', time: '11:15AM - 11:50AM', },
    { id: '6', teacher: 'Miss Sushan Lepcha', subject: 'Chemistry', time: '11:50AM - 12:25PM',  },
    { id: '7', teacher: 'Arun Kumar Poddar', subject: 'Physics', time: '12:25PM - 1:00PM',  },
  ],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

const days = Object.keys(routineData);

const ClassRoutineScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const renderCard = ({ item, index }) => (
    <View style={styles.card}>
      <LinearGradient
        colors={['#eef6f9', '#ffffff']}
        style={styles.cardInner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.leftCircle}>
          <Text style={styles.periodNum}>{index + 1}</Text>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.subjectRow}>
            <Icon name={item.icon} size={22} color="#0a9396" style={{ marginRight: 6 }} />
            <Text style={styles.subject}>{item.subject}</Text>
          </View>
          <Text style={styles.teacher}>{item.teacher}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient colors={['#0f6aa5', '#0f6aa5']} style={styles.header}>
        <StatusBar barStyle="light-content" backgroundColor="#005f73" />
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Class Routine</Text>
        </View>

        {/* SCROLLABLE DAYS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabRow}
        >
          {days.map(day => (
            <TouchableOpacity
              key={day}
              onPress={() => setSelectedDay(day)}
              style={[
                styles.tabButton,
                selectedDay === day && styles.tabButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedDay === day && styles.tabTextActive,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      {/* CLASS LIST */}
      <FlatList
        data={routineData[selectedDay]}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No classes scheduled for {selectedDay}</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  header: {
    paddingTop: 45,
    paddingHorizontal: 16,
    paddingBottom: 18,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 16,
  },
  tabRow: {
    paddingRight: 16,
    paddingLeft: 4,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  tabButtonActive: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    color: '#d9f0f7',
    fontSize: 15,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#0a9396',
    fontWeight: '700',
  },
  listContainer: {
    paddingVertical: 12,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 7,
    borderRadius: 18,
    elevation: 5,
    backgroundColor: '#fff',
  },
  cardInner: {
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftCircle: {
    backgroundColor: '#bd3888ff',
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    elevation: 3,
  },
  periodNum: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardContent: {
    flex: 1,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  subject: {
    fontSize: 17,
    fontWeight: '700',
    color: '#001219',
  },
  teacher: {
    fontSize: 15,
    color: '#495057',
  },
  time: {
    color: '#6c757d',
    fontSize: 13,
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    marginTop: 60,
    fontSize: 16,
  },
});

export default ClassRoutineScreen;

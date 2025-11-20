import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTab from './BottomTab';
import AppHeader from '../components/UI/AppHeader';

const HomeworkScreen = ({ navigation }) => {
  const homeworkData = [
    {
      date: '17 Oct, 2025',
      subject: 'Maths',
      class: 'NINE',
      teacher: 'Mr. Mahesh Pd. Singh',
      details: [
        'Create a portfolio of chapters 9, 10, 11, and 12',
        'Make 100 MCQ from circle chapter',
        'Complete fair copy up to circle chapter',
      ],
    },
    {
      date: '15 Oct, 2025',
      subject: 'Maths',
      class: 'NINE',
      teacher: 'Mr. Mahesh Pd. Singh',
      details: ['Solve all questions of exercise 9.3 with examples'],
    },
    {
      date: '14 Oct, 2025',
      subject: 'Maths',
      class: 'NINE',
      teacher: 'Mr. Mahesh Pd. Singh',
      details: ['Solve exercise no 9.3 question no 1 to 4 and examples'],
    },
    {
      date: '13 Oct, 2025',
      subject: 'Maths',
      class: 'NINE',
      teacher: 'Mr. Mahesh Pd. Singh',
      details: ['Solve these questions'],
    },
     {
      date: '13 Oct, 2025',
      subject: 'English',
      class: 'NINE',
      teacher: 'Mr. Mahesh Pd. Singh',
      details: ['Solve these questions'],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
            <AppHeader title="Homework" />


      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
        style={styles.scrollArea}>
        
        {homeworkData.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.dateText}>{item.date}</Text>
              <Text style={styles.classText}>{item.class}</Text>
            </View>

            <Text style={styles.subjectText}>Homework for | {item.subject}</Text>

            <View style={styles.divider} />

            <View style={styles.detailSection}>
              {item.details.map((line, i) => (
                <Text key={i} style={styles.detailText}>
                  • {line}
                </Text>
              ))}
            </View>

            <Text style={styles.teacherText}>{item.teacher}</Text>
          </View>
        ))}
      </ScrollView>

      {/* View All Button */}
      <TouchableOpacity style={styles.button}>
        <LinearGradient colors={['#F97316', '#FB923C']} style={styles.gradientBtn}>
          <Text style={styles.buttonText}>VIEW ALL</Text>
        </LinearGradient>
      </TouchableOpacity>
            <BottomTab navigation={navigation} />

    </View>
  );
};

export default HomeworkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
 
    elevation: 6,
    paddingTop: 50,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  scrollArea: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  dateText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  classText: {
    fontSize: 13,
    color: '#F97316',
    fontWeight: '700',
  },
  subjectText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 6,
  },
  detailSection: {
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
    lineHeight: 20,
  },
  teacherText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  gradientBtn: {
    borderRadius: 25,
    paddingHorizontal: 50,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

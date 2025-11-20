import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const syllabusData = [
  {
    subject: 'Mathematics',
    teacher: 'Mr. Mahesh Pd. Singh',
    topics: [
      'Number System',
      'Algebra — Linear Equations & Polynomials',
      'Geometry — Circles & Triangles',
      'Mensuration — Surface Area & Volume',
      'Trigonometry — Heights & Distances',
      'Statistics — Mean, Median, Mode',
    ],
  },
  {
    subject: 'English',
    teacher: 'Mary Priyanka',
    topics: [
      'Grammar — Tenses, Modals, Clauses, Voice',
      'Writing — Letter, Essay, Notice',
      'Prose — “A Letter to God”, “Nelson Mandela”',
      'Poetry — “Dust of Snow”, “Fire and Ice”',
      'Reading Comprehension — Unseen Passage',
    ],
  },
  {
    subject: 'Science',
    teacher: 'Miss Sushan Lepcha',
    topics: [
      'Physics — Motion, Force, Work & Energy',
      'Chemistry — Atoms, Molecules, Chemical Reactions',
      'Biology — Cell, Tissues, Life Processes',
      'Practical Experiments & Observation Notes',
    ],
  },
  {
    subject: 'Social Studies',
    teacher: 'Ajeet Kumar',
    topics: [
      'History — French Revolution, Nationalism in India',
      'Geography — Resources & Development',
      'Civics — Democracy & Constitution',
      'Economics — Development & Sectors of Economy',
    ],
  },
  {
    subject: 'I.T. (Information Technology)',
    teacher: 'Aditya Kumar Gupta',
    topics: [
      'Basics of Computer Hardware & Software',
      'MS Word, Excel, PowerPoint',
      'Internet Safety & Cyber Awareness',
      'HTML Basics & Introduction to Coding',
    ],
  },
];

const SyllabusScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0C5C75" barStyle="light-content" />

      {/* Header */}
      <LinearGradient colors={['#0C5C75', '#128EA1']} style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Syllabus Details</Text>
        <Icon name="book-outline" size={25} color="#fff" />
      </LinearGradient>

      {/* Scrollable Syllabus */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {syllabusData.map((item, index) => (
          <LinearGradient
            key={index}
            colors={['#E3F2FD', '#FFFFFF']}
            style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="school-outline"
                  size={22}
                  color="#0C5C75"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.subjectText}>{item.subject}</Text>
              </View>
              <Icon name="document-text-outline" size={22} color="#0C5C75" />
            </View>

            <Text style={styles.teacherText}>Teacher: {item.teacher}</Text>
            <View style={styles.divider} />

            <Text style={styles.topicTitle}>Syllabus:</Text>
            {item.topics.map((topic, i) => (
              <View key={i} style={styles.topicRow}>
                <Icon name="ellipse" size={7} color="#0C5C75" style={{ marginRight: 6 }} />
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 5,
    backgroundColor:'#0f6aa5',
    paddingTop: 70,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 25,
  },
  card: {
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  subjectText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0C5C75',
  },
  teacherText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#C8E6F5',
    marginVertical: 8,
  },
  topicTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0C5C75',
    marginBottom: 5,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  topicText: {
    fontSize: 13.5,
    color: '#555',
  },
});

export default SyllabusScreen;

import React, { useEffect, useState } from 'react';
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
import axios from 'axios';


const SyllabusScreen = ({navigation,route}) => {
  const [syllabusData, setSyllabusData] = useState([]);
  const [loading, setLoading] = useState(true);
      const Class = route.params?.class;
// ONLY ONCE DECLARE the URL
const API_URL = `https://international-public-sch-db945-default-rtdb.firebaseio.com/class/${Class}/syllabus.json`;


  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
      const res = await axios.get(API_URL);

      if (res.data) {
        const formatted = Object.values(res.data);
        setSyllabusData(formatted);
      } else {
        setSyllabusData([]);
      }
    } catch (err) {
      console.log("Syllabus Fetch Error:", err);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0C5C75" barStyle="light-content" />

      {/* Header */}
      <LinearGradient colors={['#083f66', '#083f66']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Syllabus Details</Text>
        <Icon name="book-outline" size={25} color="#fff" />
      </LinearGradient>

      {/* Loading */}
      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {syllabusData.map((item, index) => (
            <LinearGradient
              key={index}
              colors={['#E3F2FD', '#FFFFFF']}
              style={styles.card}
            >
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#083f66',
    height:120,
    paddingTop:45,
    elevation: 5,
  },
  headerText: { color: '#fff', fontSize: 25, fontWeight: '700' },
  scrollContent: { padding: 15, paddingBottom: 25 },
  card: { borderRadius: 16, padding: 15, marginBottom: 15, elevation: 4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  subjectText: { fontSize: 18, fontWeight: '700', color: '#0C5C75' },
  teacherText: { fontSize: 14, color: '#444', marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#C8E6F5', marginVertical: 8 },
  topicTitle: { fontSize: 15, fontWeight: '600', color: '#0C5C75', marginBottom: 5 },
  topicRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  topicText: { fontSize: 13.5, color: '#555' },
});

export default SyllabusScreen;

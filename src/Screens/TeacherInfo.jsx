import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TeacherInfo = () => {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#0f6aa5', '#2a99d8', '#6dd5fa']} style={styles.header}>
        <Image
          source={require('../Img/Principal.jpg')} // 📸 Teacher photo here
          style={styles.profileImage}
        />
        <Text style={styles.name}>Er. Madhumita K. Madhuwal</Text>
        <Text style={styles.designation}>Principal</Text>
        <Text style={styles.qualifications}>MCA | M.Sc (Chem) | Civil Engg. | B.Ed</Text>
      </LinearGradient>

      {/* Subjects Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subjects / Classes</Text>
        <View style={styles.chipsContainer}>
          <Text style={styles.chip}>Chemistry</Text>
          <Text style={styles.chip}>Computer Science</Text>
          <Text style={styles.chip}>Environmental Studies</Text>
        </View>
      </View>

      {/* Bio Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>
          A passionate educator with over 10 years of experience fostering academic excellence.
          Dedicated to developing young minds and promoting creativity through innovative learning methods.
        </Text>
      </View>

      {/* Achievements Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.badge}>
            <MaterialCommunityIcons name="trophy" size={28} color="#ffb300" />
            <Text style={styles.badgeText}>Best Educator 2023</Text>
          </View>
          <View style={styles.badge}>
            <MaterialCommunityIcons name="star-circle" size={28} color="#42a5f5" />
            <Text style={styles.badgeText}>Innovative Teaching Award</Text>
          </View>
          <View style={styles.badge}>
            <MaterialCommunityIcons name="school" size={28} color="#66bb6a" />
            <Text style={styles.badgeText}>10+ Years Experience</Text>
          </View>
        </ScrollView>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <View style={styles.contactRow}>
          <MaterialCommunityIcons name="email-outline" size={22} color="#0f6aa5" />
          <Text style={styles.contactText}>principal@ips.edu.in</Text>
        </View>
        <View style={styles.contactRow}>
          <MaterialCommunityIcons name="phone-outline" size={22} color="#0f6aa5" />
          <Text style={styles.contactText}>+91 98765 43210</Text>
        </View>
      </View>

      {/* Feedback / Review Section */}
      <View style={[styles.section, { marginBottom: 40 }]}>
        <Text style={styles.sectionTitle}>Student Feedback</Text>
        <View style={styles.reviewCard}>
          <Text style={styles.reviewText}>
            “Ma’am always encourages us to think differently and explore new ideas. Her classes are the best!”
          </Text>
          <Text style={styles.reviewName}>— Class 10 Student</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fbff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  designation: {
    fontSize: 16,
    color: '#e0f7ff',
  },
  qualifications: {
    fontSize: 13,
    color: '#d9f3ff',
    marginTop: 3,
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f6aa5',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: '#d9f3ff',
    color: '#0f6aa5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    fontSize: 13,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom:10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    elevation: 3,
    width: 160,
  },
  badgeText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
    color: '#333',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  contactText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },
  reviewText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#444',
  },
  reviewName: {
    fontSize: 12,
    textAlign: 'right',
    color: '#0f6aa5',
    marginTop: 5,
  },
});

export default TeacherInfo;

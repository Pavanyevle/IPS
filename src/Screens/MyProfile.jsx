import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const StudentProfileScreen = ({ navigation }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      setLoading(true);

      // 1️⃣ Get userData from AsyncStorage
      const storedUser = await AsyncStorage.getItem("userData");

      if (!storedUser) {
        console.log("No user data found");
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      const email = parsedUser.email;

      // 2️⃣ Firebase doesn't allow '.' in keys → convert email
      const studentKey = email.replace(/\./g, "_");

      // 3️⃣ Fetch student data from Firebase
      const res = await axios.get(
        `https://international-public-sch-db945-default-rtdb.firebaseio.com/students/${studentKey}.json`
      );

      setStudent(res.data);
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0b5f95" />
      </View>
    );
  }

  if (!student) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 18 }}>
          Unable to load profile!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b5f95" />

      {/* HEADER */}
      <LinearGradient colors={["#0f6aa5", "#0b5f95"]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 26 }} />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PROFILE SECTION */}
        <View style={styles.profileSection}>
          {student?.profileImg ? (
            <Image source={{ uri: student.profileImg }} style={styles.profileImage} />
          ) : (
            <MaterialCommunityIcons name="account-circle" size={150} color="#888" />
          )}

          <Text style={styles.name}>{student.name}</Text>
        </View>

        {/* INFO CARDS */}
        <View style={styles.card}>
          <Feather name="user" size={20} color="#0f6aa5" />
          <View style={styles.cardText}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{student.name}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Feather name="phone" size={20} color="#0f6aa5" />
          <View style={styles.cardText}>
            <Text style={styles.label}>Contact Number</Text>
            <Text style={styles.value}>{student.contact}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <AntDesign name="mail" size={20} color="#0f6aa5" />
          <View style={styles.cardText}>
            <Text style={styles.label}>Email Address</Text>
            <Text style={styles.value}>{student.email}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons name="gender-male-female" size={20} color="#0f6aa5" />
          <View style={styles.cardText}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>{student.gender}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <AntDesign name="calendar" size={20} color="#0f6aa5" />
          <View style={styles.cardText}>
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.value}>{student.dob}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Feather name="map-pin" size={20} color="#0f6aa5" />
          <View style={styles.cardText}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{student.address}</Text>
          </View>
        </View>





      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentProfileScreen;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7faff',

  },
  header: {
    height: 100,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 15,
    elevation: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  backBtn: {
    padding: 6,
  },

  profileSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  imageWrapper: {
    height: 150,
    width: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0b5f95',
    marginTop: 15,
  },
  role: {
    fontSize: 16,
    color: '#666',
  },
  bio: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
    marginHorizontal: 40,
    textAlign: 'center',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    marginHorizontal: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 25,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
  },
  statNumber: {
    fontSize: 20,
    color: '#0f6aa5',
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    elevation: 3,
  },
  cardText: {
    flex: 1,
    marginLeft: 15,
  },
  label: {
    fontSize: 14,
    color: '#777',
    fontWeight: '600',
  },
  value: {
    fontSize: 17,
    color: '#222',
    fontWeight: '500',
    marginTop: 4,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 20,
  },

  btnWrapper: {
    marginTop: 40,
    marginBottom: 60,
    marginHorizontal: 20,
  },
  btnGradient: {
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 8,
  },
});

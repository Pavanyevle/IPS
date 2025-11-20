import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, Image, StatusBar, StyleSheet, Dimensions, FlatList, TouchableOpacity, ScrollView, Modal } from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme';
import AppHeader from '../components/UI/AppHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

// 🔹 Helper component to handle multiple icon libraries
const AppIcon = ({ name, size, color, lib }) => {
  switch (lib) {
    case 'fa':
      return <FontAwesome5 name={name} size={size} color={color} />;
    case 'mci':
    default:
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
  }
};


// 🔹 Shortcut icons (top 3)
const shortcuts = [
  { key: 'attendance', label: 'Attendance', icon: 'clock-outline', lib: 'mci' },
  { key: 'accounts', label: 'Accounts', icon: 'file-document-outline', lib: 'mci' },
  { key: 'routine', label: 'Class Routine', icon: 'calendar-clock', lib: 'mci' },
];

// 🔹 Grid tiles (main section)
const tiles = [
  { key: 'teachers', label: 'Subject Teachers ', icon: 'chalkboard-teacher', lib: 'fa' },
  { key: 'syllabus', label: 'Syllabus ', icon: 'book-open-variant', lib: 'mci' },
  { key: 'events', label: 'Important Events ', icon: 'book-open', lib: 'mci' },
  // { key: 'material', label: 'Study Material', icon: 'file-document', lib: 'mci' },
  // { key: 'lesson', label: 'Lesson Plan', icon: 'file-chart', lib: 'mci' },
  // { key: 'examSyllabus', label: 'Exam Syllabus', icon: 'account-tie', lib: 'mci' },
  { key: 'examReport', label: 'Exam Report ', icon: 'file-chart-outline', lib: 'mci' },
  { key: 'payments', label: 'Payment History ', icon: 'currency-inr', lib: 'mci' },
  { key: 'help', label: 'Help & Support ', icon: 'help-circle-outline', lib: 'mci' },

];

const Home = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchStudentData();
}, []);
const getUserEmail = async () => {
  try {
    const storedUser = await AsyncStorage.getItem("userData");

    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser.email;  // <-- Here is your email
    }

    return null;

  } catch (error) {
    console.log("Error reading userData:", error);
    return null;
  }
};

const fetchStudentData = async () => {
  try {
    setLoading(true);

    // 1️⃣ Get email from AsyncStorage
    const email = await getUserEmail();

    if (!email) {
      console.log("No email found in userData");
      setLoading(false);
      return;
    }

    // 2️⃣ Firebase key format replace '.' with '_'
    const studentKey = email.replace(/\./g, "_");

    // 3️⃣ Fetch student data
    const response = await axios.get(
      `https://international-public-sch-db945-default-rtdb.firebaseio.com/students/${studentKey}.json`
    );

    setStudent(response.data);
    setLoading(false);

  } catch (error) {
    console.log("Error fetching student:", error);
    setLoading(false);
  }
};



  const renderShortcut = ({ item }) => (
    <TouchableOpacity
      style={styles.shortcutItem}
      onPress={() => {
        if (item.key === 'routine') {
          navigation.navigate('ClassRoutine');
        }
      }}
    >
      <LinearGradient
        colors={['#FF8A00', '#FF6A00']}
        style={styles.shortcutCircle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <AppIcon name={item.icon} size={28} color="#fff" lib={item.lib} />
      </LinearGradient>
      <Text style={styles.shortcutLabel}>{item.label}</Text>
    </TouchableOpacity>
  );


  const renderTile = ({ item }) => (
    <TouchableOpacity
      style={styles.tile}
      onPress={() => {
        switch (item.key) {
          case 'teachers':
            navigation.navigate('SubjectList'); // 🔹 Subject List
            break;
          case 'syllabus':
            navigation.navigate('Syllabus');
            break;
          case 'events':
            navigation.navigate('Events');
            break;
          // case 'material':
          //   navigation.navigate('StudyMaterial');
          //   break;
          // case 'lesson':
          //   navigation.navigate('LessonPlan');
          //   break;
          // case 'examSyllabus':
          //   navigation.navigate('ExamSyllabus');
          //   break;
          case 'examReport':
            navigation.navigate('ExamReport');
            break;
          case 'payments':
            navigation.navigate('PaymentHistory');
            break;
          case 'help':
            navigation.navigate('HelpAndSupport');
            break;

          default:
            console.warn('No navigation defined for:', item.key);
        }
      }}
    >
      <View style={styles.tileIconWrap}>
        <AppIcon name={item.icon} size={22} color="#1f6aa5" lib={item.lib} />
      </View>
      <Text style={styles.tileLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  if (loading) {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0f6aa5" />
      <ActivityIndicator size="large" color="#0f6aa5" />
    </SafeAreaView>
  );
}


  return (
    <SafeAreaView style={styles.container}>
      
      <StatusBar barStyle="light-content" backgroundColor="#0f6aa5" />

      {/* Header */}
      <AppHeader title="International Public School" onMenuPress={() => setMenuVisible(true)} />

      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        

        {/* Profile card */}
        <View style={styles.profileCardWrap} onPress={() => navigation.navigate('MyProfile')}>
          <LinearGradient colors={['#7c23c5ff', '#9723c5ff']} style={styles.profileCard}>
            <TouchableOpacity
              style={styles.profileLeft}
              onPress={() => navigation.navigate('MyProfile')}
            >
              <View style={styles.avatar}>
                {student?.profileImg ? (
                  <Image
                    source={{ uri: student.profileImg }}
                    style={{ width: 64, height: 64, borderRadius: 32 }}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="account-circle"
                    size={64}
                    color="#888"
                  />
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.profileRight}>
              <Text style={styles.studentName}>
                {student ? `${student.name} (${student.class}th)` : "Loading..."}
              </Text>

              <Text style={styles.parentText}>
                Father : {student ? student.fatherName : ""}
              </Text>

              <Text style={styles.parentText}>
                Mother : {student ? student.motherName : ""}
              </Text>

            </View>
          </LinearGradient>
        </View>

        {/* Shortcuts (Manual) */}
        <View style={styles.shortcutsRow}>
          <TouchableOpacity
            style={styles.shortcutItem}
            onPress={() => navigation.navigate('Attendance')}
          >
            <LinearGradient
              colors={['#1f6aa5', '#1f6aa5']}
              style={styles.shortcutCircle}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialCommunityIcons name="clock-outline" size={28} color="#ffff" />
            </LinearGradient>
            <Text style={styles.shortcutLabel}>Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shortcutItem}
            onPress={() => navigation.navigate('Account')}
          >
            <LinearGradient
              colors={['#1f6aa5', '#1f6aa5']}
              style={styles.shortcutCircle}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialCommunityIcons name="file-document-outline" size={28} color="#fff" />
            </LinearGradient>
            <Text style={styles.shortcutLabel}>Accounts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shortcutItem}
            onPress={() => navigation.navigate('ClassRoutine')}
          >
            <LinearGradient
              colors={['#1f6aa5', '#1f6aa5']}
              style={styles.shortcutCircle}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialCommunityIcons name="calendar-clock" size={28} color="#fff" />
            </LinearGradient>
            <Text style={styles.shortcutLabel}>Class Routine</Text>
          </TouchableOpacity>
        </View>


        {/* Grid tiles */}
        <View style={styles.gridWrap}>
          <FlatList
            data={tiles}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            keyExtractor={(i) => i.key}
            renderItem={renderTile}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>


      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={['#0f6aa5', '#2a99d8', '#6dd5fa']}
              style={styles.modalBox}
            >
              {/* School Logo */}
              <View style={styles.logoWrap}>
                <View style={styles.logoCircle}>
                  <MaterialCommunityIcons name="school" size={42} color="#fff" />
                </View>
              </View>

              {/* School Name */}
              <Text style={styles.schoolName}>International Public School</Text>
              <View style={styles.separator} />

              {/* Menu Items */}
              {[
                { label: 'My Profile', icon: 'account-circle-outline', screen: 'MyProfile' },
                { label: 'About Us', icon: 'information-outline', screen: 'AboutUs' },
                { label: 'Help & Support', icon: 'headset', screen: 'HelpAndSupport' },
                { label: 'Developed & Designed By', icon: 'code-tags', screen: 'Developer' },
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalItem}
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate(item.screen);
                  }}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                  <MaterialCommunityIcons name={item.icon} size={22} color="#0f6aa5" />
                </TouchableOpacity>
              ))}

              <View style={styles.separator} />

              {/* Logout */}
              <TouchableOpacity
                style={[styles.modalItem, { justifyContent: 'space-between' }]}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Login');
                }}
              >
                <Text style={[styles.modalItemText, { color: 'red' }]}>Logout</Text>
                <MaterialCommunityIcons name="logout" size={22} color="red" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </Modal>




      {/* Bottom nav */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomTab} onPress={() => navigation.navigate('MyProfile')}>
          <MaterialCommunityIcons name="account-group" size={20} color="#fff" />
          <Text style={styles.bottomLabel}>User </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={() => navigation.navigate('HomeWork')}>
          <MaterialCommunityIcons name="notebook" size={20} color="#fff" />
          <Text style={styles.bottomLabel}>Homework </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={() => navigation.navigate('Notice')}>
          <MaterialCommunityIcons name="bell" size={20} color="#fff" />
          <Text style={styles.bottomLabel}>Notice </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const CARD_PADDING = 14;
const TILE_SIZE = (width - 48) / 3;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f8' },
  header: {},
  headerTitle: {},

  profileCardWrap: { paddingHorizontal: 12, marginTop: 12 },
  profileCard: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: CARD_PADDING,
    alignItems: 'center',
    elevation: 3,
  },
  profileLeft: { width: 64, alignItems: 'center' },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileRight: { flex: 1, paddingLeft: 12 },
  studentName: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 6 },
  parentText: { color: '#fff', fontSize: 12 },

  shortcutsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  shortcutItem: {
    alignItems: 'center',
  },
  shortcutCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',

  },
  shortcutLabel: {
    marginTop: 8,
    color: '#01070bff',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },

  gridWrap: { marginTop: 12, paddingHorizontal: 12, paddingBottom: 16 },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE * 0.95,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    elevation: 1,
  },
  tileIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: '#eef7fc',
  },
  tileLabel: { textAlign: 'center', fontSize: 12, color: '#213547' },

  bottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 12,
    right: 12,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#0f6aa5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 6,
  },
  bottomTab: { alignItems: 'center' },
  bottomLabel: { color: '#fff', fontSize: 12, marginTop: 2 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },

  modalContainer: {
    width: '80%',
    height: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },

  modalBox: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    height: '100%',

    backgroundColor: 'rgba(255,255,255,0.9)',
  },

  logoWrap: {
    alignItems: 'center',
    marginBottom: 8,
  },

  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 5,
  },

  schoolName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },

  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginVertical: 8,
  },

  modalItem: {
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  modalItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f6aa5',
  },


});

export default Home;

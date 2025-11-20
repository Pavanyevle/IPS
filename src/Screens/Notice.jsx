import React,{ useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomTab from './BottomTab';
import AppHeader from '../components/UI/AppHeader';

const NoticeScreen = ({ navigation }) => {
    const [menuVisible, setMenuVisible] = useState(false);
  
  const notices = [
    {
      date: '17 Oct, 2025 08:21 AM',
      type: 'All',
      title: 'Notice',
      message: `Dear Parents and Students,
• There will be PTM and result distribution on 18/10/2025 (8am-11am). 
• Holiday on Diwali and Chhath: 20/10/2025 to 29/10/2025.
• Classes resume from 30/10/2025 (same timing).`,
      messageHindi: `प्रिय अभिभावकों और छात्राओं,
• 18/10/2025 को पी.टी.एम. और रिपोर्ट कार्ड वितरण होगा।
• दीवाली और छठ पूजा के अवसर पर 20/10/2025 से 29/10/2025 तक अवकाश रहेगा।
• कक्षाएँ 30/10/2025 से पुनः प्रारंभ होंगी।`,
      downloadable: true,
    },
    {
      date: '14 Oct, 2025 09:59 AM',
      type: 'All',
      title: 'Notice',
      message: `प्रिय अभिभावकों और विद्यार्थियों, सूचित किया जाता है कि टाई आ गया है, आप fee office से ले सकते हैं।`,
      downloadable: false,
    },
  ];

  return (
    <View style={styles.container}>
      <AppHeader title="Notice" onMenuPress={() => setMenuVisible(true)} />


      {/* SCROLL AREA */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={styles.scrollArea}>
        {notices.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.type}>{item.type}</Text>
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
            {item.messageHindi && (
              <Text style={styles.messageHindi}>{item.messageHindi}</Text>
            )}

            {item.downloadable && (
              <TouchableOpacity style={styles.downloadBtn}>
                <MaterialCommunityIcons
                  name="download-outline"
                  size={18}
                  color="#004D60"
                />
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {/* VIEW ALL BUTTON */}
      <TouchableOpacity style={styles.viewAllBtn}>
        <LinearGradient colors={['#F97316', '#FB923C']} style={styles.gradientBtn}>
          <Text style={styles.viewAllText}>VIEW ALL</Text>
        </LinearGradient>
      </TouchableOpacity>
            <BottomTab navigation={navigation} />

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
    </View>
  );
};

export default NoticeScreen;

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
  date: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  type: {
    fontSize: 13,
    color: '#F97316',
    fontWeight: '700',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
    lineHeight: 20,
  },
  messageHindi: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  downloadText: {
    color: '#004D60',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  viewAllBtn: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  gradientBtn: {
    borderRadius: 25,
    paddingHorizontal: 50,
    paddingVertical: 12,
  },
  viewAllText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
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

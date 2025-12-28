import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* ================= SAFE LOCAL QR LOAD ================= */
let LOCAL_QR = null;
try {
  LOCAL_QR = require('../Img/payment.jpeg'); // ✅ path correct as per you
} catch (e) {
  LOCAL_QR = null; // ❌ image missing -> no crash
}
/* ===================================================== */

const PaymentManagementScreen = ({ navigation }) => {
  const [student, setStudent] = useState(null);
  const [fees, setFees] = useState({ total: 0, paid: 0 });
  const [loading, setLoading] = useState(true);

  const [showQR, setShowQR] = useState(false);
  const [qrImage] = useState(LOCAL_QR);

  const due = fees.total - fees.paid;
  const progress = fees.total > 0 ? fees.paid / fees.total : 0;

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setLoading(true);
    const email = await getUserEmail();
    if (!email) {
      setLoading(false);
      return;
    }
    const studentKey = email.replace(/\./g, "_");
    await fetchStudentData(studentKey);
    setLoading(false);
  };

  const getUserEmail = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        return parsed.email;
      }
      return null;
    } catch {
      return null;
    }
  };

  const fetchStudentData = async (studentKey) => {
    try {
      const res = await axios.get(
        `https://international-public-sch-db945-default-rtdb.firebaseio.com/students/${studentKey}.json`
      );
      if (!res.data) {
        Alert.alert('Student not found');
        return;
      }
      setStudent(res.data);
      setFees(res.data.fees || { total: 0, paid: 0 });
    } catch {
      Alert.alert('Network error');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0078d7" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0057a0" />

      {/* HEADER */}
      <LinearGradient colors={['#083f66', '#083f66']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Management</Text>
        <FontAwesome5 name="wallet" size={22} color="#fff" />
      </LinearGradient>

      <ScrollView>
        {/* STUDENT CARD */}
        <View style={styles.profileCard}>
          {student?.profileImg ? (
            <Image source={{ uri: student.profileImg }} style={styles.profileImage} />
          ) : (
            <MaterialCommunityIcons name="account-circle" size={70} color="#888" />
          )}
          <View>
            <Text style={styles.userName}>{student.name}</Text>
            <Text style={styles.userId}>ID : {student.studentId}</Text>
          </View>
        </View>

        {/* SUMMARY */}
        <LinearGradient colors={['#c2e9fb', '#a1c4fd']} style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text>Total</Text>
              <Text style={styles.bold}>₹ {fees.total}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text>Paid</Text>
              <Text style={[styles.bold, { color: 'green' }]}>₹ {fees.paid}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text>Due</Text>
              <Text style={[styles.bold, { color: 'red' }]}>₹ {due}</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {(progress * 100).toFixed(0)}% Paid
          </Text>
        </LinearGradient>

        {/* PAY CARD */}
        <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.payCard}>
          <View>
            <Text style={styles.payTitle}>Remaining Fees</Text>
            <Text style={styles.payAmount}>₹ {due}</Text>
          </View>

          <TouchableOpacity onPress={() => setShowQR(!showQR)}>
            <LinearGradient colors={['#38ef7d', '#11998e']} style={styles.payBtn}>
              <Ionicons name="qr-code-outline" size={20} color="#fff" />
              <Text style={styles.payBtnText}>Pay Online</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* QR SECTION (SAFE) */}
        {showQR && (
          <View style={styles.qrContainer}>
            <Text style={styles.qrTitle}>Scan & Pay</Text>

            {qrImage ? (
              <Image source={require('../Img/payment.jpeg')} style={styles.qrImage} />
            ) : (
              <View style={styles.qrFallback}>
                <Ionicons name="image-outline" size={50} color="#999" />
                <Text style={styles.qrFallbackText}>
                  QR Image Not Available
                </Text>
              </View>
            )}

            <View style={styles.localTag}>
              <Ionicons name="lock-closed-outline" size={18} color="#0078d7" />
              <Text style={styles.localText}>Offline Safe</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentManagementScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7faff' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    height:120,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  headerTitle: { color: '#fff',     fontSize:25,
 fontWeight: '700' },

  profileCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  profileImage: { width: 70, height: 70, borderRadius: 35, marginRight: 15 },
  userName: { fontSize: 18, fontWeight: '700', color: '#0b5f95' },
  userId: { fontSize: 14, color: '#666' },

  summaryCard: { margin: 20, borderRadius: 16, padding: 20, elevation: 5 },
  summaryTitle: { fontSize: 18, fontWeight: '700' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryItem: { alignItems: 'center' },
  bold: { fontSize: 18, fontWeight: '700' },

  progressContainer: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginTop: 15,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#0078d7' },
  progressText: { textAlign: 'right', marginTop: 5 },

  payCard: {
    margin: 20,
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payTitle: { color: '#fff' },
  payAmount: { color: '#fff', fontSize: 26, fontWeight: '800' },

  payBtn: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  payBtnText: { color: '#fff', marginLeft: 6, fontWeight: '700' },

  qrContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 5,
  },
  qrTitle: { fontSize: 18, fontWeight: '700' },
  qrImage: { width: 220, height: 220, marginVertical: 10 },

  qrFallback: {
    width: 220,
    height: 220,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  qrFallbackText: {
    marginTop: 6,
    color: '#777',
    fontWeight: '600',
  },

  localTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  localText: {
    marginLeft: 6,
    color: '#0078d7',
    fontWeight: '600',
  },
});

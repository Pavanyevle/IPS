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
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PaymentManagementScreen = ({ navigation, route }) => {

  const studentID = 9144612496;
  
  const [student, setStudent] = useState(null);
  const [fees, setFees] = useState(null);
  const due = fees ? fees.total - fees.paid : 0;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchAllData();
  }, []);


  const fetchAllData = async () => {
    try {
      const res = await axios.get(
        `https://international-public-sch-db945-default-rtdb.firebaseio.com/students/${studentID}.json`
      );

      console.log("FULL STUDENT DATA:", res.data);

      const data = res.data;

      if (!data) {
        alert("Student not found!");
        setLoading(false);
        return;
      }

      setStudent(data);

      // Fees nested under student
      setFees(data.fees || { total: 0, paid: 0, due: 0 });

      // Transactions inside fees → transactions
      setTransactions(
        data.fees?.transactions
          ? Object.values(data.fees.transactions)
          : []
      );

      setLoading(false);

    } catch (error) {
      console.log("API Error", error);
      alert("Network error!");
      setLoading(false);
    }
  };




  if (loading || !student || !fees) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0078d7" />
      </View>
    );
  }

  const progress = fees.paid / fees.total;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0057a0" />

      {/* Header */}
      <LinearGradient colors={['#0078d7', '#004c91']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Management</Text>
        <FontAwesome5 name="wallet" size={22} color="#fff" />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Student Info */}
        <View style={styles.profileCard}>
          {student?.profileImg ? (
            <Image source={{ uri: student.profileImg }} style={styles.profileImage} />
          ) : (
            <MaterialCommunityIcons name="account-circle" size={75} color="#888" />
          )}          <View>
            <Text style={styles.userName}>{student.name}</Text>
            <Text style={styles.userId}>Student ID: {student.studentId}</Text>
          </View>
        </View>

        {/* Payment Summary */}
        <LinearGradient colors={['#c2e9fb', '#a1c4fd']} style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Fees</Text>
              <Text style={styles.summaryValue}>₹ {fees.total}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Paid</Text>
              <Text style={[styles.summaryValue, { color: '#2b9348' }]}>
                ₹ {fees.paid}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: '#c1121f' }]}>
                Due
              </Text>
              <Text style={[styles.summaryValue, { color: '#c1121f' }]}>
                ₹ {due}
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={{ marginTop: 15 }}>
            <View style={styles.progressContainer}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {(progress * 100).toFixed(0)}% Paid
            </Text>
          </View>
        </LinearGradient>

        {/* Transactions */}
        <View style={styles.transactionSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          {transactions.map((txn) => (
            <View
              key={txn.id}
              style={[
                styles.transactionCard,
                { borderLeftColor: '#2b9348' },
              ]}>
              <View>
                <Text style={styles.txnDate}>{txn.date}</Text>
                <Text style={styles.txnAmount}>₹ {txn.amount}</Text>
              </View>
              <View style={styles.txnStatus}>


              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentManagementScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7faff',
  },
  header: {
    height: 90,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0b5f95',
  },
  userId: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  summaryCard: {
    marginTop: 25,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003566',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#444',
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003566',
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0078d7',
    borderRadius: 10,
  },
  progressText: {
    textAlign: 'right',
    fontSize: 13,
    color: '#333',
    marginTop: 5,
  },
  transactionSection: {
    marginTop: 25,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003566',
    marginBottom: 12,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    elevation: 3,
  },
  txnDate: {
    color: '#333',
    fontSize: 14,
  },
  txnAmount: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 5,
    color: '#000',
  },
  txnStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payButton: {
    marginTop: 30,
    marginBottom: 60,
    marginHorizontal: 20,
  },
  gradientButton: {
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 8,
  },
});

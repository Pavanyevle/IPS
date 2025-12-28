import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  ActivityIndicator,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";


const leaveTypes = ["Sick", "Casual", "Personal", "Emergency"];

const StudentLeaveScreen = ({ navigation, route }) => {
  const { student } = route.params || {};

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [leaveType, setLeaveType] = useState("Sick");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [reason, setReason] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentMobile, setParentMobile] = useState("");
  const [loading, setLoading] = useState(false);


  const duration =
    toDate >= fromDate
      ? Math.floor(
        (toDate.getTime() - fromDate.getTime()) /
        (1000 * 60 * 60 * 24)
      ) + 1
      : 0;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      Alert.alert("Validation", "Please enter leave reason");
      return;
    }

    if (duration <= 0) {
      Alert.alert("Validation", "Invalid date range");
      return;
    }

    const leaveData = {
      studentId: student?.id,
      name: student?.name,
      class: student?.className || student?.class,
      rollNo: student?.rollNo,
      leaveType,
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
      totalDays: duration,
      reason,
      parentName,
      parentMobile,
      status: "Pending",
      appliedAt: new Date().toISOString(),
    };

    try {
      setLoading(true); // 🔥 START LOADER

      const FIREBASE_URL =
        `https://international-public-sch-db945-default-rtdb.firebaseio.com/students/${student?.contact}/leave.json`;

      await axios.post(FIREBASE_URL, leaveData);

      Alert.alert("Success", "Leave Applied Successfully");
      navigation.goBack();

    } catch (error) {
      console.log("Leave Submit Error:", error);
      Alert.alert("Error", "Something went wrong. Try again.");
    } finally {
      setLoading(false); // 🔥 STOP LOADER
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <LinearGradient
          colors={["#083f66", "#083f66", ]}
          style={styles.header}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 20, top: 45 }}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerContent}>

            <Text style={styles.headerTitle}>Apply for Leave</Text>
          </View>
        </LinearGradient>

        <Animated.View style={{ opacity: fadeAnim }}>
          {/* STUDENT DETAILS */}
          <View style={styles.card}>
            <View style={styles.row}>
              <Ionicons name="person-circle" size={26} color="#4f46e5" />
              <Text style={styles.cardTitle}>Student Details</Text>
            </View>

            <Text style={styles.detail}>Name: {student?.name}</Text>
            <Text style={styles.detail}>
              Class: {student?.className || student?.class}
            </Text>
            <Text style={styles.detail}>Roll No: {student?.rollNo}</Text>
          </View>

          {/* LEAVE TYPE */}
          <View style={styles.card}>
            <Text style={styles.label}>Leave Type</Text>
            <View style={styles.chipsRow}>
              {leaveTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.chip,
                    leaveType === type && styles.chipActive,
                  ]}
                  onPress={() => setLeaveType(type)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      leaveType === type && styles.chipTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* DATES */}
          <View style={styles.card}>
            <Text style={styles.label}>Leave Duration</Text>

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowFrom(true)}
            >
              <Ionicons name="calendar" size={20} />
              <Text style={styles.dateText}>
                From: {fromDate.toDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowTo(true)}
            >
              <Ionicons name="calendar" size={20} />
              <Text style={styles.dateText}>
                To: {toDate.toDateString()}
              </Text>
            </TouchableOpacity>

            <Text style={styles.duration}>Total Days: {duration}</Text>
          </View>

          {/* REASON */}
          <View style={styles.card}>
            <Text style={styles.label}>Reason</Text>
            <TextInput
              style={styles.textArea}
              multiline
              maxLength={250}
              placeholder="Describe reason..."
              value={reason}
              onChangeText={setReason}
            />
            <Text style={styles.charCount}>{reason.length}/250</Text>
          </View>

          {/* PARENT */}
          <View style={styles.card}>
            <Text style={styles.label}>Parent / Guardian (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Parent Name"
              value={parentName}
              onChangeText={setParentName}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              value={parentMobile}
              onChangeText={setParentMobile}
            />
          </View>

          {/* ACTIONS */}
          <LinearGradient
            colors={["#22c55e", "#14b8a6"]}
            style={styles.submitBtn}
          >
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              style={{ alignItems: "center" }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.submitText}>Submit Leave</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>


          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {showFrom && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          onChange={(e, d) => {
            setShowFrom(false);
            if (d) setFromDate(d);
          }}
        />
      )}

      {showTo && (
        <DateTimePicker
          value={toDate}
          mode="date"
          onChange={(e, d) => {
            setShowTo(false);
            if (d) setToDate(d);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default StudentLeaveScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fb" },
  header: {
    padding: 20,
    paddingTop:25,
  height:120,
  },
  headerContent: {
    alignItems: "center",
    marginTop: 10,
  },
  avatar: { width: 70, height: 70, marginBottom: 10 },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  cardTitle: { marginLeft: 8, fontWeight: "600", fontSize: 16 },
  detail: { color: "#555", marginVertical: 2 },
  label: { fontWeight: "600", marginBottom: 8 },
  chipsRow: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#eef2ff",
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: "#4f46e5" },
  chipText: { color: "#4f46e5" },
  chipTextActive: { color: "#fff" },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 10,
  },
  dateText: { marginLeft: 8 },
  duration: { textAlign: "right", color: "#14b8a6" },
  textArea: {
    height: 90,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 10,
    textAlignVertical: "top",
  },
  charCount: { textAlign: "right", fontSize: 12, color: "#999" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  submitBtn: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  cancelBtn: { alignItems: "center", marginVertical: 14 },
  cancelText: { color: "#ef4444", fontWeight: "600" },
});

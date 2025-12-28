import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";


const ClassRoutineScreen = ({ navigation ,route}) => {
  const [routineData, setRoutineData] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [loading, setLoading] = useState(true);
  const Class = route.params?.class;
const API_URL =
  `https://international-public-sch-db945-default-rtdb.firebaseio.com/class/${Class}/routine.json`;

  // 🔹 Fetch Routine
  const fetchRoutine = async () => {
    try {
      const res = await axios.get(API_URL);

      if (res.data) {
        setRoutineData(res.data);
        const firstDay = Object.keys(res.data)[0];
        setSelectedDay(firstDay);
      } else {
        setRoutineData({});
      }
    } catch (error) {
      console.log("Routine Fetch Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoutine();
  }, []);

  const days = Object.keys(routineData || {});

  // 🔹 Sort Periods
  const getSortedPeriods = () => {
    if (!routineData[selectedDay]) return [];

    return Object.keys(routineData[selectedDay])
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => routineData[selectedDay][key])
      .filter((item) => item && item.subject);
  };

  // 🔹 Table Row
  const renderRow = ({ item, index }) => {
    if (!item) return null;

    return (
      <View style={styles.tableRow}>
        <Text style={[styles.cell, { flex: 0.8 }]}>
          {index + 1}
        </Text>

        <Text style={[styles.cell, styles.subjectCell, { flex: 2 }]}>
          {item.subject}
        </Text>

        <Text style={[styles.cell, { flex: 1.6 }]}>
          {item.teacher}
        </Text>

        <Text style={[styles.cell, styles.timeCell, { flex: 1.2 }]}>
          {item.time}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 🔹 HEADER */}
      <LinearGradient colors={["#083f66", "#083f66"]} style={styles.header}>
        <StatusBar barStyle="light-content" backgroundColor="#083f66" />

        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Class Routine</Text>
        </View>

        {/* 🔹 DAY TABS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabRow}
        >
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => setSelectedDay(day)}
              style={[
                styles.tabButton,
                selectedDay === day && styles.tabButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedDay === day && styles.tabTextActive,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      {/* 🔹 TABLE */}
      {loading ? (
        <Text style={styles.emptyText}>Loading...</Text>
      ) : (
        <FlatList
          data={getSortedPeriods()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderRow}
          ListHeaderComponent={
            <View style={styles.tableHeader}>
              <Text style={[styles.cell, styles.headerCell, { flex: 0.8 }]}>
                Period
              </Text>
              <Text style={[styles.cell, styles.headerCell, { flex: 2 }]}>
                Subject
              </Text>
              <Text style={[styles.cell, styles.headerCell, { flex: 1.6 }]}>
                Teacher
              </Text>
              <Text style={[styles.cell, styles.headerCell, { flex: 1.2 }]}>
                Time
              </Text>
            </View>
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No classes scheduled for {selectedDay}
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
};

export default ClassRoutineScreen;

/* 🔹 STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8fa",
  },

  /* HEADER */
  header: {
    paddingTop: 45,
    paddingHorizontal: 16,
    paddingBottom: 16,
   
    elevation: 6,
        height:140,

  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 16,
  },

  /* TABS */
  tabRow: {
    paddingRight: 16,
    paddingLeft: 4,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  tabButtonActive: {
    backgroundColor: "#ffffff",
  },
  tabText: {
    color: "#d9f0f7",
    fontSize: 15,
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#0a9396",
    fontWeight: "700",
  },

  /* TABLE */
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#0f6aa5",
    marginHorizontal: 12,
    marginTop: 14,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  cell: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    fontSize: 14,
    color: "#111827",
    textAlign: "center",
  },
  headerCell: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  subjectCell: {
    fontWeight: "600",
    color: "#001219",
  },
  timeCell: {
    color: "#0a9396",
    fontWeight: "600",
  },

  emptyText: {
    textAlign: "center",
    color: "#6c757d",
    marginTop: 60,
    fontSize: 16,
  },
});

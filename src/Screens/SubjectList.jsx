import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const teachers = [
  {
    id: '1',
    name: 'Aditya Kumar Gupta',
    subject: 'I.T.',
    image: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png',
    phone: '1234567890',
    email: 'aditya@ips.edu.in',
    qualification: 'B.Tech (IT), M.Sc (CS)',
    experience: '5 Years of Teaching Experience',
  },
  {
    id: '2',
    name: 'Ajeet Kumar',
    subject: 'S.St (Geo.)',
    image: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png',
    phone: '9876543210',
    email: 'ajeet@ips.edu.in',
    qualification: 'M.A. (Geography), B.Ed',
    experience: '8 Years of Teaching Experience',
  },
  {
    id: '3',
    name: 'Mary Priyanka',
    subject: 'English Language',
    image: 'https://cdn-icons-png.flaticon.com/512/4140/4140057.png',
    phone: '9999999999',
    email: 'mary@ips.edu.in',
    qualification: 'M.A. (English), B.Ed',
    experience: '6 Years of Teaching Experience',
  },
];

const SubjectTeacherScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderTeacher = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('TeacherInfo', { teacher: item })} // 👉 Pass teacher data
    >
      <LinearGradient
        colors={['#ffffff', '#f9fafb']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.avatarWrap}>
          <Image source={{ uri: item.image }} style={styles.avatar} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.subjectTag}>
            <Text style={styles.subjectText}>{item.subject}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#0f6aa5', '#005f73']} style={styles.header}>
        <StatusBar backgroundColor="#005f73" barStyle="light-content" />
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Subject Teachers</Text>
        </View>

        <View style={styles.searchBox}>
          <Icon name="magnify" size={20} color="#555" style={{ marginRight: 6 }} />
          <TextInput
            placeholder="Search Teacher"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#888"
            style={{ flex: 1, color: '#000', fontSize: 15 }}
          />
        </View>
      </LinearGradient>

      {/* Teacher List */}
      <FlatList
        data={filteredTeachers}
        keyExtractor={item => item.id}
        renderItem={renderTeacher}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No teachers found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef2f5' },
  header: {
    paddingTop: 45,
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginLeft: 14 },
  backIcon: { backgroundColor: '#ffffff33', borderRadius: 30, padding: 5 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    elevation: 3,
  },
  listContainer: { paddingVertical: 14, paddingHorizontal: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 14,
    borderRadius: 18,
    elevation: 3,
  },
  avatarWrap: { backgroundColor: '#E0F2FE', padding: 5, borderRadius: 60 },
  avatar: { width: 65, height: 65, borderRadius: 40 },
  infoContainer: { flex: 1, marginLeft: 14 },
  name: { fontSize: 17, fontWeight: '700', color: '#111827' },
  subjectTag: {
    backgroundColor: '#E0F2FE',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  subjectText: { fontSize: 13, color: '#0f6aa5', fontWeight: '600' },
  emptyText: { textAlign: 'center', marginTop: 80, fontSize: 16, color: '#6c757d' },
});

export default SubjectTeacherScreen;

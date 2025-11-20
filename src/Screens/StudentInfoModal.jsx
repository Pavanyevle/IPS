import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Props:
 *  - visible: boolean
 *  - onClose: function
 *  - student: {
 *      name: string,
 *      role: string,
 *      phone: string,
 *      father: string,
 *      mother: string,
 *    }
 *  - school: {
 *      name: string,
 *      logoUri: string
 *    }
 *
 * Example:
 * <StudentInfoModal
 *    visible={visible}
 *    onClose={() => setVisible(false)}
 *    school={{ name: "St. Mary's School", logoUri: 'https://...png' }}
 *    student={{
 *      name: 'SAANVI KUMARI (NINE C)',
 *      role: 'Student',
 *      phone: '9031285844',
 *      father: 'MR. SATYENDRA RAM',
 *      mother: 'MRS. MADHUMITA KUMARI'
 *    }}
 * />
 */

const StudentInfoModal = ({ visible, onClose, student, school }) => {
  const handleCall = (phone) => {
    const tel = `tel:${phone}`;
    Linking.canOpenURL(tel)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone not supported', 'Cannot open phone dialer on this device.');
        } else {
          return Linking.openURL(tel);
        }
      })
      .catch(() => Alert.alert('Error', 'Could not open phone dialer.'));
  };

  const handleWhatsApp = (phone) => {
    const url = `whatsapp://send?phone=${phone}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert('WhatsApp not installed', 'Please install WhatsApp to message.');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(() => Alert.alert('Error', 'Could not open WhatsApp.'));
  };

  const handleCopy = async (text) => {
    try {
      // Clipboard API differs by RN version; using deprecated import would fail.
      // Use community clipboard if available; fallback to alert with number.
      // User can replace this with '@react-native-community/clipboard' implementation.
      // For now show simple alert and let developer wire proper copy.
      Alert.alert('Phone Number', text);
    } catch {
      Alert.alert('Error', 'Could not copy to clipboard.');
    }
  };

  const s = student || {};
  const sch = school || {};

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        {/* Modal container (drawer from right look) */}
        <View style={styles.container}>
          {/* Header gradient with school logo & close */}
          <LinearGradient colors={['#0f6aa5', '#0a9396']} style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={
                  sch.logoUri
                    ? { uri: sch.logoUri }
                    : require('../Img/IPS.png') // replace with local placeholder if available
                }
                style={styles.logo}
              />
              <View style={{ marginLeft: 12 }}>
                <Text numberOfLines={1} style={styles.schoolName}>
                  {sch.name || "School Name"}
                </Text>
                <Text style={styles.schoolSub}>Student Portal</Text>
              </View>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <MaterialIcons name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          {/* Content */}
          <View style={styles.content}>
            {/* Role block */}
            <View style={styles.roleCard}>
              <View style={styles.roleLeft}>
                <MaterialCommunityIcons name="account-circle" size={54} color="#6b7280" />
              </View>
              <View style={styles.roleRight}>
                <Text style={styles.studentName}>{s.name || 'Student Name'}</Text>
                <Text style={styles.studentRole}>{s.role || 'Student'}</Text>
              </View>
            </View>

            {/* My Info */}
            <View style={styles.infoWrap}>
              <Text style={styles.sectionTitle}>My Info</Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Name</Text>
                <Text style={styles.infoValue}>{s.name || '-'}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Role</Text>
                <Text style={styles.infoValue}>{s.role || '-'}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phone</Text>
                <View style={styles.phoneRow}>
                  <Text style={styles.infoValue}>{s.phone || '-'}</Text>
                  <View style={styles.phoneActions}>
                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: '#0f6aa5' }]}
                      onPress={() => handleCall(s.phone)}
                    >
                      <MaterialCommunityIcons name="phone" size={18} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: '#25D366' }]}
                      onPress={() => handleWhatsApp(s.phone)}
                    >
                      <MaterialCommunityIcons name="whatsapp" size={18} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: '#6b7280' }]}
                      onPress={() => handleCopy(s.phone)}
                    >
                      <MaterialCommunityIcons name="content-copy" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Father</Text>
                <Text style={styles.infoValue}>{s.father || '-'}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Mother</Text>
                <Text style={styles.infoValue}>{s.mother || '-'}</Text>
              </View>
            </View>

            {/* Small footer actions */}
            <View style={styles.footerActions}>
              <TouchableOpacity style={styles.footerBtn} onPress={() => Alert.alert('Refresh', 'Data refreshed')}>
                <MaterialCommunityIcons name="refresh" size={18} color="#0f6aa5" />
                <Text style={styles.footerText}>Refresh</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.footerBtn} onPress={() => Alert.alert('Token', 'Notification token copied')}>
                <MaterialCommunityIcons name="bell-outline" size={18} color="#0f6aa5" />
                <Text style={styles.footerText}>Notification Token</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signOut} onPress={() => Alert.alert('Sign out', 'Signing out...')}>
              <Text style={styles.signOutText}>SIGN OUT</Text>
            </TouchableOpacity>

            <Text style={styles.version}>Version 22.0</Text>
          </View>
        </View>

        {/* touch area to close modal when tapped outside */}
        <TouchableOpacity style={styles.outside} onPress={onClose} activeOpacity={1} />
      </View>
    </Modal>
  );
};

export default StudentInfoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  container: {
    width: '80%', // drawer width
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 20,
  },

  header: {
    paddingVertical: Platform.OS === 'ios' ? 36 : 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  logo: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#fff' },
  schoolName: { color: '#fff', fontWeight: '700', fontSize: 16 },
  schoolSub: { color: '#E6FBFF', fontSize: 13 },

  closeBtn: {
    padding: 8,
    marginLeft: 8,
  },

  content: {
    padding: 16,
  },

  roleCard: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    marginBottom: 14,
    elevation: 2,
  },
  roleLeft: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleRight: { flex: 1, paddingLeft: 8 },
  studentName: { fontSize: 16, fontWeight: '700', color: '#111827' },
  studentRole: { fontSize: 13, color: '#6b7280', marginTop: 4 },

  infoWrap: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#0f6aa5', marginBottom: 8 },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    alignItems: 'center',
  },
  infoLabel: { color: '#6b7280', fontSize: 13, flex: 0.45 },
  infoValue: { color: '#111827', fontSize: 14, textAlign: 'right', flex: 0.55 },

  phoneRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  phoneActions: { flexDirection: 'row', marginLeft: 12 },

  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  footerActions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  footerBtn: { flexDirection: 'row', alignItems: 'center' },
  footerText: { marginLeft: 8, color: '#0f6aa5', fontWeight: '600' },

  signOut: {
    backgroundColor: '#d32f2f',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  signOutText: { color: '#fff', fontWeight: '700' },

  version: { textAlign: 'center', color: '#9CA3AF', fontSize: 12 },

  outside: { flex: 1 },
});

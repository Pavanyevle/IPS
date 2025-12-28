import React from 'react';
import { SafeAreaView, View, Text, StyleSheet,TouchableOpacity  } from 'react-native';
import { colors, radius } from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTab = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
           
      {/* Bottom nav */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomTab} onPress={() => navigation.navigate('Home')}>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
    },
    subtitle: {
        marginTop: 8,
        fontSize: 14,
        color: '#666',
    },
    bottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 12,
    right: 12,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: '#083f66',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 6,
  },
  bottomTab: { alignItems: 'center' },
  bottomLabel: { color: '#fff', fontSize: 12, marginTop: 2 },
});
export default BottomTab;
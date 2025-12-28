import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const MAP_HEIGHT = height * 0.65;

const BusTrackingScreen = ({ route, navigation }) => {
  const { busNumber, routeName } = route.params || {};
  
  const [busLocation, setBusLocation] = useState({
    latitude: 19.0760,
    longitude: 72.8777,
  });
  const [userLocation, setUserLocation] = useState({
    latitude: 19.0700,
    longitude: 72.8700,
  });

  const routeCoordinates = [
    { latitude: 19.0760, longitude: 72.8777 },
    { latitude: 19.0800, longitude: 72.8800 },
    { latitude: 19.0850, longitude: 72.8750 },
    // Add more coordinates
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* Header */}
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.busNumber}>{busNumber || 'IPS-101'}</Text>
            <Text style={styles.routeName}>{routeName || 'School Main Route'}</Text>
          </View>
          
          <TouchableOpacity style={styles.refreshButton}>
            <Ionicons name="refresh" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.0760,
          longitude: 72.8777,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        followsUserLocation={false}
      >
        {/* Bus Marker */}
        <Marker coordinate={busLocation}>
          <Image 
            source={require('../Img/bus.jpg')} 
            style={styles.busMarker}
          />
        </Marker>

        {/* User Location Marker */}
        <Marker coordinate={userLocation} pinColor="green" />

        {/* Route Path */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#FF6B6B"
          strokeWidth={4}
          lineDashPattern={[10, 5]}
        />
      </MapView>

      {/* Bottom Tracking Card */}
      <LinearGradient colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,1)']} 
        style={styles.trackingCard}>
        
        {/* ETA & Distance */}
        <View style={styles.etaRow}>
          <View style={styles.etaItem}>
            <Text style={styles.etaNumber}>8</Text>
            <Text style={styles.etaLabel}>min away</Text>
          </View>
          <View style={styles.distanceItem}>
            <Text style={styles.distanceNumber}>2.3</Text>
            <Text style={styles.distanceLabel}>km away</Text>
          </View>
        </View>

        {/* Stop Info */}
        <View style={styles.stopsContainer}>
          <Text style={styles.nextStop}>Next Stop: </Text>
          <Text style={styles.stopName}>Shivaji Chowk</Text>
          <View style={styles.stopProgress}>
            <View style={styles.progressBar} />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.buttonText}>Call Driver</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-social" size={20} color="#667eea" />
            <Text style={styles.buttonTextSecondary}>Share</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  busNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 2,
  },
  routeName: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  refreshButton: {
    padding: 10,
  },
  map: {
    flex: 1,
    height: MAP_HEIGHT,
  },
  busMarker: {
    width: 40,
    height: 40,
  },
  trackingCard: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -10 },
    elevation: 15,
  },
  etaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  etaItem: {
    alignItems: 'center',
  },
  distanceItem: {
    alignItems: 'center',
  },
  etaNumber: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FF6B6B',
  },
  distanceNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#10B981',
  },
  etaLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  distanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  stopsContainer: {
    marginBottom: 25,
  },
  nextStop: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 5,
  },
  stopName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  stopProgress: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    width: '65%',
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  callButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  shareButton: {
    flex: 1,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#667eea',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  buttonTextSecondary: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});

export default BusTrackingScreen;

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ Added

const { width } = Dimensions.get('window');
const FIREBASE_URL = 'https://myapp-1a8b6-default-rtdb.firebaseio.com/';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const createFirebaseKey = (id) => {
    return id.replace(/[.#$[\]]/g, '_'); // Replace invalid Firebase characters
  };

  // 🔹 Signup function
  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const userId = createFirebaseKey(email);

    try {
      await axios.put(`${FIREBASE_URL}/students/${userId}.json`, {
        name: name,
        email: email,
        password: password, // (⚠️ future मध्ये hash करा)
        createdAt: new Date().toISOString(),
      });

      // ✅ Save user data in AsyncStorage
      await AsyncStorage.setItem(
        'userData',
        JSON.stringify({ email, password })
      );

      setIsLoading(false);
      Toast.show({
      type: 'success',
      text1: 'Signup Successful 🎉',
      position: 'bottom',
    });
      navigation.navigate('Home'); // redirect to home
    } catch (error) {
      console.log('Signup error:', error);
      setIsLoading(false);
      alert('Signup failed. Try again!');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              styles.content,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            {/* Header */}
            <Animated.View
              style={[styles.headerSection, { transform: [{ scale: logoScale }] }]}
            >
              <View style={styles.logoContainer}>
                <View style={styles.logoWrapper}>
                  <Image
                    source={require('../Img/IPS.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.appName}>IPS</Text>
              </View>
            </Animated.View>

            {/* Signup Card */}
            <View style={styles.loginCard}>
              <Text style={styles.welcomeText}>Create Account</Text>
              <Text style={styles.subtitleText}>Sign up to get started</Text>

              <View style={styles.inputSection}>
                {/* Name */}
                <View style={styles.commonInputWrapper}>
                  <TextInput
                    placeholder="Enter your name"
                    placeholderTextColor="#A0A0A0"
                    style={styles.commonInput}
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                {/* Email */}
                <View style={styles.commonInputWrapper}>
                  <TextInput
                    placeholder="Enter your email or phone"
                    placeholderTextColor="#A0A0A0"
                    style={styles.commonInput}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Password */}
                <View style={styles.commonInputWrapper}>
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={!showPassword}
                    style={styles.commonInput}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.eyeIcon}>
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Confirm Password */}
                <View style={styles.commonInputWrapper}>
                  <TextInput
                    placeholder="Confirm your password"
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={!showPassword}
                    style={styles.commonInput}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.eyeIcon}>
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.signInText}>
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Already have account */}
              <View style={styles.signupRow}>
                <Text style={styles.signupText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.signupLink}> Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: { alignItems: 'center', backgroundColor: '#ffffff', padding: 10, borderRadius: 20, shadowColor: '#000', },
  logoWrapper: { position: 'relative', marginBottom: 2, backgroundColor: '#ffffff', borderRadius: 50, padding: 10 },
  logo: { width: 130, height: 130, borderRadius: 50, backgroundColor: '#ffffff' },

  logoShadow: {  zIndex: -1 },
  appName: { position: 'absolute', top: 130, fontSize: 32, fontWeight: '800', color: '#800000', letterSpacing: 2,  },
  appSubtitle: { fontSize: 14, color: '#718096', fontWeight: '400', textAlign: 'center' },
  loginCard: {
    backgroundColor: '#fcf5f5ee',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    borderWidth: 1,
    borderColor: '#b3b9bcff',
  },
  welcomeText: { fontSize: 28, fontWeight: '700', color: '#2D3748', textAlign: 'center', marginBottom: 8 },
  subtitleText: { fontSize: 16, color: '#718096', textAlign: 'center', marginBottom: 30, fontWeight: '400' },
  inputSection: { marginBottom: 25 },
  commonInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  commonInput: { flex: 1, paddingVertical: 16, fontSize: 16, color: '#2D3748' },
  eyeButton: { paddingLeft: 10 },
  eyeIcon: { fontSize: 18, color: '#718096' },
  signInButton: { borderRadius: 12, marginBottom: 20, shadowColor: '#667eea', shadowOpacity: 0.3, shadowRadius: 15, shadowOffset: { width: 0, height: 8 }, elevation: 8 },
  gradientButton: { paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  signInText: { color: '#ffffff', fontSize: 18, fontWeight: '700', letterSpacing: 0.5 },
  signupRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  signupText: { color: '#718096', fontSize: 16 },
  signupLink: { color: '#667eea', fontWeight: '700', fontSize: 16 },
});

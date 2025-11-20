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
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');
const FIREBASE_URL = 'https://international-public-sch-db945-default-rtdb.firebaseio.com/';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Entrance animations
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
    return id.replace(/[.#$[\]]/g, '_'); // Firebase मध्ये invalid characters replace करा
  };
  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }

    setIsLoading(true);
    const userId = createFirebaseKey(email);

    try {
  const response = await axios.get(`${FIREBASE_URL}students/${userId}.json`);
  console.log('User ID:', userId);
  console.log('Firebase URL:', `${FIREBASE_URL}students/${userId}.json`);
  console.log('Response:', response.data);

  if (!response.data || Object.keys(response.data).length === 0) {
    alert('User not found. Please signup first!');
    setIsLoading(false);
    return;
  }

  if (response.data.password === password) {
    setIsLoading(false);
    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      position: 'bottom',
    });
    await AsyncStorage.setItem('userData', JSON.stringify({
      email: email,
      password: password,
    }));
    navigation.navigate('Home');
  } else {
    setIsLoading(false);
    alert('Incorrect password. Try again!');
  }
} catch (error) {
  console.log('Login error:', error);
  setIsLoading(false);
  alert('Login failed. Try again!');
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
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Header Section */}
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

            {/* Login Card */}
            <View style={styles.loginCard}>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.subtitleText}>Sign in to your account</Text>

              {/* Input Fields */}
              <View style={styles.inputSection}>
                {/* Email/Phone */}
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
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleSignIn}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.signInText}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Sign Up Link
              <View style={styles.signupRow}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.signupLink}> Sign Up</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  logoWrapper: {
    marginTop: 25,
    position: 'relative',
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 50,
  },

  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#800000',
    letterSpacing: 2,
    marginBottom: 5,
    position: 'absolute',
    top: 135,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '400',
    textAlign: 'center',
  },
  loginCard: {
    backgroundColor: '#fcf5f5ee',
    marginTop: 10,
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
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '400',
  },
  inputSection: {
    marginBottom: 25,
  },
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
  commonInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#2D3748',
  },
  eyeButton: {
    paddingLeft: 10,
  },
  eyeIcon: {
    fontSize: 18,
    color: '#718096',
  },
  signInButton: {
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#667eea',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  gradientButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signInText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  forgotPassword: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#718096',
    fontSize: 16,
  },
  signupLink: {
    color: '#667eea',
    fontWeight: '700',
    fontSize: 16,
  },
});

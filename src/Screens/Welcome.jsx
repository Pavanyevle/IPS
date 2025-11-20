import React from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, radius } from '../theme';
import AppButton from '../components/UI/AppButton';

const AboutScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.wrap}>
      <View style={styles.content}>
        <Image
          source={require('../Img/IPS.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>International Public School</Text>
      </View>
      <AppButton title="Get Started" onPress={() => navigation.navigate('Login')} style={styles.cta} />
    </LinearGradient>
  );
};

export default AboutScreen;
const styles = StyleSheet.create({
  wrap: { flex: 1, padding: spacing.lg },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 180, height: 180, marginBottom: spacing.lg },
  title: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 6 },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.9)' },
  cta: { position: 'absolute', left: spacing.lg, right: spacing.lg, bottom: 40 },
});
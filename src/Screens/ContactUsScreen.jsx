import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Switch,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ContactUsScreen = ({ navigation }) => {
  const [isDark, setIsDark] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.center}>

        {/* 🔘 SWITCH ON TOP (CENTER) */}
        <View style={styles.switchWrapper}>
          <Switch
            value={isDark}
            onValueChange={() => setIsDark(!isDark)}
            thumbColor="#fff"
            trackColor={{ false: "#d1d5db", true: "#9ca3af" }}
          />
        </View>

        {/* CARD */}
        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? "#2f3b52" : "#7f1e8aff" },
          ]}
        >
          {/* Back Arrow */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          {/* Logo */}
          <Image
            source={require("../Img/ips1.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>International Public School</Text>

          {/* Address */}
          <Text style={styles.heading}>Address</Text>
          <Text style={styles.text}>
            International Public School, Tajpur - Samastipur Road,
            RamKrishnapur Ganj, Ganj Chowck, Pin-848129
          </Text>

          {/* Contact */}
          <Text style={styles.heading}>Contact</Text>
          <Text style={styles.text}>
            +91-7620010017  +91-8626092709
          </Text>

          {/* Social Icons */}
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: "#e1306c" }]}
              onPress={() => Linking.openURL("https://www.instagram.com")}
            >
              <FontAwesome name="instagram" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: "#1877f2" }]}
              onPress={() => Linking.openURL("https://www.facebook.com")}
            >
              <FontAwesome name="facebook" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: "#25D366" }]}
              onPress={() => Linking.openURL("https://wa.me/917620010017")}
            >
              <FontAwesome name="whatsapp" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  center: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* SWITCH */
  switchWrapper: {
    marginBottom: 15,
  },

  card: {
    width: "90%",
    borderRadius: 18,
    padding: 20,
    elevation: 10,
  },

  backBtn: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10,
  },

  logo: {
    width: "100%",
    height: 160,
    marginBottom: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  heading: {
    fontSize: 15,
    fontWeight: "600",
    color: "#c7d2fe",
    marginTop: 10,
  },

  text: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
  },

  socialBtn: {
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});

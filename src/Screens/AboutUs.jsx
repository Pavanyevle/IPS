import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f6aa5" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Logo & School Name */}
        <View style={styles.logoSection}>
          <Image
            source={require('../Img/IPS.png')}
            style={styles.logo}
          />
          <Text style={styles.schoolName}>International Public School</Text>
          <Text style={styles.established}>Established in 2016</Text>
        </View>

        {/* About Description */}
        <View style={styles.card}>
          <Text style={styles.aboutText}>
            International Public School, established in 2016, is run by eminent educationists
            who are committed to raising the benchmarks of education and delivering value
            to the entire learning community. By adopting a creative and collaborative
            approach to learning, we provide students with opportunities to realize their
            full potential and excel anywhere in the world.
          </Text>
          <Text style={styles.aboutText}>
            IPS is one of the most prestigious schools across the world — District Aurangabad (Maharashtra)
            and Samastipur (Bihar). With the motto of “Dream, Devotion, Destination”, we believe in D3 —
            providing an effective environment empowering each child to explore, learn, and grow.
          </Text>
        </View>

        {/* Vision */}
        <LinearGradient colors={['#00b09b', '#96c93d']} style={styles.infoCard}>
          <MaterialCommunityIcons name="eye-outline" size={30} color="#fff" />
          <Text style={styles.infoTitle}>OUR VISION</Text>
          <Text style={styles.infoText}>
            Our vision is to provide a delighted, caring, and dynamic environment where children
            will recognize and achieve their fullest potential, leadership qualities, and sense of
            destiny to be successful and make a positive contribution to society.
          </Text>
        </LinearGradient>

        {/* Mission */}
        <LinearGradient colors={['#ff9966', '#ff5e62']} style={styles.infoCard}>
          <MaterialCommunityIcons name="target" size={30} color="#fff" />
          <Text style={styles.infoTitle}>OUR MISSION</Text>
          <Text style={styles.infoText}>
            IPS recognizes that each individual child is to impart excellent quality of education;
            foster their holistic development, inculcate in them sense of aesthetics and values and
            develop them as complete human beings to face future challenges of the world.
          </Text>
        </LinearGradient>

        {/* Motto */}
        <LinearGradient
          colors={['#7c23c5', '#9723c5']}
          style={styles.mottoSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.mottoTitle}>OUR MOTTO!</Text>
          <Text style={styles.mottoText}>We believe in D3 (“Dream, Devotion, Destination”)</Text>
          <Text style={styles.mottoDesc}>
            Our motto encourages dreamers to discover their passion with devotion and to find the joy of learning.
            We help learners discover who they really are — enabling them to do what they love and live meaningfully.
          </Text>
        </LinearGradient>

        {/* Timeline Section */}
        <Text style={styles.sectionTitle}>Our Journey</Text>
        <View style={styles.timeline}>
          <View style={styles.timelineItem}>
            <View style={styles.dot} />
            <Text style={styles.timelineYear}>2016</Text>
            <Text style={styles.timelineDesc}>Founded with a vision for holistic education.</Text>
          </View>
          <View style={styles.timelineItem}>
            <View style={styles.dot} />
            <Text style={styles.timelineYear}>2018</Text>
            <Text style={styles.timelineDesc}>Introduced smart classes and digital learning.</Text>
          </View>
          <View style={styles.timelineItem}>
            <View style={styles.dot} />
            <Text style={styles.timelineYear}>2022</Text>
            <Text style={styles.timelineDesc}>Expanded to multiple districts in Maharashtra & Bihar.</Text>
          </View>
          <View style={styles.timelineItem}>
            <View style={styles.dot} />
            <Text style={styles.timelineYear}>2025</Text>
            <Text style={styles.timelineDesc}>Proposed schools in Nepal & Jharkhand.</Text>
          </View>
        </View>

       {/* Messages Section */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>CHAIRMAN’S MESSAGE</Text>

  <Image
    source={require('../Img/Chairman.jpg')}
    style={styles.personImage}
  />
  <Text style={styles.personName}>Er. Manohar Kumar </Text>
  <Text style={styles.personDesignation}>(Chairman) </Text>

  <Text style={styles.quote}>“Learning knowledge is path of success” </Text>
  <Text style={styles.paragraph}>
    Learning knowledge is path of success and the beginning of wisdom simply means curiosity
    drives us to question, learn, and grow. At IPS, we help children develop the four pillars
    of learning — Knowledge, Skills, Disposition, and Feelings. Every teacher at IPS nurtures
    young minds with dedication and passion.
  </Text>
</View>

<View style={styles.section}>
  <Text style={styles.sectionTitle}>MANAGING DIRECTOR'S MESSAGE</Text>

  <Image
    source={require('../Img/Ramsir.jpg')}
    style={styles.personImage}
  />
  <Text style={styles.personName}>Er. Ram S. </Text>
  <Text style={styles.personDesignation}>(Managing Director) </Text>
  <Text style={styles.personQualification}>M.Tech (CSE), M.Sc (Math) </Text>

  <Text style={styles.quote}>“Think Different” </Text>
  <Text style={styles.paragraph}>
    I would like to welcome you to IPS where accomplishments meet a vibrant campus atmosphere.
    We expect our students to push themselves academically, intellectually, and socially to
    prepare for leadership in a global society. We encourage compassion, excellence, and teamwork.
  </Text>
</View>

<View style={styles.section}>
  <Text style={styles.sectionTitle}>PRINCIPAL’S MESSAGE </Text>

  <Image
    source={require('../Img/Principal.jpg')}
    style={styles.personImage}
  />
  <Text style={styles.personName}>Er. Madhumita K. Madhuwal </Text>
  <Text style={styles.personDesignation}>(Principal)</Text>
  <Text style={styles.personQualification}>MCA, M.Sc (Chem), Civil Engg., B.Ed </Text>

  <Text style={styles.quote}>“Wonder is the beginning of wisdom” </Text>
  <Text style={styles.paragraph}>
    At IPS, we believe in growth, excellence, innovation, and diversity. Our teachers foster
    holistic development and encourage cultural inclusion through arts, languages, and community
    service. We aim to create an environment where every student feels valued and prepared for
    a lifetime of learning.
  </Text>
</View>


        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            📍 Samastipur | Aurangabad | Coming Soon: Nepal, Jharkhand
          </Text>
          <Text style={styles.footerText}>© 2025 International Public School</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },

  logoSection: { alignItems: 'center', marginTop: 60 },
  logo: { width: 140, height: 100, borderRadius: 45, marginBottom: 8 },
  schoolName: { fontSize: 20, fontWeight: '700', color: '#0f6aa5' },
  established: { fontSize: 13, color: '#777' },

  personImage: {
  width: 110,
  height: 110,
  borderRadius: 55,
  alignSelf: 'center',
  marginVertical: 8,
  borderWidth: 2,
  borderColor: '#0f6aa5',
},

personName: {
  fontSize: 17,
  fontWeight: '700',
  color: '#0f6aa5',
  textAlign: 'center',
  marginTop: 4,
},

personDesignation: {
  fontSize: 14,
  fontWeight: '600',
  color: '#555',
  textAlign: 'center',
  marginBottom: 2,
},

personQualification: {
  fontSize: 13,
  color: '#777',
  textAlign: 'center',
  marginBottom: 8,
},

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginTop: 14,
    padding: 14,
    borderRadius: 10,
    elevation: 3,
  },
  aboutText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
    textAlign: 'justify',
  },

  infoCard: {
    borderRadius: 16,
    padding: 18,
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 14,
    elevation: 4,
  },
  infoTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginVertical: 6 },
  infoText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },

  mottoSection: {
    marginTop: 20,
    marginHorizontal: 14,
    borderRadius: 12,
    padding: 16,
    elevation: 4,
  },
  mottoTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 6 },
  mottoText: { color: '#fff', fontSize: 14, fontWeight: '500', marginBottom: 8 },
  mottoDesc: { color: '#f3f3f3', fontSize: 13, lineHeight: 19 },

  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#0f6aa5', marginBottom: 8 },
  paragraph: { fontSize: 14, lineHeight: 22, color: '#444', textAlign: 'justify' },
  quote: { fontStyle: 'italic', color: '#0077b6', marginVertical: 6, fontWeight: '600' },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 14,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
  },
  personImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#0f6aa5',
  },

  timeline: {
    marginTop: 10,
    marginLeft: 24,
    borderLeftWidth: 2,
    borderColor: '#0f6aa5',
    paddingLeft: 12,
    marginRight: 20,
  },
  timelineItem: { marginBottom: 14 },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0f6aa5',
    position: 'absolute',
    left: -17,
    top: 5,
  },
  timelineYear: { fontSize: 13.5, fontWeight: '700', color: '#0f6aa5' },
  timelineDesc: { fontSize: 13, color: '#555', marginTop: 2 },

  footer: { marginTop: 30, alignItems: 'center', marginBottom: 30 },
  footerText: { color: '#888', fontSize: 12, textAlign: 'center', marginVertical: 2 },
});

export default AboutUs;

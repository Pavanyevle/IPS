import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Logo from './src/Screens/Logo';
import Welcome from './src/Screens/Welcome';
import ClassRoutine from './src/Screens/ClassRoutine';
import Attendance from './src/Screens/Attendance';
import StudentInfoModal from './src/Screens/StudentInfoModal';
import AboutUs from './src/Screens/AboutUs';
import TeacherInfo from './src/Screens/TeacherInfo';
import SubjectList from './src/Screens/SubjectList';
import HelpAndSupport from './src/Screens/HelpAndSupport';
import Devloper from './src/Screens/Devloper';
import Syllabus from './src/Screens/Syllabus';
import Account from './src/Screens/Account';
import Login from './src/Screens/Login';
import SignUp from './src/Screens/SignUp';
import BottomTab from './src/Screens/BottomTab';
import MyProfile from './src/Screens/MyProfile'; 
import Home from './src/Screens/Home';
import Notice from './src/Screens/Notice';
import HomeWork from './src/Screens/HomeWork';
import Toast from 'react-native-toast-message';
import { Events, StudyMaterial, LessonPlan, ExamSyllabus, ExamReport, PaymentHistory } from './src/Screens/Placeholders';

const Stack = createNativeStackNavigator();

const FIREBASE_URL = 'https://myapp-1a8b6-default-rtdb.firebaseio.com/';

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null); // सुरुवातीला null
  const [loading, setLoading] = useState(true);

  // 🔹 Invalid Firebase character replace function
  const createFirebaseKey = (id) => {
    return id.replace(/[.#$[\]]/g, '_');
  };

 useEffect(() => {
  const checkLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');

      if (userData) {
        // फक्त स्टोअर केलेले डेटा असल्यास login successful
        setInitialRoute('Home');
      } else {
        setInitialRoute('Login');
      }

    } catch (error) {
      console.log('Auto-login error:', error);
      setInitialRoute('Login');
    } finally {
      setLoading(false);
    }
  };

  checkLogin();
}, []);

  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#800000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Logo" component={Logo} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
           <Stack.Screen name="Home" component={Home} />
           <Stack.Screen name="TeacherInfo" component={TeacherInfo} />
          <Stack.Screen name="HomeWork" component={HomeWork} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="Notice" component={Notice} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Developer" component={Devloper} />
          <Stack.Screen name="MyProfile" component={MyProfile} />
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="ClassRoutine" component={ClassRoutine} />
          <Stack.Screen name="Attendance" component={Attendance} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="SubjectList" component={SubjectList} />
          <Stack.Screen name="Syllabus" component={Syllabus} />
          <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
          <Stack.Screen name="StudentInfoModal" component={StudentInfoModal} />
          {/* Placeholder routes for features referenced on Home */}
          <Stack.Screen name="Events" component={Events} />
          <Stack.Screen name="StudyMaterial" component={StudyMaterial} />
          <Stack.Screen name="LessonPlan" component={LessonPlan} />
          <Stack.Screen name="ExamSyllabus" component={ExamSyllabus} />
          <Stack.Screen name="ExamReport" component={ExamReport} />
          <Stack.Screen name="PaymentHistory" component={PaymentHistory} />

        </Stack.Navigator>
        
        <Toast position="bottom" />
      </NavigationContainer>
    </View>

  );
};

export default App;
import React from 'react';
import { View, Text, Button ,Image} from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
       <Image
        source={require('../Img/IPS.png')}  
        style={{ width: 150, height: 150, marginBottom: 20 }}
        resizeMode="contain"
      />
    </View>
  );
};

export default HomeScreen;

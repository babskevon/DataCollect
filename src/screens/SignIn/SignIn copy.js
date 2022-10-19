import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import Logo from '../../../assets/img/logo.png';
import { CustomInput, CustomButton } from '../../components';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
// import * as SQLite from 'expo-sqlite';
// import {openDatabase} from 'react-native-sqlite-storage';

// const db = SQLite.openDatabase("datacollect.db");
async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}

const SignIn = () => {
    const {height} = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const onSignIn = async () => {
      //valid user login
      fetch('http://datacollect-luwero.center/api/auth/',
      {
        method: 'POST',
        headers:{
          accept: 'application/json; charset=utf-8',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username:username,password:password})
      })
      .then(res=>{
        return res.json();
      })
      .then(data=>{
        if(Object.keys(data).includes("token")){
          save("token", data.token);
          navigation.navigate('Home');
        }else{
          alert("🔐Please enter correct username and password🔐");
        }
      });
    };

    const forgotPassword = () => {
      navigation.navigate('ResetPassword');
    };


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Image 
        source={Logo} 
        style={[styles.logo, {height:height*0.3}]} 
        resizeMode="contain" 
      />

      
      <CustomInput 
        placeholder="Username" 
        value={username} 
        setValue={setUsername} 
      />
      <CustomInput 
        placeholder="Password" 
        value={password} 
        setValue={setPassword} 
        secureTextEntry={true}
      />
      <CustomButton
        text="Sign In"
        onPress={onSignIn}
        type="PRIMARY"
      />
      <CustomButton
        text="Forgot Password?"
        onPress={forgotPassword}
        type="TERTIARY"
      />
    </View>
    </ScrollView> 
  )
};


const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        paddingTop:150,
        paddingLeft:20,
        paddingRight:20,
    },
    logo:{
        maxHeight:300,
        width: '80%',
        maxWidth:300,
        marginBottom: 30,
    },
});

export default SignIn; 
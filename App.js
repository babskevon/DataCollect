// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
import { SafeAreaView } from 'react-native';
import Router from './src/components/router/Router.js';
import {styles} from './style';


const App = ()=>{
  return (
    <SafeAreaView style={styles.root}>
      <Router />
    </SafeAreaView>
  );
};

export default App;

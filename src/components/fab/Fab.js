import { StyleSheet, Text, View,Alert, Button } from 'react-native';
import React, { useState } from 'react';
import { FAB, TextInput } from 'react-native-paper';

const Fab = () => {
  const [text, setText] = useState('');
  const [showText, setShowText] = useState(false);
  const [disablebtn, setDisablebtn] = useState(true);
  
  const addItem = (text) => {
    console.warn("Floating button is working properly");
  };
  const showAlert = () => {
    Alert.alert('Item added successfully');
  };

  return (
    <View>
      <FAB 
        style={styles.fab} 
        icon="plus"
        onPress={addItem} 
      />
    </View>
  )
}

export default Fab;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    marginTop: 40,
    right: 0,
    bottom: 0,
  }
});
import { StyleSheet, Text, View,Alert, Button } from 'react-native';
import React, { useState } from 'react';
import { FAB, TextInput } from 'react-native-paper';

const Fab = () => {
  const [text, setText] = useState('');
  const [showText, setShowText] = useState(false);
  const [disablebtn, setDisablebtn] = useState(true);
  
  const addItem = (text) => {
    setShowText(true);
  };
  const showAlert = () => {
    Alert.alert('Item added successfully');
  };

  return (
    <View>
      <FAB style={styles.fab} icon="plus" small label="Add Record"
           onPress={addItem} />
      {showText ? (
        <View style={styles.textInput}>
          <TextInput
            mode="outlined"
            label="Item"
            value={text}
            onChangeText={(newText) => {
              setText(newText);
              setDisablebtn(false);
            }}
          />
          <View style={styles.btn}>
            <Button title="Submit" disabled={disablebtn} 
                    onPress={showAlert} />
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  )
}

export default Fab;

const styles = StyleSheet.create({
  fab: {
    position: 'relative',
    margin: 16,
    marginTop: 40,
    right: 0,
    bottom: 0,
  },
  textInput: {
    position: 'relative',
    margin: 18,
  },
  btn: {
    marginTop: 20,
  },
});
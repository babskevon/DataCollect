import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const CustomInput = ({value, setValue, placeholder,secureTextEntry,style,keyboardType}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder} 
        style={[styles.input,style]} 
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
       />
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'100%',
        borderWidth:1,
        borderRadius:5,
        borderColor:'#e8e8e8',
        paddingHorizontal:20,
        paddingVertical:10,
        marginVertical:5,
    },
    input:{
      fontWeight:'400',
      color:'grey',
      fontSize:14,
    },
});

export default CustomInput
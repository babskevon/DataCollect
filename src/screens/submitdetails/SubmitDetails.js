import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { CustomInput, CustomButton } from '../../components';
import { useNavigation } from '@react-navigation/native';

const SubmitDetails = () => {
    const navigation = useNavigation();
    const saveData = ()=>{
        navigation.navigate('Home');
    };
  return (
    <View style={styles.root}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <Text style={styles.lable}>Elevation</Text>
      <CustomInput placeholder="Elevation" keyboardType='phone-pad' />
      <Text style={styles.lable}>DWD</Text>
      <CustomInput placeholder="DWD" />
      <Text style={styles.lable}>Casing Depth</Text>
      <CustomInput placeholder="Casing Depth" keyboardType='phone-pad' />
      <Text style={styles.lable}>S.W.L</Text>
      <CustomInput placeholder="S.W.L" />
      <Text style={styles.lable}>Number of pipes</Text>
      <CustomInput placeholder="Number of pipes" keyboardType='phone-pad' />
      {/* </ScrollView> */}
      <CustomButton
        text="Save"
        style={styles.button}
        onPress={saveData}
      />
    </View>
  );
}

export default SubmitDetails;

const styles = StyleSheet.create({
    root:{
        flex: 1,
        alignItems: 'center',
        // paddingTop:50,
        paddingLeft:20,
        paddingRight:20,
    },
    lable:{
        color: 'grey',
        fontWeight: 'bold',
        fontSize:18,
        marginTop: 10,
    },
    button:{
        position:'absolute',
        bottom: 40,
        width:'60%',
        // marginTop:100,
    }
});
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { CustomInput, CustomButton } from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import {AuthContext} from '../../context/Context';
import * as Location from 'expo-location';
import axios from "axios";

const SubmitDetails = () => {
  const url = 'https://api.jawg.io/elevations/locations?access-token=';
  const accessToken = "fZl7auWj6PFTnR5iqhbgIA13n7NHFqwYG37HA9y0a4dWwlMR0JH5sQGosYsZ6sNz";
  const [location, setLocation] = React.useState(null);
  const [yielded, setYield] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const {loginUser, loginToken} = React.useContext(AuthContext);
  const [elevation, setElevation] = React.useState(null);//comes with coordinates
  const [DWD, setDWD] = React.useState(null);
  const [casing_depth, setCasingDepth] = React.useState(null);
  const [swl, setSWL] = React.useState(null);
  const [number_of_pipes, setNumberOfPipes] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  const navigation = useNavigation();
  const route = useRoute();

  const saveData = ()=>{
    setTimeout(() => {
      axios.post(
        url+accessToken,
        {"locations":location.coords.latitude+","+location.coords.longitude}
      )
      .then(data=>{
        setElevation(data.data[0].elevation);
      })
      .catch(error=>{
        alert("Failed to get location, poor network connectivity");
      });
      
    }, 900);
    if(DWD === null || casing_depth === null || swl === null || number_of_pipes===null || yielded ===null){
      alert("Please fill all available fields");
    }
    else{
      const url2 = 'https://datacollect-luwero.center/api/datapoints/';
      const userToken= loginToken();
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+userToken
      };
      const data = {
          ...route.params,
          DWD:DWD,
          casing_depth: casing_depth,
          swl: swl,
          number_of_pipes: number_of_pipes,
          owner:loginUser(),
          ycord:location.coords.latitude, //y northings
          xcord:location.coords.longitude, //x eastings
          elevation:elevation,
          yielded:yielded,
      };

      axios({
        url:url2,
        method: 'POST',
        headers:headers,
        data:data,
      })
      .then(res=>{
        if(res.data.owner === loginUser()){
          alert("Data submitted successfully");
          navigation.navigate('Home');
        }
      })
      .catch(error=>{
        alert("Poor network connection, please try again");
      });

      
    }
        
  };
  return (
    <View style={styles.root}>
       {/* Elevation input  */}
      <Text style={styles.lable}>Yield (m3/hr)</Text>
      <CustomInput 
        placeholder="Elevation" 
        keyboardType='phone-pad' 
        style={{paddingVertical:4}} 
        value={yielded}
        setValue={setYield} 
      />

      {/* DWD in put  */}
      <Text style={styles.lable}>DWD</Text>
      <CustomInput 
        placeholder="DWD"   
        style={{paddingVertical:4}} 
        value={DWD}
        setValue={setDWD} 
      />

      {/* Casing Depth in put  */}
      <Text style={styles.lable}>Casing Depth</Text>
      <CustomInput 
        placeholder="Casing Depth" 
        keyboardType='phone-pad'   
        style={{paddingVertical:4}} 
        value={casing_depth}
        setValue={setCasingDepth} 
      />

      {/* S.W.L input  */}
      <Text style={styles.lable}>S.W.L</Text>
      <CustomInput 
        placeholder="S.W.L" 
        keyboardType='phone-pad' 
        style={{paddingVertical:4}} 
        value={swl}
        setValue={setSWL} 
      />

      {/* number of pipes  */}
      <Text style={styles.lable}>Number of pipes</Text>
      <CustomInput 
        placeholder="Number of pipes" 
        keyboardType='phone-pad'
        style={{paddingVertical:4}} 
        value={number_of_pipes}
        setValue={setNumberOfPipes} 
       />



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
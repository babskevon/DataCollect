import React,{useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CustomInput, SelectComponent } from '../../components';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import {AuthContext} from '../../context/Context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'




const LocationDetails = () => {
    //get fetch variables
    const {signOut, loginToken} = React.useContext(AuthContext);
    const url = 'https://datacollect-luwero.center/api/';
    const userToken= loginToken();
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+userToken
    };
    //End fetch variables
    
    const [districts, setDistricts] = useState(null);
    const [parishes, setParishes] = useState(null);
    const [subcounties, setSubcounties] = useState(null);
    const [counties, setCounties] = useState(null);
    // data to be sent
    const [district, setDistrict] = useState(null);
    const [parish, setParish] = useState(null);
    const [subcounty, setSubcounty] = useState(null);
    const [county, setCounty] = useState(null);
    const [village, setVillage] = useState(null);


    useEffect(()=>{

        // get districts 
        axios({
            url:url+'districts/',
            method: 'GET',
            headers:headers
        })
        .then(data => {
            let newArray = data.data.map((item) => {
                return {key: item.id, value: item.district}
            });
            setDistricts(newArray); 
        })
        .catch(error => {});


        // get parishes
        axios({
            url:url+'parishes/',
            method: 'GET',
            headers:headers
        })
        .then(data => {
            setParishes(data.data); 
            let newArray = data.data.map((item) => {
                return {key: item.id, value: item.parish}
            });
            setParishes(newArray);
        })
        .catch(error => {});


        //get subcounties
        axios({
            url:url+'subcounties/',
            method: 'GET',
            headers:headers
        })
        .then(data => {
            let newArray = data.data.map((item) => {
                return {key: item.id, value: item.subcounty}
            });
            setSubcounties(newArray); 
        })
        .catch(error => {});



        //get counties
        axios({
            url:url+'counties/',
            method: 'GET',
            headers:headers
        })
        .then(data => { 
            let newArray = data.data.map((item) => {
                return {key: item.id, value: item.county}
            });
            setCounties(newArray);
        })
        .catch(error => {});

    },
    []);
    const navigation = useNavigation();

    const goNext = () => {
        if(district === null || parish === null || subcounty === null || county === null || village ===null){
            alert("Please make sure you've entered all available fields");
        }
        else{
            const data={
                district:districts[district-1].value,
                parish: parishes[parish-1].value,
                subcounty: subcounties[subcounty-1].value,
                county:counties[county-1].value,
                village:village
            };
            navigation.navigate('ProjectDetails',data);
        }
      };

    return (
        <View style={styles.root}>
            {/* district input */}
            <Text style={styles.lable}>District</Text>
            <SelectComponent 
                setSelected={setDistrict}
                data={districts}
            />

            {/* parish input  */}
            <Text style={styles.lable}>Parishes</Text>
            <SelectComponent 
                setSelected={setParish}
                data={parishes}
            />

            {/* subcounties input  */}
            <Text style={styles.lable}>Subcounty</Text>
            <SelectComponent 
                data={subcounties}
                setSelected={setSubcounty}
            />
            
            {/* counties input */}
            <Text style={styles.lable}>County</Text>
            <SelectComponent 
                data={counties}
                setSelected={setCounty}
            />


            {/* villages input  */}
            <Text style={styles.lable}>Village</Text>
            <CustomInput 
                placeholder="Village" 
                style={{paddingVertical:4}} 
                value={village}
                setValue={setVillage} 
            />

            
            
            
            
            
            <FAB 
                style={styles.fab}
                // icon='arrow-forward'
                size='large'
                onPress={goNext}
                label='Next'
                // loading
            />
        </View>
    );
}

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
    fab:{
        position:'absolute',
        bottom: 0,
        right: 0,
        margin: 30,
        marginBottom:60,
        width:'30%',
        // height:'10%',
        alignItems: 'center',
    }
})

export default LocationDetails;

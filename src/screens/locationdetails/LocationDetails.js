import React,{useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import { Select, CustomInput } from '../../components';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';



const LocationDetails = () => {
    const [districts, setDistricts] = useState(null);
    const [parishes, setParishes] = useState(null);
    const [subcounties, setSubcounties] = useState(null);
    const [counties, setCounties] = useState(null);
    useEffect(()=>{
        fetch('http://datacollect-luwero.center/api/districts/',{method: 'GET',headers:{Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Token 9bae395cd8cda54d97b7db450c703adf699a0754'}})
        .then(res =>{
            return res.json();
        })
        .then(data=>{
            setDistricts(data);
        });


        fetch('http://datacollect-luwero.center/api/parishes/',{method: 'GET',headers:{Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Token 9bae395cd8cda54d97b7db450c703adf699a0754'}})
        .then(res =>{
            return res.json();
        })
        .then(data=>{
            setParishes(data);
        });

        fetch('http://datacollect-luwero.center/api/subcounties/',{method: 'GET',headers:{Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Token 9bae395cd8cda54d97b7db450c703adf699a0754'}})
        .then(res =>{
            return res.json();
        })
        .then(data=>{
            setSubcounties(data);
        });


        fetch('http://datacollect-luwero.center/api/counties/',{method: 'GET',headers:{Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Token 9bae395cd8cda54d97b7db450c703adf699a0754'}})
        .then(res =>{
            return res.json();
        })
        .then(data=>{
            setCounties(data);
        });


    },
    []);
    const navigation = useNavigation();
    const goNext = () => {
        // getVillages();
        navigation.navigate('ProjectDetails');
      };
    
    return (
        <View style={styles.root}>
            
            <Text style={styles.lable}>District</Text>
            <Select 
                touchableText="Select District" 
                title="Districts"
                objkey='id' 
                objvalue='district' 
                data={districts}
            />
            <Text style={styles.lable}>Parishes</Text>
            <Select 
                touchableText="Select Parish" 
                title="Parishes" 
                objkey='id'
                objvalue='parish'
                data={parishes}
            />
            <Text style={styles.lable}>Subcounty</Text>
            <Select 
                touchableText="Select Subcounty" 
                title="Subcounties" 
                objkey='id'
                objvalue='subcounty'
                data={subcounties}
            />
            <Text style={styles.lable}>County</Text>
            <Select 
                touchableText="Select County" 
                title="Counties" 
                objkey='id'
                objvalue='county'
                data={counties}
            />
            <Text style={styles.lable}>Village</Text>
            <CustomInput placeholder="Village" style={{paddingVertical:4}} />
            
            
            
            
            
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

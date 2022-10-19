import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Select, CustomInput } from '../../components';
import { FAB } from 'react-native-paper';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const years = [
    {id:1,year: 2007},
    {id:2,year: 2008},
    {id:3,year: 2009},
    {id:4,year: 2010},
    {id:5,year: 2011},
    {id:6,year: 2012},
    {id:7,year: 2013},
    {id:8,year: 2014},
    {id:9,year: 2015},
    {id:10,year: 2016},
    {id:11,year: 2017},
    {id:12,year: 2018},
    {id:13,year: 2019},
    {id:14,year: 2020},
    {id:15,year: 2021},
    {id:16,year: 2022},
    {id:17,year: 2023}
];

const wells =[
    { id:1,type:'Deep Well'},
    { id:2,type:'Others'},
];

const status = [
    { id:1,status:'Functional'},
    { id:2,status:'Broken'},
];
const ProjectDetails = () => {
    const navigation = useNavigation();
    const goNext = () => {
        navigation.navigate('submitdata');
      };
  return (
    
    <View style={styles.root}>
      <Text style={styles.lable}>Project Name</Text>
      <CustomInput placeholder="Project Name" />
      <Text style={styles.lable}>Year of construction</Text>
      <Select 
        touchableText="Year of construction"
        title="YOC" 
        objkey='id' 
        objvalue='year' 
        data={years} 
      />
      <Text style={styles.lable}>Type of well</Text>
      <Select 
        touchableText="Type of well" 
        title="Type of well" 
        objkey='id' 
        objvalue='type' 
        data={wells}
      />
      <Text style={styles.lable}>Well Status</Text>
      <Select 
        touchableText="Well Status"
        title="Well Status"
        objkey='id'
        objvalue='status'
        data={status}
      />
      <Text style={styles.lable}>Depths (m)</Text>
      <CustomInput placeholder="Depth (m)" keyboardType='phone-pad' />
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

export default ProjectDetails;

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
});
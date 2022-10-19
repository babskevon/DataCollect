import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {  CustomInput, SelectComponent} from '../../components';
import { FAB } from 'react-native-paper';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const years = [
    {key:1,value: 2007},
    {key:2,value: 2008},
    {key:3,value: 2009},
    {key:4,value: 2010},
    {key:5,value: 2011},
    {key:6,value: 2012},
    {key:7,value: 2013},
    {key:8,value: 2014},
    {key:9,value: 2015},
    {key:10,value: 2016},
    {key:11,value: 2017},
    {key:12,value: 2018},
    {key:13,value: 2019},
    {key:14,value: 2020},
    {key:15,value: 2021},
    {key:16,value: 2022},
    {key:17,value: 2023},
    {key:18,value: 2024},
    {key:19,value: 2025},
    {key:20,value: 2026},
    {key:21,value: 2027},
    {key:22,value: 2028},
];

const wells =[
    { key:1,value:'Deep Well'},
    { key:2,value:'Shallow Well'},
    { key:3,value:'Deep Borehole'},
];

const status = [
    { key:1,value:'Functional'},
    { key:2,value:'Non-Functional'},
    { key:3,value:'Bad working condition'},
];
const ProjectDetails = () => {
  const [projectName, setProjectName] = React.useState(null);
  const [depth, setDepth] = React.useState(null);
  const [yoc,setYoc] = React.useState(null);
  const [tow, setTow] = React.useState(null);
  const [wellstatus, setWellStatus] = React.useState(null);



  const navigation = useNavigation();
  const route = useRoute();
  const goNext = () => {
    if(projectName === null || depth === null || yoc === null || tow === null || status===null){
      alert('Please fill in all available fields');
    }
    else{
      // navigation.navigate('submitdata');
      const data2 = {
        ...route.params,
        project_name: projectName,
        depth: depth,
        year_of_construction:years[yoc-1].value,
        type_of_well:wells[tow-1].value,
        well_status:status[wellstatus-1].value
      };
      navigation.navigate('submitdata',data2);
    }
  };
  return (
    
    <View style={styles.root}>

      {/* project name  */}
      <Text style={styles.lable}>Project Name</Text>
      <CustomInput 
        placeholder="Project Name" 
        style={{paddingVertical:4}} 
        value={projectName}
        setValue={setProjectName}
      />

      {/* year of construction  */}
      <Text style={styles.lable}>Year of construction</Text>
      <SelectComponent 
        data={years}
        setSelected={setYoc}
      />

      {/* type of well  */}
      <Text style={styles.lable}>Type of well</Text>
      <SelectComponent 
        data={wells}
        setSelected={setTow}
      />

      {/* well status  */}
      <Text style={styles.lable}>Well Status</Text>
      <SelectComponent 
        data={status}
        setSelected={setWellStatus}
      />



      <Text style={styles.lable}>Depths (m)</Text>
      <CustomInput 
        placeholder="Depth (m)" 
        keyboardType='phone-pad' 
        style={{paddingVertical:4}} 
        value={depth}
        setValue={setDepth} 
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
        wkeyth:'30%',
        // height:'10%',
        alignItems: 'center',
    }
});
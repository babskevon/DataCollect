import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import SelectList from 'react-native-dropdown-select-list'

const SelectComponent = ({onSelect,setSelected,data,arrowicon,searchicon,search,defaultOption}) => {
  return (
    <View style={styles.container}>
      <SelectList
        inputStyles={styles.text}
        onSelect={onSelect}
        setSelected={setSelected} 
        data={data}  
        arrowicon={arrowicon} 
        searchicon={searchicon} 
        search={search} //values false or true
        boxStyles={styles.box} //override default styles
        defaultOption={defaultOption}   //default selected option
      />
    </View>
  )
}

export default SelectComponent

const styles = StyleSheet.create({
    box:{
        borderRadius:5,
        
        backgroundColor:'white',
        border:'none',
        width:'100%',
        padding:100,
        // paddingVertical:10,
    },
    container:{
        backgroundColor:'white',
        width:'100%',
        borderWidth:1,
        borderRadius:5,
        borderColor:'#e8e8e8',
        // paddingHorizontal:20,
        // paddingVertical:10,
        marginVertical:5,
    },
    text:{
        fontWeight:'400',
        color:'grey',
        fontSize:14,
    }
})
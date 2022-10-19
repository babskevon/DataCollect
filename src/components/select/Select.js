import { StyleSheet, View, Text, Modal, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const Touchable = (text, onPress, selected, objvalue)=>{
  const TouchableComponent = ()=>{
    return (
      <TouchableOpacity onPress={onPress} style={styles.touchableContainer}>
        <Text 
          style={[
            styles.touchableText,
            {fontWeight: selected === null?(null):('bold')},
            {color: selected === null?('grey'):('black')},
          ]}
        >
          {selected === null ? (text):(selected?.[objvalue])}</Text>
        <MaterialCommunityIcons name="chevron-right" size={30} color="#555" />
      </TouchableOpacity>
    );
  };
  return {TouchableComponent};
};
const Option = (item, value, selected, objkey,onPress)=>{
  const OptionComponent = ()=>{
    return(
      <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
        <Text 
          style={[ 
                    styles.optionText,
                    {fontWeight:
                      selected?.[objkey] === item?.[objkey] ?('bold'):(null)
                    }
                ]}
        >
          {item?.[value]}
        </Text>
        {selected?.[objkey] === item?.[objkey] ? (<MaterialCommunityIcons name="check" size={18} color="green" />):(null)}
      </TouchableOpacity>
    );
  };
  return {OptionComponent};
};

const Select = ({
                  touchableComponent=Touchable, 
                  optionComponent=Option,
                  touchableText,
                  title,
                  data=[],
                  objkey='id',
                  objvalue='name',
                }) => {
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  const {TouchableComponent} = touchableComponent(
                                                    touchableText,
                                                    ()=>setVisible(true),
                                                    selected,
                                                    objvalue
                                                   );
  

  function renderOption(item){
    const {OptionComponent} = optionComponent(item, objvalue, selected, objkey, ()=>toggleSelect(item));
    return <OptionComponent />;
  }
  function toggleSelect(item) {
    if(item?.[objkey] === selected?.[objkey]){
      setSelected(null);
    }
    else{
      setSelected(item);
      setVisible(false);
    }
  }
  return (
    <>
      <TouchableComponent />
      <Modal visible={visible} animationType="slide">
        <SafeAreaView style={{flex:1}}>
          <View style={styles.header}>
            
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>

            <TouchableOpacity onPress={()=>setVisible(false)}>
              <MaterialCommunityIcons name="close" size={30} color="#555" />
            </TouchableOpacity>
          </View>
          <FlatList 
            data={data}
            keyExtractor={(_, index) => String(index)}
            renderItem={({item})=>renderOption(item)}
          />
        </SafeAreaView>
      </Modal>
    </>
  )
}

export default Select;

const styles = StyleSheet.create({
  
  touchableContainer:{
    backgroundColor:'white',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingVertical:12,
    paddingHorizontal:12,
    borderColor:'#e8e8e8',
    // borderBottomWidth:4,
    borderRadius:5,
    borderWidth:1,
    marginVertical:5,
    width:'100%',
  },
  touchableText:{
    // color:'#212121',
    color:'grey',
    fontSize:14,
    fontWeight:'400',
  },
  header:{
    borderBottomColor:'#eee',
    borderBottomWidth:4,
    flexDirection:'row-reverse',
    alignItems: 'center',
    paddingBottom:12,
    paddingHorizontal:12,
  },
  titleContainer:{
    flex:1,
  },
  title:{
    fontSize:18,
    marginLeft:-38,
    fontWeight:'bold',
    color:'#212121',
    textAlign:'center',
  },
  optionContainer:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingVertical:12,
    paddingHorizontal:12,
    borderBottomColor:'#eee',
    borderBottomWidth:1,
  },
  optionText:{
    color:'#212121',
    fontSize:14,
  }
})
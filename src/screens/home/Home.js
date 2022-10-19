import { StyleSheet, Text, View,ScrollView } from 'react-native';
import * as React from 'react';
import { Provider, FAB, DataTable, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';


import {AuthContext} from '../../context/Context';




const Home = () => {

  const {signOut, loginToken} = React.useContext(AuthContext);
  const url = 'http://datacollect-luwero.center/api/datapoints/';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Token '+ loginToken()
  };
  const [records, setRecords] = React.useState(null);
  const [getdata, setGetData] = React.useState(true);

  React.useEffect(()=>{
    setTimeout(() => {
      setGetData(false);
    }, 800);
  },[]);


  
  if(getdata){
    fetch(
      url,
      {
        method:'GET',
        headers:headers
      }
    )
    .then(response=>{
      return response.json();
    })
    .then(response=>{
      setRecords(response);
    });

    return (
      <View style={styles.loading}>
        <Text style={styles.loadscreen}>Loading Data...</Text>
      </View>
    );
  }

  // //function to record new data entry
  const navigation = useNavigation();
  const addData = ()=>{
    // loginToken();
    // signOut();
    navigation.navigate('NewRecord');
  };
  const viewDetail =(index)=>{
    console.log(index);
  };

  const uniqueKey = ()=>{
    return uuid.v4();
  };
  return (
    <Provider>
    <View style={styles.container}>
      <Card>
      <ScrollView>
      <DataTable>
        <DataTable.Header style={styles.databeHeader}>
        <DataTable.Title>#</DataTable.Title>
          <DataTable.Title sortDirection='descending'>Village</DataTable.Title>
          <DataTable.Title sortDirection='descending'>parish</DataTable.Title>
          {/* <DataTable.Title sortDirection='descending'>CordY</DataTable.Title> */}
          <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>

        {
          records.map((data,index)=>(
            <>
              <DataTable.Row onPress={()=>viewDetail(index+1)} key={()=>uniqueKey()} style={styles.databeBox}>
                <DataTable.Cell style={styles.cellStyle}>{data.id}</DataTable.Cell>
                <DataTable.Cell style={styles.cellStyle}>{data.village}</DataTable.Cell>
                <DataTable.Cell style={styles.cellStyle}>{data.parish}</DataTable.Cell>
                {/* <DataTable.Cell style={styles.cellStyle}>{data.owner}</DataTable.Cell> */}
                <DataTable.Cell style={styles.cellStyle}>
                  <MaterialCommunityIcons name="check" size={18} color="green" />
                </DataTable.Cell>
              </DataTable.Row>
            </>
          ))
        }

        {/* <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={(page) => setPage(page)}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={'Rows per page'}
        /> */}
      </DataTable>
      </ScrollView>
      </Card>
      <FAB 
        style={styles.fab}
        icon='plus'
        size='large'
        onPress={addData}
        // onPress={signOut}
      />
    </View>
    </Provider>
  )
}

export default Home;

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  fab:{
    position:'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
    marginBottom:60,
    width:'25%',
    // height:'10%',
    alignItems: 'center',
  },
  title:{
    margin: 10,
    fontSize: 15,
    fontSize: 35
  },
  mainbox:{
    textAlign:'center',
    margin: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  databeBox:{
    margin: 10,
    textAlign: 'center',
  },
  databeHeader:{
    margin: 10,
    textAlign: 'left', 
  },
  cellStyle:{
    paddingLeft:5,
    paddingRight:5,
    alignItems: 'center',
  },
  loading:{
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    // padding:150,
    textAlignVertical:'center',
    textAlign: 'center',
  },
  loadscreen:{
    textAlignVertical:'center',
    textAlign: 'center',
    marginTop:150,
    color: 'grey',
    fontWeight:'bold',
    fontSize:30,
  }
});
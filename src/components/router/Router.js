import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Authstack from '../../screens/authstack/Authstack';
import Appstack from '../../screens/appstack/Appstack';
// import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../../context/Context';
import {StyleSheet,View, Text} from 'react-native';
import {getToken, setToken,removeToken} from '../../storage/Storage';



const Router = () => {
  const url = 'http://datacollect-luwero.center/api/auth/';
  const headers = {
    accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json',
  };
  const currentLoginState = {
    isLoading:true,
    username:null,
    userToken:null,
  };

  const loginReducer = (prevState, action)=>{
    switch (action.type) {
      case 'LOGIN':
        return{
          ...prevState,
          username:action.username,
          userToken:action.token,
          isLoading:false,
        }; 
      case'LOGOUT':
        return{
          ...prevState,
          username:null,
          userToken:null,
          isLoading:false,
        };
      case 'SIGNUP':
        return{
          ...prevState,
          username:action.username,
          userToken:action.token,
          isLoading:false,
        };    
      default:
        return{
          ...prevState,
          userToken:action.token,
          isLoading:false,
        }; 
    }
  };

  //create reducer
  const [loginState, dispatch] = React.useReducer(loginReducer, currentLoginState);

  const authContext = React.useMemo(()=>({
    loginToken:()=>{
      // alert(loginState.userToken);
      return loginState.userToken;
    },
    loginUser:()=>{
      // return login username  
      return loginState.username;
    },
    signIn:(data)=>{
      fetch(
        url,
        {
          method: 'POST',
          headers:headers,
          body:JSON.stringify({username:data.username,password:data.password})
        }
      )
      .then(response =>{
        return response.json();
      })
      .then(response=>{
        if(Object.keys(response).includes("token")){
          dispatch({type:'LOGIN',username:data.username,token:response.token});
        }
        else{
          alert("Please enter valid username and password");
        }
      });
    },
    signOut:()=>{
      dispatch({type:'LOGOUT'});
    },
    signUp:()=>{},
  }));

  React.useEffect(()=>{
    setTimeout(() => {
      dispatch({token:loginState.userToken});
    }, 1000);
  },[]);

   
  if(loginState.isLoading){
    return (
      <View style={styles.loading}>
        <Text style={styles.loadscreen}>Still loading...</Text>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken == null ? (
          <><Authstack /></>
        ):(
          <><Appstack /></>
        )} 
      </NavigationContainer >
    </AuthContext.Provider>
  )
};



const styles = StyleSheet.create({
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

export default Router;


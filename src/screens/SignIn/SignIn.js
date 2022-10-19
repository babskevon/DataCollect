import { View, Image, useWindowDimensions, ScrollView } from 'react-native';
import * as React from 'react';
import Logo from '../../../assets/img/logo.png';
import { CustomInput, CustomButton } from '../../components';
import {styles} from './style';
import {AuthContext} from '../../context/Context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



function SignIn() {
    const {height} = useWindowDimensions();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {signIn} = React.useContext(AuthContext);


  return (
    <KeyboardAwareScrollView 
      // style={styles.root}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.root}
      scrollEnabled={false}
    >
      <Image 
        source={Logo} 
        style={[styles.logo, {height:height*0.3}]} 
        resizeMode="contain" 
      />

      
      <CustomInput 
        placeholder="Username" 
        value={username} 
        setValue={setUsername} 
      />
      <CustomInput 
        placeholder="Password" 
        value={password} 
        setValue={setPassword} 
        secureTextEntry={true}
      />
      <CustomButton
        text="Sign In"
        // onPress={signIn}
        onPress={()=>signIn({username:username,password:password})}
        // onPress={SignIn({username:username,password:password})}
        type="PRIMARY"
      />
      <CustomButton
        text="Forgot Password?"
        // onPress={forgotPassword}
        type="TERTIARY"
      />
    </KeyboardAwareScrollView> 
  )
}




export default SignIn; 
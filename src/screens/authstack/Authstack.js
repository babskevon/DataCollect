import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {SignIn, ResetPassword} from '../';
const Stack = createNativeStackNavigator();
const Authstack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen 
            name="SignIn" 
            component={SignIn} 
            options={{
                title: 'DataCollect',
                headerTitleAlign: 'center',
            }} 
        />
        <Stack.Screen 
            name="ResetPassword" 
            component={ResetPassword} 
            options={{
                title: 'Reset Password',
                headerTitleAlign: 'center',
            }}
        />
    </Stack.Navigator>
  )
}

export default Authstack;
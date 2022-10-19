import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { 
            Home,
            LocationDetails, 
            ViewAll, 
            ProjectDetails, 
            SubmitDetails
        } from '../';

const Appstack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
            name="Home" 
            component={Home}
            options={{
                title: 'Home',
                headerTitleAlign: 'center',
                headerBackVisible:false,
            }}
        />
        <Stack.Screen 
            name="NewRecord" 
            component={LocationDetails}
            options={{
                title: 'Location Details',
                headerTitleAlign: 'center',
                // headerBackVisible:false,
            }}
        />
        <Stack.Screen name="ViewAll" component={ViewAll} />
        <Stack.Screen 
            name="ProjectDetails" 
            component={ProjectDetails} 
            options={{
                title: 'Project Details',
                headerTitleAlign: 'center',
                // headerBackVisible:false,
            }}
        />
        <Stack.Screen 
            name="submitdata" 
            component={SubmitDetails} 
            options={{
            title: 'Continue...',
            headerTitleAlign: 'center',
          // headerBackVisible:false,
        }}
      />
    </Stack.Navigator>
  )
}

export default Appstack;
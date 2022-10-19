import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import {styles} from './style'
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const CustomButton = ({onPress,text,type="PRIMARY", bgColor, fgColor,style}) => {
    return (
        <Pressable 
            onPress={onPress} 
            style={[
                styles.container, 
                styles[`container_${type}`],
                bgColor ? {backgroundColor:bgColor}:{},
                style
            ]}
        >
            <Text 
                style={[
                    styles.text, 
                    styles[`text_${type}`],
                    fgColor ? {color:fgColor}:{},
                ]}
            >{text}</Text>
        </Pressable>
    );
};

export default CustomButton;

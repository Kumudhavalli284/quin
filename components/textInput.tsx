import React, { useState } from 'react';
import{View,Text,StyleSheet,Dimensions} from 'react-native';
import { TextInput ,HelperText} from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log(windowWidth,windowHeight);

export default function TextInputFld(this: any, props:any){
    console.log("props",props);
   const[textInputValue,setTextInputValue]=useState('')
   const onChange=(newText: string)=>{
    setTextInputValue(newText);
     console.log(newText);
     
   }
    const isValid = (inputValue: string) => {
     if (inputValue.length > 0) {
      return true;
    }else{
      return false;
    }
    
      }
   const showErrorMessage = (inputValue: string) => {
    if (inputValue.length === 0) {
      return props.errorMsg
    }
  } 
    return(
      
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput 
            style={styles.textInput}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            value={textInputValue}
            keyboardType={props.type}
            onChangeText={newText => onChange(newText)}
            mode="outlined"
            outlineColor="#fff1"
            contentStyle={{backgroundColor:'#fff3' }}
            outlineStyle={{backgroundColor:'#fff3',borderColor:"grey",borderRadius:18}}
            secureTextEntry={props.isPass ? true : false}
            />
             <View style={styles.helpersWrapper}>
          <HelperText
            type="error"
            visible={props.visible ? true : false}
            style={styles.helper}>
            {showErrorMessage(textInputValue)}
          </HelperText>
        </View>
        </View>
    )
}
const styles= StyleSheet.create({
    container:{
      margin:3,
      
    },
    textInput:{
        padding:2,
        width:300,
    },
    label:{
        fontWeight:"bold",
        margin:10,
        fontSize:18,
    },
    helpersWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 0,
    
      },
      helper: {
        flexShrink: 1,
        margin: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
    
      },

})
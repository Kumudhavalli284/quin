import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
 import TextInput from '../components/textInput';
import {HelperText} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const img = require('../../assets/splashscreen.png');
import {useNavigation} from '@react-navigation/native';

export default function Login() {
   const [mail, setMail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(false);
   const navigation = useNavigation();
   const onClick = () => {
      // setSigned(!signed);
    //  navigation.navigate('SignUp');
   };
   const showErrorMessage = (inputValue: string) => {
     if (inputValue.length === 0) {
       return 'Please enter mail';
     }
   };
   const onButtonLoginClick = () => {
     if ((mail.length && password.length) == 0) {
       setError(true);
       auth()
         .signInWithEmailAndPassword('kumudha123@gmail.com', 'kumudha@123')
         .then(() => {
           console.log('User account created & signed in!');
         })
         .catch(error => {
           if (error.code === 'auth/email-already-in-use') {
             console.log('That email address is already in use!');
           }

           if (error.code === 'auth/invalid-email') {
             console.log('That email address is invalid!');
           }

           console.error(error);
         });
     }
   };
   const onPasswordForgot = () => {};

  return (
     <View style={{flex: 1, height: 80}}>
       <ScrollView style={{backgroundColor: 'white'}}>
         <View style={styles.container}>
           {/* <View style={{backgroundColor: 'white', marginLeft: 52}}>
             <Image source={img} />
           </View> */}
           <Text style={styles.loginText}>LOGIN</Text>
           {/* <TextInput
             placeholder="Enter your email ID"
             label="Email ID"
             type="email-address"
             maxLength={30}
             regexp={'/^[a-zA-Z0-9_@.s]/'}
             errorMsg="Please enter your email ID"
             value={mail}
             visible={error ? true : false}
             isPass={false}
           />  */}
           <View style={{width: 270, margin: 15}}>
             <Text style={styles.label}>Email ID</Text>
             <TextInput
               placeholder="Enter your email ID"
               label="Email ID"
               onChangeText={(mail: React.SetStateAction<string>) => setMail(mail)}
               keyboardType="email-address"
               maxLength={30}
               value={mail}
               mode="outlined"
               style={{marginBottom: 12}}
             />
             <HelperText type="error" visible={true} style={styles.helper}>
               {showErrorMessage(mail)}
             </HelperText>
             <Text style={styles.label}>Password</Text>
             <TextInput
               placeholder="Enter your password"
               label="Password"
               maxLength={30}
               value={password}
               keyboardType="visible-password"
               onChangeText={(password: React.SetStateAction<string>) => setPassword(password)}
               mode="outlined"
               secureTextEntry={false}
                // right={<TextInput.Icon icon="eye" />}
             />
           </View>
           <TouchableOpacity onPress={onPasswordForgot}>
             <Text style={{fontWeight: 'bold', fontSize: 14, paddingTop: 5}}>
               Forgot password ?
             </Text>
           </TouchableOpacity>

           <View style={styles.containerButton}>
             <TouchableOpacity
               style={styles.touchable}
               onPress={onButtonLoginClick}>
               <Text style={styles.buttonText}>Login</Text>
             </TouchableOpacity>
           </View>
           <TouchableOpacity onPress={onClick}>
             <Text style={{fontWeight: 'bold', fontSize: 14}}>
               Are you new ? Create an account.
             </Text>
           </TouchableOpacity>
         </View>
       </ScrollView>
     </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 14,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 30,
    paddingTop: 12,
    fontWeight: 'bold',
  },
  containerButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  touchable: {
    backgroundColor: '#eb004e',
    padding: 15,
    borderRadius: 24,
    width: 140,
    borderWidth: 1,
    borderColor: '#fad7e3',
  },
  label: {
    fontWeight: 'bold',
    margin: 10,
    fontSize: 18,
  },
  helper: {
    flexShrink: 1,
    margin: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

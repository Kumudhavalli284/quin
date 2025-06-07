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
import auth from '@react-native-firebase/auth';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const img = require('../../assets/splashscreen.png');
import {useNavigation} from '@react-navigation/native';

export default function SignUp() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const onClick = () => {
      navigation.navigate('Login')
  };
  const onButtonSignInClick = () => {
    if (
      (mail.length &&
        number.length &&
        mail.length &&
        password.length &&
        confirmPass.length) == 0
    ) {
      setError(true);
      auth()
        .createUserWithEmailAndPassword(
          'kumudhavarshu@gmail.com',
          'kumudha@123',
        )
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
    } else {
      console.log('error');
    }
  };
  return (
    <View style={{flex: 1, height: 80}}>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={{backgroundColor: 'white'}}>
            <Image source={img} />
          </View>
          <Text style={styles.loginText}>SIGNUP</Text>
          <View>
            <TextInput
              placeholder="Enter your name"
              label="Name"
              type="name-phone-pad"
              maxLength={30}
              regexp={'/^[a-zA-Z0-9_@.,s]'}
              errorMsg="Please enter your full name"
              value={name}
              visible={error ? true : false}
              isPass={false}
            />
            <TextInput
              placeholder="Enter your phone number"
              label="Phone Number"
              type="number-pad"
              maxLength={9}
              regexp={'/^[0-9s]'}
              errorMsg="Please enter your phone number"
              value={number}
              visible={error ? true : false}
              isPass={false}
            />
          </View>
          <TextInput
            placeholder="Enter your email ID"
            label="Email ID"
            type="email-address"
            maxLength={30}
            regexp={'/^[a-zA-Z0-9_@.s]/'}
            errorMsg="Please enter your email ID"
            value={mail}
            visible={error ? true : false}
            isPass={false}
          />
          <TextInput
            placeholder="Enter your password"
            label="Password"
            maxLength={30}
            regexp={'/^[a-zA-Z0-9_@$%s]'}
            errorMsg="Please enter a valid password"
            value={password}
            visible={error ? true : false}
            isPass={true}
          />
          <TextInput
            placeholder="Re-enter your password"
            label="Confirm Password"
            maxLength={30}
            regexp={'/^[a-zA-Z0-9_@.,s]'}
            errorMsg="Please re-enter your password"
            value={confirmPass}
            visible={error ? true : false}
            isPass={true}
          />
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={onButtonSignInClick}>
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClick}>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>
              Already have an account ? Login now.
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
});

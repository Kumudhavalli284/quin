import React,{useState,useEffect} from "react";
import {View,Text} from 'react-native';
import { NavigationContainer,useNavigationContainerRef,NavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './Login';
import SignUp from './SignUp';
import Home from './home';
import auth from '@react-native-firebase/auth';
export default function Navigation() {
  const navigationRef = useNavigationContainerRef();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user:any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    // initialRouteName={user ? "Login" : "Home"}
    <NavigationContainer ref={navigationRef}   >
     <Stack.Navigator screenOptions={{
        headerShown: false,
      }} initialRouteName= {!user ? "Login" : "SignUp"}>
        <Stack.Screen  name="Login" component={Login} />
        <Stack.Screen  name="SignUp" component={SignUp} />
        <Stack.Screen name="Home"  component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

 export type NavigatorParamList = {
  Login: undefined
  SignUp: undefined
  Home: undefined
 }

 const Stack = createNativeStackNavigator<NavigatorParamList>()
 

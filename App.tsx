import React, { useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from './pages/Home';
import Login from './pages/Login';
import Finance from './pages/Finance';
import Shopping from './pages/Shopping';
import User from './pages/User';
import Works from './pages/Works';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator 
        screenOptions={{
          headerShown: false,
           contentStyle: { backgroundColor: "#0A1A40" },
           }} 
           initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Finance" component={Finance} />
          <Stack.Screen name="Shopping" component={Shopping} />
          <Stack.Screen name="Works" component={Works} />
          <Stack.Screen name="User" component={User} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1A40',
    alignItems: 'center',
    margin: 'auto'
  },
});

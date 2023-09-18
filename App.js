import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/components/Login';
import index from './src/screen/index';
import React from 'react';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="todos"
          options={{title: 'To-Do List'}}
          component={index}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

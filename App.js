import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/components/Login';
import Index from './src/screen/Index';
import React, {useContext} from 'react';
import {AuthContext} from './src/AuthWrapper';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="todos"
        options={{title: 'To-Do List'}}
        component={Index}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const {isVerified} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isVerified ? <UserStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

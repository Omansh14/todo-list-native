import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/components/Login';
import Index from './src/screen/Index';
import React, {useContext} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {AuthContext} from './src/AuthWrapper';
import auth from '@react-native-firebase/auth';

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
        options={{
          title: 'To-Do List',
          headerRight: () => (
            <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: '#0070FF',
              borderRadius: 6,
              paddingVertical: 8,
              marginVertical: 14,
              alignItems: 'center',
              paddingHorizontal: 10,
            }}
            onPress={() => {
              auth()
                .signOut();
            }}
            >
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>Logout</Text>
          </TouchableOpacity>
          ),
        }}
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

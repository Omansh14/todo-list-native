import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';

const Login = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{flexDirection: 'row', justifyContent: 'center'}}>
        Login/Register to add Todos
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
          Username:
        </Text>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: '#1e90ff',
            backgroundColor: '#fff',
            borderRadius: 6,
            // paddingVertical: 4,
            paddingHorizontal: 16,
            marginVertical: 6,
            width: '65%',
          }}
          placeholder="john.doe@gmail.com"
        />
      </View>

      <Button title="Login" onPress={() => navigation.navigate('todos')} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});

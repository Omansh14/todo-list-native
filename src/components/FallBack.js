import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const FallBack = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={require('../../assets/Todo_Icon.png')}
        style={{height: 300, width: 300}}
      />
      <Text style={{marginTop: 8, color: '#0070FF'}}>
        Start Adding Your Task
      </Text>
    </View>
  );
};

export default FallBack;

const styles = StyleSheet.create({});

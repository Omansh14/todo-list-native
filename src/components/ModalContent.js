import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ModalContent = ({setModalVisible, item}) => {
  return (
    <View
      style={{
        justifyContent: 'start',
        backgroundColor: 'white',
        height: '25%',
        width: '100%',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 16
      }}>
      <Text style={{flex: 1, color: '#212121', fontWeight: 'bold', fontSize: 20, flexDirection: 'row', textAlign: 'center'}}>
        {' '}
        Have you completed the task?
      </Text>
      <View style={{flex: 1}}>
            <Text
              style={{
                color: '#212121',
                fontSize: 16,
                fontWeight: '800',
                marginHorizontal: 6,
              }}>
              Title: {item.title}
            </Text>
            <Text
              style={{
                color: '#212121',
                fontSize: 14,
                fontWeight: '400',
                marginHorizontal: 6,
              }}>
              Description: {item.description}
            </Text>
          </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#000',
          borderRadius: 6,
          paddingVertical: 8,
          marginVertical: 24,
          alignItems: 'center',
          paddingHorizontal: 8,
        }}
        onPress={() => setModalVisible(false)}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ModalContent

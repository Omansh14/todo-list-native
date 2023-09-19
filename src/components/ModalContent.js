import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const ModalContent = ({setModalVisible, item, handleCompletedTask}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}>
      <Text
        style={{
          color: '#212121',
          fontWeight: 'bold',
          fontSize: 20,
          flexDirection: 'row',
          textAlign: 'center',
          marginBottom: 20
        }}>
        {' '}
        Have you completed the task?
      </Text>
      <View>
        <Text
          style={{
            color: '#55565B',
            fontSize: 16,
            fontWeight: '800',
            marginHorizontal: 6,
          }}>
          Title: {item.title}
        </Text>
        <Text
          style={{
            color: '#55565B',
            fontSize: 14,
            fontWeight: '400',
            marginHorizontal: 6,
          }}>
          Description: {item.description}
        </Text>
      </View>
      <View style={{width: '100%', flexDirection: 'row', gap: 8}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#3BB143',
            borderRadius: 6,
            paddingVertical: 8,
            marginVertical: 24,
            alignItems: 'center',
            paddingHorizontal: 8,
          }}
          onPress={() => handleCompletedTask(item)}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            Mark as Complete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '47%',
            backgroundColor: '#ff1616',
            borderRadius: 6,
            paddingVertical: 8,
            marginVertical: 24,
            alignItems: 'center',
            paddingHorizontal: 8,
            opacity: 0.9,
          }}
          onPress={() => setModalVisible(false)}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalContent;

import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import FallBack from '../components/FallBack';

const Todoscreen = () => {
  //local states
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [error, setError] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  //render todos
  const renderTodos = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: '#1e90ff',
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 8,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '000',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.8,
          shadowRadius: 3,
          elevation: 5,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: '800',
              marginHorizontal: 6,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '400',
              marginHorizontal: 6,
            }}>
            {item.description}
          </Text>
        </View>

        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => handleEditTodo(item)}
        />
        <IconButton
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleDeleteTodo(item.id)}
        />
      </View>
    );
  };

  // Add a todo
  const handleAddTodo = () => {
    if (todoTitle && todoDescription) {
      setTodoList([
        ...todoList,
        {id: Math.random(), title: todoTitle, description: todoDescription},
      ]);
      setTodoTitle('');
      setTodoDescription('');
      setError('');
    } else {
      setError('Title and Description are mandatory fields.');
    }
  };

  // Edit a todo

  const handleEditTodo = item => {
    setTodoTitle(item.title);
    setTodoDescription(item.description);
    setEditedTodo(item);
  };

  // Delete a todo

  const handleDeleteTodo = id => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id);
    setError('');
    setTodoTitle('');
    setTodoDescription('');
    setEditedTodo(null);
    setTodoList(updatedTodoList);
  };

  // Update Todo

  const handleUpdateTodo = item => {
    const updatedTodos = todoList.map(item => {
      if (item.id === editedTodo.id && todoTitle && todoDescription) {
        return {...item, title: todoTitle, description: todoDescription};
      }
      return item;
    });
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodoTitle('');
    setTodoDescription('');
    setError('');
  };

  return (
    <SafeAreaView style={{marginHorizontal: 16}}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: '#1e90ff',
          borderRadius: 6,
          paddingVertical: 6,
          paddingHorizontal: 16,
          marginVertical: 6,
        }}
        placeholder="Title"
        value={todoTitle}
        onChangeText={text => {
          setTodoTitle(text);
        }}
      />
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: '#1e90ff',
          borderRadius: 6,
          paddingVertical: 6,
          paddingHorizontal: 16,
        }}
        placeholder="Description"
        value={todoDescription}
        onChangeText={text => {
          setTodoDescription(text);
        }}
      />
      <Text style={{color: '#FF0000'}}>{error}</Text>
      {editedTodo ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            borderRadius: 6,
            paddingVertical: 8,
            marginVertical: 24,
            alignItems: 'center',
          }}
          onPress={() => handleUpdateTodo()}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            borderRadius: 6,
            paddingVertical: 8,
            marginVertical: 24,
            alignItems: 'center',
          }}
          onPress={() => handleAddTodo()}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            Add
          </Text>
        </TouchableOpacity>
      )}
      <FlatList data={todoList} renderItem={renderTodos} />
      {todoList.length <= 0 && <FallBack />}
    </SafeAreaView>
  );
};

export default Todoscreen;

const styles = StyleSheet.create({});

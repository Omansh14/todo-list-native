import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from 'react-native';
import FallBack from '../components/FallBack';
import ModalContent from '../components/ModalContent';

const Todoscreen = () => {
  //local states
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [error, setError] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);

  //render todos
  const renderTodos = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.status === 'PENDING') handleModalValue(index);
        }}>
        <View
          style={{
            backgroundColor: item.status === 'PENDING' ? '#1e90ff' : '#009b00',
            borderRadius: 6,
            paddingHorizontal: 8,
            paddingVertical: 16,
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '000',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 5,
            gap: 10,
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
            {item.status === 'COMPLETED' && (
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: '400',
                  marginHorizontal: 6,
                }}>
                Description: {item.description}
              </Text>
            )}
          </View>
          {item.status === 'PENDING' && (
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                handleEditTodo(item);
              }}>
              <Image
                source={require('../../assets/Pencil.png')}
                style={{height: 25, width: 25}}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              handleDeleteTodo(item);
            }}>
            <Image
              source={require('../../assets/Trash-Bin.png')}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const handleModalValue = index => {
    setIndex(index);
    setModalVisible(true);
  };

  // Handle Completed task

  const handleCompletedTask = item => {
    const updatedTodoList = todoList.filter(todo => todo.id !== item.id);
    const updatedCompleteTaskList = [
      ...completedList,
      {...item, status: 'COMPLETED'},
    ];
    setTodoList(updatedTodoList);
    setCompletedList(updatedCompleteTaskList);
    setModalVisible(false);
  };

  // Add a todo
  const handleAddTodo = () => {
    if (todoTitle && todoDescription) {
      setTodoList([
        ...todoList,
        {
          id: Math.random(),
          title: todoTitle,
          description: todoDescription,
          status: 'PENDING',
        },
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

  const handleDeleteTodo = item => {
    if (item.status === 'PENDING') {
      const updatedTodoList = todoList.filter(todo => todo.id !== item.id);
      setTodoList(updatedTodoList);
    } else {
      const updatedCompleteTaskList = completedList.filter(
        todo => todo.id !== item.id,
      );
      setCompletedList(updatedCompleteTaskList);
    }
    setError('');
    setTodoTitle('');
    setTodoDescription('');
    setEditedTodo(null);
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
      {todoList.length ? (
        <View style={{marginBottom: 8}}>
          <Text style={{color: '#55565B', fontWeight: 'bold', fontSize: 16}}>
            Pending Tasks
          </Text>
        </View>
      ) : null}
      <FlatList data={todoList} renderItem={renderTodos} />
      {completedList.length ? (
        <View style={{marginBottom: 8}}>
          <Text style={{color: '#55565B', fontWeight: 'bold', fontSize: 16}}>
            Completed Tasks
          </Text>
        </View>
      ) : null}
      <FlatList data={completedList} renderItem={renderTodos} />
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            height: '100%',
          }}>
          <ModalContent
            setModalVisible={setModalVisible}
            item={todoList[index]}
            handleCompletedTask={handleCompletedTask}
          />
        </View>
      </Modal>
      {todoList.length <= 0 && completedList.length <= 0 && <FallBack />}
    </SafeAreaView>
  );
};

export default Todoscreen;

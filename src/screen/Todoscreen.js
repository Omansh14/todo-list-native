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
} from 'react-native';
import {IconButton} from 'react-native-paper';
import FallBack from '../components/FallBack';
import ModalContent from '../components/ModalContent';

const Todoscreen = () => {
  //local states
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [error, setError] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);

  //render todos
  const renderTodos = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => handleModal(index)}>
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
          </View>

          <IconButton
            icon="pencil"
            iconColor="#fff"
            onPress={e => {
              e.stopPropagation();
              handleEditTodo(item);
            }}
          />
          <IconButton
            icon="trash-can"
            iconColor="#fff"
            onPress={e => {
              e.stopPropagation();
              handleDeleteTodo(item.id);
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleModal =(index) => {
    setIndex(index);
    setModalVisible(true);
  }

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
      {
        todoList.length ? (
          <View style={{ marginBottom: 8}}>
          <Text style={{color: '#393A3F', fontWeight: 'bold', fontSize: 16}}>Pending Tasks</Text>
        </View>
        ) : null
      }
      <FlatList data={todoList} renderItem={renderTodos} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            height: '100%',
          }}>
          <ModalContent  setModalVisible={setModalVisible} item={todoList[index]}/>
        </View>
      </Modal>
      {todoList.length <= 0 && <FallBack />}
    </SafeAreaView>
  );
};

export default Todoscreen;

const styles = StyleSheet.create({});

import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { IconButton } from 'react-native-paper'

const TodoScreen = () => {
  const [todos, setTodos] = useState<string[]>([])
  const [newTodo, setNewTodo] = useState<string>('')
  const [todoBeingEdited, setTodoBeingEdited] = useState<number>(-1)
  const [todoBeingEditedText, setTodoBeingEditedText] = useState<string>('')

  const handleAddTodo = () => {
    setTodos([...todos, newTodo])
    setNewTodo('')
  }

  const handleDeleteTodo = (index: number) => {
    setTodos(todos.slice(0, index).concat(todos.slice(index + 1)))
  }

  const handleEditTodo = (index: number) => {
    setTodoBeingEdited(index)
    setTodoBeingEditedText(todos[index])
  }

  const handleSaveEditTodo = (index: number) => {
    setTodos(todos.slice(0, index).concat(todoBeingEditedText).concat(todos.slice(index + 1)))
    setTodoBeingEdited(-1)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput 
          placeholder="Add a new task"
          style={styles.input}
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
          />
        <TouchableOpacity 
          style={styles.button}
          onPress={handleAddTodo}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={todos}
        renderItem={({ item, index }) => {
          if (index === todoBeingEdited) {
            return (
              <View key={index} style={styles.todoItemEdit}>
                <TextInput 
                  placeholder="Edit todo"
                  style={styles.input}
                  value={todoBeingEditedText}
                  onChangeText={(text) => setTodoBeingEditedText(text)}
                  />
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => handleSaveEditTodo(index)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            )
          } else {
            return (
              <View key={index} style={styles.todoItem}>
                <Text style={{fontSize: 16}}>{item}</Text>
                <IconButton icon='pencil' onPress={() => handleEditTodo(index)} style={{marginLeft: 'auto', marginRight: 0}}/>
                <IconButton icon='delete' onPress={() => handleDeleteTodo(index)} style={{marginRight: 0}}/>
              </View>
            )
          }
        }}
      />
      {todos.length === 0 && 
      <Image 
        source={require('../../assets/todo-icon.png')}
        style={{width: '90%', alignSelf: 'center', resizeMode: 'contain'}}
        />}
    </View>
  )
}

export default TodoScreen

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 6,
    width: '75%',
    fontSize: 16,
  },
  container: {
    margin: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 6,
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  inputView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  todoItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    padding: 10,
    borderWidth: 2,
    borderRadius: 6,
    marginBottom: 16,
  },
  todoItemEdit: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    width: '100%',
    padding: 10,
    borderWidth: 2,
    borderRadius: 6,
    marginBottom: 16,
  },
})
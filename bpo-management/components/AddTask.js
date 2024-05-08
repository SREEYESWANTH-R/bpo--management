import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios'

const AddTask = () => {
  const [name, setName] = useState('');
  const [work, setWork] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handletasklist = async() => {
        try {
          await axios.post('http://localhost:8081/addtask', { name,work,description,dueDate});
         
          console.log('task added successfully');
        } catch (error) {
          console.error('Error adding task:', error);
          // Handle error, maybe show an error message to the user
        }


    setName('');
    setWork('');
    setDescription('');
    setDueDate('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <Text style={styles.label}>Work:</Text>
      <TextInput
        style={styles.input}
        value={work}
        onChangeText={setWork}
        placeholder="Enter work"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />
      <Text style={styles.label}>Due Date:</Text>
      <TextInput
        style={styles.input}
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="Enter due date"
      />
      <Button title="Add Task" onPress={handletasklist} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
});

export default AddTask;

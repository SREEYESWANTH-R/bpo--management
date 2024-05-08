import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AddWorker = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [completedWork, setCompletedwork] = useState('');  
  const [pendingWork, setPendingWork] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8081/addWorker', { name,password, role,completedWork, pendingWork });
     
      console.log('Worker added successfully');
    } catch (error) {
      console.error('Error adding worker:', error);
      // Handle error, maybe show an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text>Worker Name:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter worker's name"
        style={styles.input}
      />
      <Text>Password:</Text>
      <TextInput
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter worker's password"
        style={styles.input}
      />
      <Text>Role:</Text>
      <TextInput
        value={role}
        onChangeText={setRole}
        placeholder="Enter worker's role"
        style={styles.input}
      />

      <Text>completed_work:</Text>
      <TextInput
        value={completedWork}
        onChangeText={setCompletedwork}
        placeholder="Enter completed work"
        style={styles.input}
      />

      <Text>pending_work:</Text>
      <TextInput
        value={pendingWork}
        onChangeText={setPendingWork}
        placeholder="Enter pending work"
        style={styles.input}
      />

      <Button title="Add Worker" onPress={handleSubmit}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
  },
});

export default AddWorker;

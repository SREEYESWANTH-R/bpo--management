import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const AddWorker = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8081/addWorker', { name,password, role });
      // Handle success, maybe show a success message or redirect to another page
      console.log('Worker added successfully');
    } catch (error) {
      console.error('Error adding worker:', error);
      // Handle error, maybe show an error message to the user
    }
  };

  return (
    <View>
      <Text>Worker Name:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter worker's name"
      />
      <Text>Password:</Text>
      <TextInput
        value={role}
        onChangeText={setPassword}
        placeholder="Enter worker's password"
      />
      <Text>Role:</Text>
      <TextInput
        value={role}
        onChangeText={setRole}
        placeholder="Enter worker's role"
      />
      <Button title="Add Worker" onPress={handleSubmit} />
    </View>
  );
};

export default AddWorker;
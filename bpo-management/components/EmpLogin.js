import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EmpLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    fetch(`http://localhost:8081/authenticate?username=${username}&password=${password}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Welcome'); // Log "Welcome" if authentication is successful
          navigation.navigate('Dashboard'); // Navigate to Dashboard screen
        } else {
          console.log('Authentication failed');
        }
      })
      .catch(error => console.error('Error:', error));
    
    // Clear input fields after login attempt
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default EmpLogin;

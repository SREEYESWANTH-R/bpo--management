import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Homepage = ({ navigation }) => {
  const handleAdminLogin = () => {
    navigation.navigate('AdminLogin'); // Navigate to 'AdminLogin' screen
  };

  const handleUserLogin = () => {
    navigation.navigate('EmpLogin'); // Navigate to 'UserLogin' screen
  };

  return (
    <View style={styles.container}>
      <Button title="Admin Login" onPress={handleAdminLogin} style={styles.button}/>
      <Button title="User Login" onPress={handleUserLogin} style={styles.button}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap:30,
  },
  
});

export default Homepage;


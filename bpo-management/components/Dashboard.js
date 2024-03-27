import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Dashboard = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchUsername(); // Fetch username when component mounts
  }, []);

  const fetchUsername = async () => {
    try {
      const response = await fetch('http://localhost:8081/getUsername/1'); // Replace '1' with the actual user ID
      if (!response.ok) {
        throw new Error(`Failed to fetch username: ${response.status}`);
      }
      const data = await response.json();
      setUsername(data.username);
    } catch (error) {
      console.error('Error fetching username:', error.message);
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const closeOptions = () => {
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>BPO Management</Text>
      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.backIcon} onPress={closeOptions}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.userContainer}>
            <MaterialIcons name="account-circle" size={44} color="black" style={styles.profileIcon} />
            <Text style={styles.username}>{username}</Text>
          </View>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Option 1 clicked')}>
            <Text style={styles.optionText}>Previous Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Option 2 clicked')}>
            <Text style={styles.optionText}>Current Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Option 3 clicked')}>
            <Text style={styles.optionText}>Completed Task</Text>
          </TouchableOpacity>
        </View>
      )}
      {!showOptions && (
        <TouchableOpacity style={styles.iconContainer} onPress={toggleOptions}>
          <MaterialIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  optionsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '20%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    elevation: 3,
    flexDirection: 'column',
  },
  backIcon: {
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileIcon: {
    marginRight: 10,
    marginLeft:20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap:20,
  },
  optionText: {
    marginLeft: 20,
    fontSize: 20,
  },
  username: {
    fontSize: 20,
  },
});

export default Dashboard;

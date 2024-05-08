import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const Dashboard = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchUsername(); // Fetch username when component mounts
    fetchTasks(); // Fetch tasks when component mounts
  }, []);

  const fetchUsername = async () => {
    try {
      const response = await axios.get('http://localhost:8081/user?id=1'); // Replace '1' with the actual user ID
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/tasks'); // Fetch tasks from backend
      setTasks(response.data.filter(task => task.name === 'John_Doe')); // Filter tasks for john_doe
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
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
      <ScrollView style={styles.tasksContainer}>
        <View style={styles.taskRow}>
          {tasks.map((task, index) => (
            <TouchableOpacity key={index} style={styles.taskCard} onPress={() => console.log('Task clicked')}>
              <Text style={styles.taskAttribute}>Name: {task.name}</Text>
              <Text style={styles.taskAttribute}>Work: {task.work}</Text>
              <Text style={styles.taskAttribute}>Description: {task.description}</Text>
              <Text style={styles.taskAttribute}>Due Date: {task.due_date}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  tasksContainer: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    marginLeft: '25%', // Adjusted to avoid overlapping with options container
  },
  taskRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  taskCard: {
    width: '48%', // Adjusted width to accommodate two cards in a row with spacing
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  taskAttribute: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Dashboard;

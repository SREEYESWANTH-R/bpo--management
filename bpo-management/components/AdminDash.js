import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, Button, Dimensions } from 'react-native'; 
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AdminDash = () => { // Passed navigation prop
  const [showOptions, setShowOptions] = useState(false);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const closeOptions = () => {
    setShowOptions(false);
  };

  const handleAddWorker = () => {
    navigation.navigate('AddWorker');
  };

  const handleTask = () => {
    navigation.navigate('AddTask');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Admin Dashboard</Text>
      <View style={styles.contentContainer}>
        {showOptions && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.backIcon} onPress={toggleOptions}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <ScrollView style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
                <Button title="ADD WORKER" onPress={handleAddWorker} />
            </View>
            <View style={[styles.buttonContainer, { marginTop: 10 }]}>
                <Button title="TASK ENTRY" onPress={handleTask} />
            </View>
            </ScrollView>
          </View>
        )}
        {!showOptions && (
          <TouchableOpacity style={styles.iconContainer} onPress={toggleOptions}>
            <MaterialIcons name="menu" size={24} color="black" />
          </TouchableOpacity>
        )}
        <View style={styles.workerDetailsContainer}>
          <ScrollView style={styles.cardContainer}>
            {users.map((user, index) => (
              <View key={index} style={styles.card}>
                <Text>Username: {user.username}</Text>
                <Text>Role: {user.role}</Text>
                <Text>Completed Work: {user.completed_work}</Text>
                <Text>Pending Work: {user.pending_work}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

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

  buttonContainer: {
    marginBottom: 10, // Adjust the amount of space as needed
  },

  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'relative', // Changed to relative positioning
    zIndex: 1,
    marginLeft: 20,
    marginTop: 20,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    elevation: 3,
    width: '10%', // Set width to 20%
  },
  backIcon: {
    marginBottom: 10,
  },
  
  workerDetailsContainer: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 10, // Add horizontal padding to the container
  },
  cardContainer: {
    maxHeight: 600, 
  },
  card: {
    width: (screenWidth - 40) / 2, // Adjusted width dynamically to accommodate two cards in a row with spacing
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10, // Reduced padding
    elevation: 3,
    marginBottom: 20,
  },
});

export default AdminDash;

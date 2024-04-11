import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const AdminDash = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [users, setUsers] = useState([]);

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

  const handleAddWorker =()=>{
    navigation.navigate('AddWorker');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Admin Dashboard</Text>
      <View style={styles.contentContainer}>
        {showOptions && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.backIcon} onPress={closeOptions}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <ScrollView style={{ flex: 1 }}>
              <TouchableOpacity style={styles.option} onPress={handleAddWorker}>
                <Text style={styles.optionText}>ADD WORKER</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>DELETE WORKER</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
        {!showOptions && (
          <TouchableOpacity style={styles.iconContainer} onPress={toggleOptions}>
            <MaterialIcons name="menu" size={24} color="black" />
          </TouchableOpacity>
        )}
        <View style={styles.workerDetailsContainer}>
          {users.map((user, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.card}>
                <Text>Username: {user.username}</Text>
                <Text>Role: {user.role}</Text>
                <Text>Completed Work: {user.completed_work}</Text>
                <Text>Pending Work: {user.pending_work}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
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
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    elevation: 3,
    width: '20%', // Set width to 30%
  },
  backIcon: {
    marginBottom: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  workerDetailsContainer: {
    flex: 1,
    marginLeft: 60,
    marginRight:60,
    marginTop:40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flexBasis: '48%', // Adjust this value as needed to fit 2 cards in a row
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
});

export default AdminDash;

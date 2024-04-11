import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmpLogin from './components/EmpLogin';
import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage';
import AdminLogin from './components/AdminLogin';
import AdminDash from './components/AdminDash';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={Homepage}/>
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="EmpLogin" component={EmpLogin} />
        <Stack.Screen name="Dashboard">
          {(props) => <Dashboard {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AdminDash" component={AdminDash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

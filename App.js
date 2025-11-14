import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TimerScreen from './components/TimerScreen';
import ProfileScreen from './components/ProfileScreen';
import GoalsScreen from './components/GoalsScreen';
import WelcomeScreen from './components/WelcomeScreen';
import { globalStyles } from './styles/globalStyles';

const Tab = createBottomTabNavigator();

export default function App() {
  const [userName, setUserName] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) setUserName(storedName);
      setIsReady(true);
    };
    loadUser();
  }, []);

  if (!isReady) return null;

  if (!userName) {
    return (
      <View style={globalStyles.mainContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0e27" />
        <WelcomeScreen setUserName={setUserName} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e27" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: '#0a0e27', borderTopColor: '#111' },
          tabBarActiveTintColor: '#2e8b57',
          tabBarInactiveTintColor: '#aaa',
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Timer') iconName = 'timer-outline';
            else if (route.name === 'Metas') iconName = 'list-outline';
            else if (route.name === 'Perfil') iconName = 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Timer">
          {(props) => <TimerScreen {...props} userName={userName} />}
        </Tab.Screen>
        <Tab.Screen name="Metas" component={GoalsScreen} />
        <Tab.Screen name="Perfil">
          {(props) => <ProfileScreen {...props} userName={userName} setUserName={setUserName} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

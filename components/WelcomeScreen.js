import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/globalStyles';

export default function WelcomeScreen({ setUserName }) {
  const [name, setName] = useState('');

  const handleContinue = async () => {
    if (!name.trim()) return;
    await AsyncStorage.setItem('userName', name);
    setUserName(name);
  };

  return (
    <View
      style={[
        globalStyles.mainContainer,
        { justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      <Text style={{ color: '#fff', fontSize: 24, marginBottom: 20 }}>
        Bem-vindo(a)!
      </Text>
      <TextInput
        placeholder="Digite seu nome"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: '#1a1a2e',
          color: '#fff',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          width: '80%',
          textAlign: 'center',
        }}
      />
      <TouchableOpacity
        onPress={handleContinue}
        style={{
          backgroundColor: '#2e8b57',
          marginTop: 20,
          paddingHorizontal: 25,
          paddingVertical: 12,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

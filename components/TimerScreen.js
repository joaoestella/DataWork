import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Vibration, FlatList, TextInput, Alert } from 'react-native';
import { saveData, loadData } from '../utils/storage';
import { formatTime } from '../utils/format';
import { globalStyles } from '../styles/globalStyles';
import EnergyModal from './EnergyModal';

export default function TimerScreen({ userName }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [energyLevel, setEnergyLevel] = useState(null);
  const [timerHistory, setTimerHistory] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      const savedSessions = await loadData('sessions', 0);
      const savedTime = await loadData('time', 0);
      const savedRunning = await loadData('running', false);
      const savedStart = await loadData('startTime', null);
      const savedMax = await loadData('maxTime', 0);
      const savedHistory = await loadData('timerHistory', []);

      setSessions(savedSessions);
      setTime(savedTime);
      setRunning(savedRunning);
      setMaxTime(savedMax);
      setTimerHistory(savedHistory);

      // Recupera tempo caso tenha sido pausado
      if (savedRunning && savedStart) {
        const elapsed = Math.floor((Date.now() - savedStart) / 1000);
        setTime(savedTime + elapsed);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (running) {
      saveData('running', true);
      saveData('startTime', Date.now());
      intervalRef.current = setInterval(() => {
        setTime(prev => {
          const newTime = prev + 1;
          saveData('time', newTime);
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      saveData('running', false);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const finishSession = async () => {
    // Evita finalizar sem ter iniciado o cronômetro
    if (!running && time === 0) {
      Alert.alert('Aviso', 'Você precisa iniciar o cronômetro antes de finalizar.');
      return;
    }

    setRunning(false);
    const newCount = sessions + 1;
    setSessions(newCount);
    await saveData('sessions', newCount);

    let message = '';
    if (time > maxTime) {
      setMaxTime(time);
      await saveData('maxTime', time);
      message = `🏆 Parabéns! Novo recorde: ${formatTime(time)}`;
    } else {
      message = `💪 Continue tentando! Seu recorde: ${formatTime(maxTime)}`;
    }

    const newEntry = {
      duration: time,
      date: new Date().toLocaleString(),
      energy: energyLevel,
    };

    const oldHistory = await loadData('timerHistory', []);
    await saveData('timerHistory', [newEntry, ...oldHistory]);
    setTimerHistory([newEntry, ...oldHistory]);

    setTime(0);
    await saveData('time', 0);
    setEnergyLevel(null);

    Vibration.vibrate(400);
    setModalMessage(message);
    setModalVisible(true);
  };

  const clearSessions = async () => {
    setSessions(0);
    setTime(0);
    setRunning(false);
    setTimerHistory([]);
    await saveData('sessions', 0);
    await saveData('time', 0);
    await saveData('timerHistory', []);
  };

  return (
    <View style={globalStyles.mainContainer}>
      <Text style={{ fontSize: 24, color: '#fff', marginBottom: 10, textAlign: 'center' }}>
        Olá, {userName}
      </Text>

      {/* Cronômetro centralizado */}
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Text style={{ fontSize: 56, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
          {formatTime(time)}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => setRunning(!running)}
          style={[globalStyles.buttonPrimary, { marginHorizontal: 10 }]}
        >
          <Text style={globalStyles.buttonText}>{running ? 'Pausar' : 'Iniciar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={finishSession}
          style={[globalStyles.buttonSecondary, { marginHorizontal: 10 }]}
        >
          <Text style={globalStyles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: '#aaa', marginBottom: 5, textAlign: 'center' }}>
        Sessões concluídas: {sessions}
      </Text>

      <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff', marginRight: 10 }}>Avalie sua energia (1 a 5):</Text>
        <TextInput
          value={energyLevel?.toString() || ''}
          onChangeText={val => setEnergyLevel(Number(val))}
          keyboardType="numeric"
          placeholder="1-5"
          placeholderTextColor="#888"
          style={{
            width: 50,
            backgroundColor: '#1B263B',
            color: '#fff',
            textAlign: 'center',
            borderRadius: 10,
            padding: 5,
          }}
        />
      </View>

      <Text style={{ color: '#888', fontSize: 12, marginBottom: 15, textAlign: 'center' }}>
        1=Muito Baixo | 2=Baixo | 3=Médio | 4=Alto | 5=Muito Alto
      </Text>

      <TouchableOpacity
        onPress={clearSessions}
        style={{
          backgroundColor: '#555',
          padding: 10,
          borderRadius: 12,
          alignSelf: 'center',
          marginBottom: 15,
        }}
      >
        <Text style={{ color: '#fff' }}>Limpar Sessões</Text>
      </TouchableOpacity>

      <Text style={{ color: '#fff', fontSize: 20, marginBottom: 10, textAlign: 'center' }}>
        Histórico das Sessões
      </Text>

      <FlatList
        data={timerHistory}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.cardTitle}>
              ⏱ {formatTime(item.duration)} | {item.date}
            </Text>
            <Text style={globalStyles.cardSubtitle}>Energia: {item.energy || '-'}</Text>
          </View>
        )}
      />

      <EnergyModal visible={modalVisible} onClose={() => setModalVisible(false)} message={modalMessage} />
    </View>
  );
}

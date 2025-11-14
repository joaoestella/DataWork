import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { saveData, loadData, clearData } from '../utils/storage';
import { globalStyles } from '../styles/globalStyles';
import EnergyModal from './EnergyModal';

export default function GoalsScreen() {
  const [goalText, setGoalText] = useState('');
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const loadGoals = async () => {
      const saved = await loadData('goals', []);
      setGoals(saved);
    };
    loadGoals();
  }, []);

  const addGoal = async () => {
    if (!goalText.trim()) return;
    const newGoals = [...goals, { title: goalText, done: false }];
    setGoals(newGoals);
    await saveData('goals', newGoals);
    setGoalText('');
  };

  const toggleDone = async (index) => {
    const updated = [...goals];
    updated[index].done = !updated[index].done;
    setGoals(updated);
    await saveData('goals', updated);

    // Se todas as metas concluídas
    if (updated.every(g => g.done)) {
      const oldHistory = await loadData('goalHistory', []);
      const completed = updated.map(g => ({ title: g.title, date: new Date().toLocaleString() }));
      await saveData('goalHistory', [...completed, ...oldHistory]);
      setModalMessage('🎉 Parabéns! Todas as metas concluídas!');
      setModalVisible(true);
    }
  };

  const clearGoals = async () => {
    setGoals([]);
    await saveData('goals', []);
  };

  return (
    <View style={[globalStyles.mainContainer, { padding: 20 }]}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 }}>🎯 Metas</Text>

      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <TextInput
          style={{ flex: 1, backgroundColor: '#1a1f3a', color: '#fff', padding: 12, borderRadius: 12, marginRight: 10 }}
          placeholder="Adicionar meta"
          placeholderTextColor="#888"
          value={goalText}
          onChangeText={setGoalText}
        />
        <TouchableOpacity onPress={addGoal} style={{ backgroundColor: '#2e8b57', padding: 12, borderRadius: 12 }}>
          <Text style={{ color: '#fff' }}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={goals}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => toggleDone(index)}
            style={{
              backgroundColor: item.done ? '#4169e1' : '#2b2b2b',
              padding: 12,
              borderRadius: 10,
              marginBottom: 8
            }}
          >
            <Text style={{ color: '#fff', textDecorationLine: item.done ? 'line-through' : 'none' }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={clearGoals}
        style={{ backgroundColor: '#555', padding: 12, borderRadius: 10, marginTop: 10, alignSelf: 'center' }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Limpar metas</Text>
      </TouchableOpacity>

      <EnergyModal visible={modalVisible} onClose={() => setModalVisible(false)} message={modalMessage} />
    </View>
  );
}

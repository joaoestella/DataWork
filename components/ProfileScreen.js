import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { clearAll, loadData } from '../utils/storage';
import { globalStyles } from '../styles/globalStyles';
import { badgeData } from '../utils/badges';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen({ userName, setUserName }) {
  const [sessions, setSessions] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [badges, setBadges] = useState([]);

  const loadStats = async () => {
    const s = await loadData('sessions', 0);
    const max = await loadData('maxTime', 0);
    setSessions(s);
    setMaxTime(max);

    const unlocked = [];
    if (s >= 1) unlocked.push(badgeData.first);
    if (s >= 10) unlocked.push(badgeData.ten);
    if (max >= 1800) unlocked.push(badgeData.focused); // 30 min
    if (s >= 50) unlocked.push(badgeData.fifty);
    setBadges(unlocked);
  };

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  const resetData = async () => {
    await clearAll();
    setUserName('');
  };

  return (
    <View style={[globalStyles.mainContainer, { padding:20 }]}>
      <Text style={{ color: '#fff', fontSize: 26, marginBottom: 20 }}>Perfil</Text>
      <Text style={{ color: '#8b9dc3', fontSize: 18 }}>Nome: {userName}</Text>
      <Text style={{ color: '#8b9dc3', fontSize: 18 }}>Sessões concluídas: {sessions}</Text>
      <Text style={{ color: '#8b9dc3', fontSize: 18 }}>Recorde: {Math.floor(maxTime/60)} min</Text>

      <Text style={{ color:'#fff', fontSize:20, marginTop:20 }}>🏅 Conquistas</Text>
      <View style={{ flexDirection:'row', marginTop:10, flexWrap:'wrap' }}>
        {badges.map((b,i) => (
          <Text key={i} style={{ fontSize:24, marginRight:10 }}>{b.emoji}</Text>
        ))}
      </View>

      <Text style={{ color:'#aaa', marginTop:10 }}>Legenda das conquistas:</Text>
      <Text style={{ color:'#aaa' }}>🔥 1ª sessão concluída</Text>
      <Text style={{ color:'#aaa' }}>⚡ 10 sessões concluídas</Text>
      <Text style={{ color:'#aaa' }}>🎯 Recorde acima de 30 minutos</Text>
      <Text style={{ color:'#aaa' }}>🏆 50 sessões concluídas</Text>

      <TouchableOpacity
        onPress={resetData}
        style={{ backgroundColor: '#e74c3c', paddingHorizontal:20, paddingVertical:12, borderRadius:12, marginTop:30 }}
      >
        <Text style={{ color:'#fff', fontSize:16 }}>Apagar Dados</Text>
      </TouchableOpacity>
    </View>
  );
}

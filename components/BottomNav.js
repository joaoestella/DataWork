import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function BottomNav({ current, setCurrentScreen }) {
  return (
    <View style={globalStyles.bottomNav}>
      <TouchableOpacity onPress={() => setCurrentScreen('timer')} style={globalStyles.navItem}>
        <Text style={globalStyles.navIcon}>{current === 'timer' ? '⏱️' : '⏱'}</Text>
        <Text style={[globalStyles.navLabel, current === 'timer' && globalStyles.navLabelActive]}>
          Timer
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setCurrentScreen('dashboard')} style={globalStyles.navItem}>
        <Text style={globalStyles.navIcon}>{current === 'dashboard' ? '📊' : '📈'}</Text>
        <Text style={[globalStyles.navLabel, current === 'dashboard' && globalStyles.navLabelActive]}>
          Dashboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setCurrentScreen('goals')} style={globalStyles.navItem}>
        <Text style={globalStyles.navIcon}>{current === 'goals' ? '🎯' : '✅'}</Text>
        <Text style={[globalStyles.navLabel, current === 'goals' && globalStyles.navLabelActive]}>
          Metas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setCurrentScreen('profile')} style={globalStyles.navItem}>
        <Text style={globalStyles.navIcon}>{current === 'profile' ? '👤' : '👥'}</Text>
        <Text style={[globalStyles.navLabel, current === 'profile' && globalStyles.navLabelActive]}>
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}

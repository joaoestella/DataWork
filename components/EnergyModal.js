import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EnergyModal({ visible, onClose, message }) {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex:1,
    backgroundColor:'rgba(0,0,0,0.6)',
    justifyContent:'center',
    alignItems:'center'
  },
  container: {
    backgroundColor:'#1B263B',
    padding:25,
    borderRadius:20,
    width:'80%',
    alignItems:'center',
    elevation:5,
    shadowColor:'#000',
    shadowOpacity:0.3,
    shadowRadius:10
  },
  message: {
    textAlign:'center',
    fontSize:18,
    color:'#fff',
    marginBottom:20
  },
  button: {
    backgroundColor:'#2E8B57',
    paddingHorizontal:30,
    paddingVertical:10,
    borderRadius:12
  },
  buttonText: { color:'#fff', fontSize:16, fontWeight:'600' }
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReelList({ activeTab }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reels – {activeTab}</Text>
      <Text style={styles.sub}>Ici viendront les vidéos verticales 🎥</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#111' 
  },
  text: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: '600' 
  },
  sub: { 
    color: '#777', 
    marginTop: 4 
  }
});

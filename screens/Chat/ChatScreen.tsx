// screens/Chat/Chat.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';

import Friends from './Friends';
import Announcements from './Announcements';
import Discover from './Discover';

const screenWidth = Dimensions.get('window').width;

export default function Chat() {
  const [tab, setTab] = useState<'amis' | 'annonces' | 'vibes'>('amis');

  const renderTab = () => {
    switch (tab) {
      case 'amis':
        return <Friends />;
      case 'annonces':
        return <Announcements />;
      case 'vibes':
        return <Discover />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER TITLE */}
      <View style={styles.header}>
      <View style={styles.placeholder} />

      <Text style={styles.headerText}>Communauté</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => console.log('Ajouter ami')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>


      
      {/* HEADER TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={() => setTab('amis')}>
          <Text style={styles.tab}>Amis</Text>
          {tab === 'amis' && <View style={styles.indicator} />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => setTab('annonces')}>
          <Text style={styles.tab}>Annonces</Text>
          {tab === 'annonces' && <View style={styles.indicator} />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => setTab('vibes')}>
          <Text style={styles.tab}>Connexions+</Text>
          {tab === 'vibes' && <View style={styles.indicator} />}
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={{ flex: 1 }}>
        {renderTab()}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // titre à gauche, bouton à droite
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  placeholder: {
    width: 32, // même largeur que le bouton + 
    height: 32,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'lexend-bold',
    color: Colors.text,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.background,
  },
  tabButton: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
  },
  tab: {
    fontSize: 16,
    color: Colors.secondaryText,
    fontFamily: 'lexend-medium',
  },
  indicator: {
    marginTop: 12,
    height: 3,
    width: screenWidth / 3,
    backgroundColor: Colors.primary,
  },
});

// components/CreateSnatch/CategorySection.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';

const SCREEN_WIDTH = Dimensions.get('window').width;
const NUM_COLUMNS = 4;
const ITEM_MARGIN = 12;
const ITEM_SIZE = Math.floor((SCREEN_WIDTH - ITEM_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS);

type CategoryItem = {
  emoji: string;
  label: string;
};

const categories: CategoryItem[] = [
  { emoji: '🪩', label: 'Soirée' },
  { emoji: '⚽', label: 'Sport' },
  { emoji: '🧠', label: 'Culture' },
  { emoji: '🫕', label: 'Food' },
  { emoji: '🎲', label: 'Jeux' },
  { emoji: '🎯', label: 'Projet' },
  { emoji: '🧘‍♀️', label: 'Bien-être' },
  { emoji: '🌟', label: 'Autre' },
];

export default function CategorySection() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (index: number) => {
    setSelected(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catégorie</Text>
      <View style={styles.grid}>
        {categories.map((cat, index) => {
          const isActive = selected.includes(index);
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.item,
                { 
                    opacity: isActive ? 1 : 0.5,
                    borderWidth: isActive ? 2 : 0,              // ← ajout
                    borderColor: isActive ? Colors.secondaryText : 'transparent', // ← ajout
                }
                ]}
              onPress={() => toggleSelect(index)}
            >
              <Text style={styles.emoji}>{cat.emoji}</Text>
              <Text style={styles.label}>{cat.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', paddingHorizontal: 20, marginTop: 24 },
  title: { color: Colors.secondaryText, fontFamily: Fonts.Regular, marginBottom: 12, fontSize: 16 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginBottom: ITEM_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: { fontSize: 28 },
  label: { fontFamily: Fonts.Medium, color: Colors.secondaryText, marginTop: 4, textAlign: 'center' },
});

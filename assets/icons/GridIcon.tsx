// src/assets/icons/GridIcon.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

interface GridIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const GridIcon: React.FC<GridIconProps> = ({ width = 22, height = 22, color = Colors.secondaryText }) => {
  const squareSize = width / 2.5; // Taille de chaque petit carré
  const gap = squareSize / 3; // Espacement entre les carrés

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={[styles.row]}>
        <View style={[styles.square, { width: squareSize, height: squareSize, borderColor: color }]} />
        <View style={[styles.square, { width: squareSize, height: squareSize, borderColor: color, marginLeft: gap }]} />
      </View>
      <View style={[styles.row, { marginTop: gap }]}>
        <View style={[styles.square, { width: squareSize, height: squareSize, borderColor: color }]} />
        <View style={[styles.square, { width: squareSize, height: squareSize, borderColor: color, marginLeft: gap }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    borderWidth: 2,
    borderRadius: 3,
  },
});

export default GridIcon;

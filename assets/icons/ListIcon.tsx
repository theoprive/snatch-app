import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

interface ListIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ListIcon: React.FC<ListIconProps> = ({ width = 24, height = 24, color = Colors.secondaryText }) => {
  return (
    <View style={[styles.container, { width, height }]}>
      {/* Barre du haut */}
      <View style={[styles.bar, { width: width * 0.5, backgroundColor: color }]} />
      {/* Barre du milieu */}
      <View style={[styles.bar, { width: width * 0.8, backgroundColor: color }]} />
      {/* Barre du bas */}
      <View style={[styles.bar, { width: width * 0.5, backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
    paddingVertical: 2,
  },
  bar: {
    height: 3,
    borderRadius: 1.5,
  },
});

export default ListIcon;

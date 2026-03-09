// components/SnatchCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';

type Props = {
  item: {
    id: string;
    title: string;
    dateStart?: string; // ex: "Ven 12 Juil, 19h00"
    dateEnd?: string;   // optionnel
    image?: any;        // require(...) local ou { uri: ... }
  };
  onPress?: (id: string) => void;
  width?: number;       // largeur optionnelle
  height?: number;      // hauteur optionnelle
};

export default function SnatchCard({ item, onPress, width, height }: Props) {
  const CARD_WIDTH = width || 129;
  const CARD_HEIGHT = height || 272;
  const POSTER_HEIGHT = Math.round((CARD_WIDTH * 3) / 2); // ratio 2:3

  const dateLine = item.dateStart
    ? item.dateEnd
      ? `${item.dateStart} - ${item.dateEnd}`
      : item.dateStart
    : 'Date à venir';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}
      onPress={() => onPress && onPress(item.id)}
    >
      {/* Poster (2:3) */}
      <Image
        source={item.image}
        style={[styles.poster, { height: POSTER_HEIGHT }]}
        resizeMode="cover"
      />

      {/* Contenu sous le poster */}
      <View style={styles.content}>
        {/* Date/heure - 1 ligne max */}
        <Text style={styles.dateText} numberOfLines={1} ellipsizeMode="tail">
          {dateLine}
        </Text>

        {/* Titre - 2 lignes max */}
        <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  poster: {
    width: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 8,
    justifyContent: 'flex-start',
  },
  dateText: {
    fontSize: 11,
    fontFamily: Fonts.Medium,
    color: Colors.secondaryText,
    marginBottom: 6,
  },
  titleText: {
    fontSize: 13,
    fontFamily: Fonts.Bold,
    color: Colors.text,
    lineHeight: 16,
  },
});

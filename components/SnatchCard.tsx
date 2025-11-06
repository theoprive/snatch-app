// components/SnatchCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';

type Props = {
  item: {
    id: string;
    title: string;
    dateStart?: string; // exemple "Ven 12 Juil, 19h00"
    dateEnd?: string;   // optionnel
    image?: any;        // require(...) local ou { uri: ... }
  };
  onPress?: (id: string) => void;
};

const CARD_WIDTH = 129;
const CARD_HEIGHT = 272;
const POSTER_HEIGHT = Math.round((CARD_WIDTH * 3) / 2); // ratio 2:3 -> 129 * 3/2 = 193.5 -> 194

export default function SnatchCard({ item, onPress }: Props) {
  const dateLine = item.dateStart
    ? item.dateEnd
      ? `${item.dateStart} - ${item.dateEnd}`
      : item.dateStart
    : 'Date à venir';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => onPress && onPress(item.id)}
    >
      {/* Poster (2:3) */}
      <Image
        source={item.image}
        style={styles.poster}
        resizeMode="cover"
      />

      {/* Contenu sous le poster */}
      <View style={styles.content}>
        {/* Date/heure - 1 ligne max, tronque si trop long */}
        <Text style={styles.dateText} numberOfLines={1} ellipsizeMode="tail">
          {dateLine}
        </Text>

        {/* Titre - 2 lignes max, tronque si besoin */}
        <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
    // ombre légère (android + ios)
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  poster: {
    width: '100%',
    height: POSTER_HEIGHT,
    // rounded top corners if wanted (but overflow hidden on card will cut)
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

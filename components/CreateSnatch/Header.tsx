// components/CreateSnatch/Header.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';

interface HeaderProps {
  currentUserPhoto?: string | null;
  onSelectActor?: () => void;
}

export default function CreateSnatchHeader({ currentUserPhoto, onSelectActor }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: 0 }]}>
      <View style={[styles.row, { marginTop: insets.top || 0 }]}>
        {/* Avatar à gauche */}
        <TouchableOpacity style={styles.profileSelector} onPress={onSelectActor}>
          <Image
            source={
              currentUserPhoto
                ? { uri: currentUserPhoto }
                : require('../../assets/images/club_logo.png')
            }
            style={styles.profilePic}
          />
          <View style={styles.arrowDown} />
        </TouchableOpacity>

        {/* Titre centré */}
        <Text style={styles.title}>Créer Snatch</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centre horizontalement tous les enfants
    position: 'relative',     // pour permettre position absolute du titre
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  profileSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute', // reste à gauche
    left: 16,
  },
  profilePic: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  arrowDown: {
    width: 0,
    height: 0,
    marginLeft: 6,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.text,
  },
  title: {
    fontSize: 20,          // garde la même taille
    fontWeight: '700',
    color: Colors.text,
    position: 'absolute',   // titre indépendant de l'avatar
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});

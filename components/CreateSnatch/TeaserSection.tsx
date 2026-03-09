import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

type MediaItem = {
  id: string;
  uri: string;
  type: 'image' | 'video';
};

export default function TeaserSection() {
  const [medias, setMedias] = useState<MediaItem[]>([]);
  const horizontalPadding = 40;
  const gap = 12;
  const placeholderWidth = Math.floor((SCREEN_WIDTH - horizontalPadding - gap) / 2);
  const placeholderHeight = Math.round((placeholderWidth / 9) * 16);

  const makeId = () => `${Date.now()}_${Math.floor(Math.random() * 10000)}`;

  const askPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission nécessaire', "L'accès à la galerie est nécessaire pour sélectionner un teaser.");
      return false;
    }
    return true;
  };

  const handleCreateOrEdit = async () => {
    const ok = await askPermission();
    if (!ok) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        quality: 0.85,
      });

      if (result.canceled) return;

      const assets = result.assets ?? [];
      const normalized = assets.map(a => ({
        uri: (a as any).uri ?? '',
        type: (a as any).type ?? 'image',
      })).filter(a => a.uri);

      if (normalized.length === 0) return;

      // 🔹 Si au moins une vidéo est sélectionnée, on prend uniquement la première vidéo
      const videoAssets = normalized.filter(a => a.type === 'video');
      if (videoAssets.length > 0) {
        setMedias([{ id: makeId(), uri: videoAssets[0].uri, type: 'video' }]);
        return;
      }

      // 🔹 Sinon ce sont des images
      const imageAssets = normalized.filter(a => a.type === 'image');
      if (imageAssets.length > 0) {
        // Si une vidéo existe déjà, on ignore les images
        if (medias.some(m => m.type === 'video')) return;
        // Sinon on ajoute les images au carrousel existant
        const newImages = imageAssets.map(i => ({ id: makeId(), uri: i.uri, type: 'image' as const }));
        setMedias(prev => [...prev, ...newImages]);
      }

    } catch (e) {
      console.warn('Picker error', e);
    }
  };

  const handleRemove = (id: string) => setMedias(prev => prev.filter(m => m.id !== id));

  const handleLongPressMakeFirst = (id: string) => {
    setMedias(prev => {
      const idx = prev.findIndex(p => p.id === id);
      if (idx <= 0) return prev; // déjà premier ou pas trouvé
      const item = prev[idx];
      const others = prev.filter(p => p.id !== id);
      return [item, ...others]; // met en première position
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teaser (Pour le Feed)</Text>

      <View style={styles.row}>
        {/* Placeholder gauche */}
        <View style={[styles.placeholderBox, { width: placeholderWidth, height: placeholderHeight }]}>
          <TouchableOpacity style={styles.emptyTouchable} onPress={handleCreateOrEdit} activeOpacity={0.8}>
            <Ionicons name="camera-outline" size={28} color={Colors.secondaryText} />
            <Text style={styles.emptyText}>Ajouter/Modifier{'\n'}Teaser</Text>
          </TouchableOpacity>
        </View>

        {/* Bandeau horizontal droite */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 4, marginLeft: 12 }}
        >
          {medias.map(m => (
            <TouchableOpacity
              key={m.id}
              style={{ width: placeholderWidth, height: placeholderHeight, marginLeft: 8, borderRadius: 10, overflow: 'hidden' }}
              onLongPress={() => handleLongPressMakeFirst(m.id)}
              activeOpacity={0.9}
            >
              {m.type === 'video' ? (
                <Video
                  source={{ uri: m.uri }}
                  style={{ width: '100%', height: '100%' }}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping={false}
                />
              ) : (
                <Image source={{ uri: m.uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
              )}

              <TouchableOpacity
                style={{ position: 'absolute', top: 6, right: 6, zIndex: 10 }}
                onPress={() => handleRemove(m.id)}
              >
                <Ionicons name="close-circle" size={26} color={Colors.primary} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', paddingHorizontal: 20, marginTop: 24 },
  title: { color: Colors.secondaryText, fontFamily: Fonts.Regular, marginBottom: 12, fontSize: 16 },
  row: { flexDirection: 'row', alignItems: 'flex-start' },

  placeholderBox: {
    borderRadius: 10,
    backgroundColor: Colors.cardBackground,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTouchable: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12 },
  emptyText: { color: Colors.secondaryText, fontFamily: Fonts.Medium, textAlign: 'center', marginTop: 8 },
});

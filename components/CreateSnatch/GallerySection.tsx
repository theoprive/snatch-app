// components/CreateSnatch/GallerySection.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_MARGIN = 8;
const NUM_COLUMNS = 4;
const ITEM_SIZE = Math.floor((SCREEN_WIDTH - ITEM_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS);

type MediaItem = {
  id: string;
  uri: string;
  type: 'image' | 'video';
};

export default function GallerySection() {
  const [medias, setMedias] = useState<MediaItem[]>([]);

  const makeId = () => `${Date.now()}_${Math.floor(Math.random() * 10000)}`;

  const askPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission nécessaire', "L'accès à la galerie est nécessaire pour ajouter des médias.");
      return false;
    }
    return true;
  };

  const handleAddMedia = async () => {
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

      const newItems = normalized.map(m => ({ id: makeId(), uri: m.uri, type: m.type as 'image' | 'video' }));
      setMedias(prev => [...prev, ...newItems]);

    } catch (e) {
      console.warn('Picker error', e);
    }
  };

  const handleRemove = (id: string) => setMedias(prev => prev.filter(m => m.id !== id));

  const renderItem = ({ item }: { item: MediaItem }) => (
    <View style={{ width: ITEM_SIZE, height: ITEM_SIZE, margin: ITEM_MARGIN / 2 }}>
      {item.type === 'video' ? (
        <Video
          source={{ uri: item.uri }}
          style={styles.mediaItem}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping={false}
        />
      ) : (
        <Image source={{ uri: item.uri }} style={styles.mediaItem} resizeMode="cover" />
      )}

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemove(item.id)}
      >
        <Ionicons name="close-circle" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galerie</Text>

      {/* Grid preview */}
      <FlatList
        data={medias}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={NUM_COLUMNS}
        scrollEnabled={false}
        contentContainerStyle={{ paddingVertical: 12 }}
      />

      {/* Bouton ajouter */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddMedia} activeOpacity={0.8}>
        <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Ajouter photos/vidéos</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', paddingHorizontal: 20, marginTop: 24 },
  title: { color: Colors.secondaryText, fontFamily: Fonts.Regular, marginBottom: 12, fontSize: 16 },

  addButton: {
    width: 'auto',
    height: 48,
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  addButtonText: {
    color: '#fff',
    fontFamily: Fonts.Medium,
    fontSize: 16,
    marginLeft: 8,
  },

  mediaItem: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 10,
  },
});

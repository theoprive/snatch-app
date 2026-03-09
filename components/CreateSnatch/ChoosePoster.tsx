import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

type ChoosePosterSnatchProps = {
  onPosterSelected: (uri: string) => void;
};

export default function ChoosePosterSnatch({ onPosterSelected }: ChoosePosterSnatchProps) {
  const [posterUri, setPosterUri] = useState<string | null>(null);
  const screenWidth = Dimensions.get('window').width;
  const screeenHeight = Dimensions.get('window').height;
  const posterWidth = screeenHeight / 5.5 // 1/3 de l'écran
  const posterHeight = posterWidth * 3 / 2; // ratio 2:3

  const pickAndCropImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // on croppe après
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      // Crop manuel approximatif 2:3
      const width = asset.width;
      const height = asset.height;
      const targetHeight = Math.min(height, Math.floor(width * 3 / 2));

      const cropResult = await ImageManipulator.manipulateAsync(
        asset.uri,
        [
          { crop: { originX: 0, originY: 0, width: width, height: targetHeight } },
        ],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );

      setPosterUri(cropResult.uri);
      onPosterSelected(cropResult.uri); // on renvoie l'URI au parent
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.posterContainer, { width: posterWidth, height: posterHeight }]}
        onPress={pickAndCropImage}
      >
        {posterUri ? (
          <Image source={{ uri: posterUri }} style={styles.poster} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="image-outline" size={40} color={Colors.secondaryText} />
          </View>
        )}
        <View style={styles.plusIcon}>
          <Ionicons name="add-circle" size={28} color={Colors.text} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 16,
    marginTop: -60,
  },
  posterContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: Colors.background,
    borderRadius: 20,
  },
});

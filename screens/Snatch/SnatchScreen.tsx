import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';

import { AppStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';
import { Snatch } from '../../data/mockDatabase';
import CreateSnatchHeader from '../../components/CreateSnatch/Header';
import ChoosePosterSnatch from '../../components/CreateSnatch/ChoosePoster';
import CreateSnatchCTA from '../../components/CreateSnatch/CreateSnatchCTA';
import EssentielSection from '../../components/CreateSnatch/EssentielSection';
import OptionsSection from '../../components/CreateSnatch/OptionsSection';
import TeaserSection from '../../components/CreateSnatch/TeaserSection'; // <-- import
import GallerySection from '../../components/CreateSnatch/GallerySection';
import CategorySection from '../../components/CreateSnatch/CategorySection';
import { Platform, StatusBar } from 'react-native';
import { useSnatchs } from '../../context/SnatchContext';
import { useUser } from '../../context/UserContext';




const SCREEN_HEIGHT = Dimensions.get('window').height;
const BANNER_HEIGHT = SCREEN_HEIGHT * 0.33; // 1/3
const POSTER_OVERLAP = BANNER_HEIGHT * 0.45;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight ?? 24;



type SnatchScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'MainTabs'>;

export default function SnatchScreen() {
  const navigation = useNavigation<SnatchScreenNavigationProp>();
  const { currentUser } = useUser();
  const userHasProfile = !!currentUser?.hasProfile;
  const [posterUri, setPosterUri] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string>(Colors.background);
  const [snatchName, setSnatchName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [address, setAddress] = useState<string>('');
  const { addSnatch } = useSnatchs();

  useEffect(() => {
    if (!posterUri) {
      setBgColor(Colors.background);
      return;
    }
    setBgColor(Colors.background); // Placeholder pour couleur dominante
  }, [posterUri]);

  const allFieldsFilled = !!posterUri && snatchName.trim().length > 0 && address.trim().length > 0 && !!startDate && !!endDate;

  const handleCreateSnatch = () => {
  if (!currentUser) return;

  const newSnatch: Snatch = {
    id: `s_${Date.now()}`,
    title: snatchName,
    authorId: currentUser.id,
    publishedAt: new Date().toISOString(),
    content: '', // tu pourras récupérer la description plus tard
    image: posterUri ? { uri: posterUri } : require('../../assets/images/eventPosterLarge.png'),
    videoUri: null, 
    participants: [],
    startDate: startDate?.toISOString() || new Date().toISOString(),
    endDate: endDate?.toISOString(),
    location: address,
  };
  
  // Ajouter au contexte global
  addSnatch(newSnatch);

  // Naviguer vers SnatchPublished
  navigation.navigate('SnatchPublished', { snatchId: newSnatch.id });
};


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      {/* HEADER FIXE */}
      <View style={styles.headerWrapper}>
        <CreateSnatchHeader currentUserPhoto={currentUser?.photoUri} />
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: POSTER_OVERLAP + 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* BANNIÈRE */}
        {posterUri && (
          <View style={styles.banner}>
            <Image source={{ uri: posterUri }} style={styles.bannerImage} blurRadius={30} />
            <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />
          </View>
        )}

        {/* POSTER */}
        <View style={styles.posterWrapper}>
          <ChoosePosterSnatch onPosterSelected={setPosterUri} />
        </View>

        {/* Essentiel + Options */}
        <View style={{ marginTop: '35%' }}>
          <EssentielSection
            name={snatchName}
            onChangeName={setSnatchName}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            address={address}
            onChangeAddress={setAddress}
          />
          <OptionsSection />
          <TeaserSection />
          <GallerySection />
          <CategorySection />
        </View>
      </ScrollView>

      {/* CTA FIXE */}
      <View style={styles.ctaWrapper}>
        <CreateSnatchCTA enabled={allFieldsFilled} onPress={handleCreateSnatch} />
      </View>

      {/* OVERLAY */}
      {!userHasProfile && (
        <BlurView intensity={25} tint="dark" style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Text style={styles.unlocked}>🔓</Text>
            <Text style={styles.overlayText}>Crée ton profil pour créer ton premier Snatch.</Text>
            <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('ProfileCreate')}>
              <Text style={styles.ctaText}>Créer Profil</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  headerWrapper: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    zIndex: 30,
  },

  ctaWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 30,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
  },
  overlayContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  overlayText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  unlocked: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: BANNER_HEIGHT,
    overflow: 'hidden',
    zIndex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },

  posterWrapper: {
    position: 'absolute',
    top: POSTER_OVERLAP,
    width: '100%',
    alignItems: 'center',
    zIndex: 20,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
});

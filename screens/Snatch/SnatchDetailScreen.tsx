import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { mockSnatchs, mockUsers, mockClubs } from '../../data/mockDatabase';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomSheet from '@gorhom/bottom-sheet';
import { useSnatchs } from '../../context/SnatchContext';



const screenWidth = Dimensions.get('window').width;

export default function SnatchDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { snatchs } = useSnatchs(); // tous les Snatchs, mock + créés dynamiquement
  const snatch = snatchs.find(s => s.id === id);
  const author = mockUsers.find(u => u.id === snatch?.authorId);

  const insets = useSafeAreaInsets();
  const scaleAnim = new Animated.Value(1);
  const [status, setStatus] = useState<'none' | 'coming' | 'maybe' | 'notComing'>('none');

  
  const bottomSheetRef = useRef<React.ComponentRef<typeof BottomSheet>>(null);
  const snapPoints = useMemo(() => ['50%', '90%'], []);


  const openBottomSheet = () => {
    console.log('BottomSheet ouvert ?');
    bottomSheetRef.current?.expand();
  };


  if (!snatch) return <Text style={{ color: Colors.text }}>Snatch introuvable</Text>;

  const handlePressComing = () => setStatus(prev => (prev === 'coming' ? 'none' : 'coming'));
  const handlePressNotComing = () => setStatus(prev => (prev === 'notComing' ? 'none' : 'notComing'));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Image principale */}
        <View style={styles.imageContainer}>
          <Image source={snatch.image} style={styles.posterImage} resizeMode="cover" />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seeAllButton} onPress={() => console.log('Ouvrir galerie')}>
            <View style={styles.arcBackground}>
              <Text style={styles.seeAllText}>Gallerie</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Titre */}
        <Text style={styles.title}>{snatch.title}</Text>

        {/* Choix de participation — wrapper avec bordure + dividers manuels */}
        <View style={styles.choiceWrapper}>

          {/* Divider entre 1er et 2e */}
          <View style={[styles.divider, { left: '33.33%' }]} />
          {/* Divider entre 2e et 3e */}
          <View style={[styles.divider, { left: '66.66%' }]} />

          {/* Participe */}
          <TouchableOpacity
            style={[
              styles.choiceItem,
              status === 'coming' && styles.choiceSelected
            ]}
            disabled={snatch.checkInEnabled}
            onPress={() => setStatus(status === 'coming' ? 'none' : 'coming')}
          >
            <Text style={[styles.choiceEmoji, status !== 'coming' && { opacity: 0.5 }]}>✅</Text>
            <Text style={[styles.choiceText, status === 'coming' && styles.choiceTextSelected]}>
              Participe
            </Text>
          </TouchableOpacity>

          {/* Peut-être */}
          <TouchableOpacity
            style={[
              styles.choiceItem,
              status === 'maybe' && styles.choiceSelected
            ]}
            onPress={() => setStatus(status === 'maybe' ? 'none' : 'maybe')}
          >
            <Text style={[styles.choiceEmoji, status !== 'maybe' && { opacity: 0.5 }]}>🤔</Text>
            <Text style={[styles.choiceText, status === 'maybe' && styles.choiceTextSelected]}>
              Peut-être
            </Text>
          </TouchableOpacity>

          {/* Ne vient pas */}
          <TouchableOpacity
            style={[
              styles.choiceItem,
              status === 'notComing' && styles.choiceSelected
            ]}
            onPress={() => setStatus(status === 'notComing' ? 'none' : 'notComing')}
          >
            <Text style={[styles.choiceEmoji, status !== 'notComing' && { opacity: 0.5 }]}>❌</Text>
            <Text style={[styles.choiceText, status === 'notComing' && styles.choiceTextSelected]}>
              Ne vient pas
            </Text>
          </TouchableOpacity>

        </View>


        {/* Participants */}
        <Text style={styles.sectionText}>👥 {snatch.participants.length} personnes y vont</Text>

        {/* Créateur */}
        <Text style={styles.sectionText}>🎤 Organisé par {author?.firstName}</Text>

        {/* Description */}
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <TouchableOpacity onPress={openBottomSheet} activeOpacity={0.8}>
            <Text style={{ color: Colors.text, fontSize: 16, lineHeight: 22 }}>
              {snatch.content}
            </Text>
          </TouchableOpacity>

          <BottomSheet
            ref={bottomSheetRef}
            index={-1} // fermé par défaut
            snapPoints={snapPoints}
            enablePanDownToClose
          >
            <View style={{ flex: 1, padding: 20 }}>
              {/* Header */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ width: 40 }} /> {/* placeholder pour centrer titre */}
                <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 18, textAlign: 'center', flex: 1 }}>
                  {snatch.title}
                </Text>
                <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
                  <Text style={{ color: Colors.primary }}>FERMER</Text>
                </TouchableOpacity>
              </View>

              {/* Scrollable content */}
              <ScrollView>
                <Text style={{ color: Colors.text, fontSize: 16, lineHeight: 22 }}>
                  {snatch.content}
                </Text>
              </ScrollView>
            </View>
          </BottomSheet>
        </View>




        {/* Icônes */}
        <View style={styles.iconRow}>
          <Text style={styles.icon}>❤️</Text>
          <Text style={styles.icon}>🔁</Text>
          <Text style={styles.icon}>💬</Text>
        </View>

        {/* CTA ticket */}
        <TouchableOpacity style={styles.ticketButton}>
          <Text style={styles.ticketButtonText}>🎟️ Montrer mon ticket</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* CTA sticky */}
      {snatch.checkInEnabled && (
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <View style={[styles.stickyCTA, { paddingBottom: 10 + insets.bottom }]}>
          <TouchableOpacity style={styles.ticketingCTA} activeOpacity={0.9}>
            <Text style={styles.ticketingText}>Prendre ma place 🎟️</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      )}
    </View>
  );
}

// Styles (inchangés)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  imageContainer: { position: 'relative', width: screenWidth, aspectRatio: 2 / 3 },
  posterImage: { width: '100%', height: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  backButton: { position: 'absolute', top: 40, left: 20, backgroundColor: Colors.cardBackground, padding: 10, borderRadius: 20 },
  backText: { color: Colors.text, fontFamily: Fonts.Bold, fontSize: 18 },
  title: { fontSize: 28, fontFamily: Fonts.Bold, color: Colors.text, margin: 20 },
  sectionText: { fontSize: 16, fontFamily: Fonts.Medium, color: Colors.secondaryText, marginHorizontal: 20, marginBottom: 10 },
  iconRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  icon: { fontSize: 24, color: Colors.secondaryText },
  ticketButton: { backgroundColor: Colors.cardBackground, padding: 15, marginHorizontal: 20, borderRadius: 10, alignItems: 'center' },
  ticketButtonText: { color: Colors.text, fontFamily: Fonts.Bold, fontSize: 16 },
  stickyCTA: { position: 'absolute', bottom: 0, width: '100%', flexDirection: 'column', alignItems: 'center', backgroundColor: Colors.cardBackground, paddingTop: 20, gap: 12 },
  ctaButtonOutline: { borderWidth: 2, borderColor: Colors.primary, backgroundColor: 'transparent', paddingVertical: 12, paddingHorizontal: 60, borderRadius: 30 },
  ctaButton: { borderWidth: 2, borderColor: Colors.primary, backgroundColor: 'transparent', paddingVertical: 12, paddingHorizontal: 60, borderRadius: 30 },
  ctaButtonConfirmed: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  ctaText: { color: Colors.primary, fontFamily: Fonts.Bold, fontSize: 16 },
  ctaTextConfirmed: { color: Colors.text },
  secondaryText: { color: Colors.secondaryText, fontFamily: Fonts.Regular, fontSize: 14, marginTop: 6 },
  safeArea: { backgroundColor: Colors.cardBackground },
  seeAllButton: { position: 'absolute', right: 0, top: '50%', transform: [{ translateY: -20 }], zIndex: 10 },
  arcBackground: { backgroundColor: 'rgba(0,0,0,0.5)', height: 40, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, minWidth: 60 },
  seeAllText: { color: Colors.text, fontWeight: 'bold', fontSize: 14 },

  choiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
  },




  choiceEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },

  choiceText: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
  },

  choiceSelected: {
  backgroundColor: Colors.cardBackground, // léger highlight
  borderWidth: 2,
  borderColor: Colors.secondaryText,
  borderRadius: 14,
},


  choiceTextSelected: {
    color: Colors.text,
    fontWeight: '600',
  },

  ticketingCTA: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  ticketingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

    

    choiceWrapper: {
      flexDirection: 'row',
      borderWidth: 0.5,
      borderColor: Colors.cardBackground, // ou une couleur neutre
      borderRadius: 14,
      overflow: 'hidden',
      marginHorizontal: 16,
      marginTop: 10,
      marginBottom: 10,
      position: 'relative',           // pour les dividers positionnés
      backgroundColor: Colors.background,
    },

    choiceItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 14,
    },

    divider: {
      position: 'absolute',
      width: 1,
      height: '66%',                 // ≈ 2/3 de la hauteur
      backgroundColor: Colors.cardBackground,
      top: '17%',                    // centrer verticalement : (100% - 66%) / 2 ≈ 17%
      zIndex: 10,
    },


});

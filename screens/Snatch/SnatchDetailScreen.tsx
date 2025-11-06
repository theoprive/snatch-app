import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { mockSnatchs, mockUsers, mockClubs } from '../../data/mockDatabase';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';



const screenWidth = Dimensions.get('window').width;

export default function SnatchDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };

  const snatch = mockSnatchs.find(s => s.id === id);
  const club = mockClubs.find(c => c.id === snatch?.clubId);
  const author = mockUsers.find(u => u.id === snatch?.authorId);

  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!snatch) return <Text style={{ color: Colors.text }}>Snatch introuvable</Text>;

  const handleShowTicket = () => {
    alert(`🎟️ Voici ton ticket pour ${snatch.title}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Image principale */}
        <View style={styles.imageContainer}>
          <Image
            source={snatch.image}
            style={styles.posterImage}
            resizeMode="cover"
          />
          {/* Bouton retour */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          {/* Bouton "Tout" en arc de cercle */}
          <TouchableOpacity style={styles.seeAllButton} onPress={() => console.log('Ouvrir galerie')}>
            <View style={styles.arcBackground}>
              <Text style={styles.seeAllText}>Gallerie</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Titre */}
        <Text style={styles.title}>{snatch.title}</Text>

        {/* Participants */}
        <Text style={styles.sectionText}>👥 {snatch.participants.length} personnes y vont</Text>

        {/* Créateur */}
        <Text style={styles.sectionText}>🎤 Organisé par {author?.firstName}</Text>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText} numberOfLines={showFullDescription ? undefined : 3}>
            {snatch.content}
          </Text>
          {!showFullDescription && (
            <TouchableOpacity onPress={() => setShowFullDescription(true)}>
              <Text style={styles.moreText}>PLUS</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Icônes (placeholder) */}
        <View style={styles.iconRow}>
          <Text style={styles.icon}>❤️</Text>
          <Text style={styles.icon}>🔁</Text>
          <Text style={styles.icon}>💬</Text>
        </View>

        {/* CTA ticket */}
        <TouchableOpacity style={styles.ticketButton} onPress={handleShowTicket}>
          <Text style={styles.ticketButtonText}>🎟️ Montrer mon ticket</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* CTA sticky en bas */}
      <View style={styles.stickyCTA}>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>Je participe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.ctaButton, { backgroundColor: Colors.disabledRed }]}>
          <Text style={styles.ctaText}>Je ne participe pas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    position: 'relative',
    width: screenWidth,
    aspectRatio: 2 / 3,
  },
  posterImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: Colors.cardBackground,
    padding: 10,
    borderRadius: 20,
  },
  backText: {
    color: Colors.text,
    fontFamily: Fonts.Bold,
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.Bold,
    color: Colors.text,
    margin: 20,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: Fonts.Medium,
    color: Colors.secondaryText,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  descriptionContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: Fonts.Regular,
    color: Colors.text,
  },
  moreText: {
    color: Colors.primary,
    fontFamily: Fonts.Medium,
    marginTop: 5,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  icon: {
    fontSize: 24,
    color: Colors.secondaryText,
  },
  ticketButton: {
    backgroundColor: Colors.cardBackground,
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  ticketButtonText: {
    color: Colors.text,
    fontFamily: Fonts.Bold,
    fontSize: 16,
  },
  stickyCTA: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.cardBackground,
    width: '100%',
    paddingVertical: 15,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  ctaText: {
    color: Colors.text,
    fontFamily: Fonts.Bold,
    fontSize: 16,
  },
  seeAllButton: {
    position: 'absolute',
    right: 0,                  // coller à droite
    top: '50%',                 // milieu vertical
    transform: [{ translateY: -20 }], // moitié de la hauteur
    zIndex: 10,
  },

  arcBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 40,                 // hauteur fixe
    borderTopLeftRadius: 20,    // moitié de la hauteur
    borderBottomLeftRadius: 20, // idem
    justifyContent: 'center',   // centre verticalement le texte
    alignItems: 'center',       // centre horizontalement
    paddingHorizontal: 15,      // espace horizontal variable
    minWidth: 60,               // largeur minimale
  },

  seeAllText: {
      color: Colors.text,
      fontWeight: 'bold',
      fontSize: 14,
    },
});

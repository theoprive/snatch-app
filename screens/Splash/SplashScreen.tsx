import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme/colors'; // Assure-toi que ce fichier existe et est bien configuré
import { Fonts } from '../../theme/fonts';  // Pareil pour les polices

const { height } = Dimensions.get('window');

export default function SplashScreen({ navigation }: any) {
  // Animations
  const scaleAnim = useRef(new Animated.Value(0.9)).current; // Animation du logo
  const opacityAnim = useRef(new Animated.Value(0)).current; // Animation de la transparence du logo
  const translateYAnim = useRef(new Animated.Value(0)).current; // Animation de la position verticale

  useEffect(() => {
    // Animation d'apparition du logo
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.05,   // Croissance du logo
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,     // Apparition du logo
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Transition vers la position haute pour se préparer à la page suivante
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.7,    // Réduction du logo
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: -(height * 0.22), // Position du logo qui monte
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Petit fondu avant de passer à l'écran suivant
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Après l'animation, on remplace l'écran actuel par l'écran "Access"
      navigation.replace('Access', { fromSplash: true });
    });
  }, []);

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.background]} // fond rouge -> sombre
      style={styles.container}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.Image
        source={require('../../assets/logos/snatch_logo.png')}
        style={[
          styles.logo,
          {
            transform: [
              { scale: scaleAnim },
              { translateY: translateYAnim },
            ],
            opacity: opacityAnim,
          },
        ]}
        resizeMode="contain"
      />
      {/* Utilisation de Text pour afficher le texte avec animation */}
      <Animated.View style={[styles.textContainer, { opacity: opacityAnim }]}>
        <Text style={styles.text}>Snatch.</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centre le logo verticalement
    alignItems: 'center',     // Centre le logo horizontalement
  },
  logo: {
    width: 200,
    height: 200,
  },
  textContainer: {
    position: 'absolute',
    bottom: 40,
  },
  text: {
    fontFamily: Fonts.Bold,
    fontSize: 28,
    color: Colors.text,
  },
});

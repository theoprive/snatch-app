import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { universities } from '../../data/campusList'
import { User } from '../../data/mockDatabase';


type Props = NativeStackScreenProps<AppStackParamList, 'WelcomeScreen'>;
const { width, height } = Dimensions.get('window');


export default function WelcomeScreen({ route, navigation }: Props){
  const user: User = route.params.user; // récupéré depuis VerificationScreen

  // Trouver le campus et le logo
  const campusData = universities.find(u => user.email.toLowerCase().endsWith(u.domain.toLowerCase()));
  console.log('User email:', user.email);
  console.log('Campus recognized:', campusData?.name);

  // Animations
  const barWidth = useRef(new Animated.Value(0)).current;
  const kedgeOpacity = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const ctaOpacity = useRef(new Animated.Value(0)).current;
  const ctaScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // 1️⃣ Barre qui s'allonge
      Animated.timing(barWidth, { toValue: 200, duration: 800, useNativeDriver: false }),

      // 2️⃣ Kedge fade-in
      Animated.timing(kedgeOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),

      // 3️⃣ Logo fade-in
      Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),

      // 4️⃣ CTA fade-in
      Animated.timing(ctaOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start(() => {
      // 5️⃣ Pulse bouton après apparition
      Animated.loop(
        Animated.sequence([
          Animated.timing(ctaScale, { toValue: 1.05, duration: 800, useNativeDriver: true }),
          Animated.timing(ctaScale, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    });
  }, []);

  const handleLetsGo = () => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <View style={[styles.container]}>
        {/* 1. Bienvenue */}
        <Text style={styles.welcomeText}>Bienvenue</Text>

        {/* 2. Barre */}
        <View style={styles.barContainer}>
        <Animated.View style={[styles.barLine, { width: barWidth }]} />
        </View>

        {/* 3. Nom du campus dynamique */}
        <Animated.Text style={[styles.universityName, { opacity: kedgeOpacity }]}>
        {campusData?.name ?? 'Campus inconnu'}
        </Animated.Text>

        {/* 4. Logo dynamique */}
        {campusData && (
        <Animated.Image
            source={campusData.logo}
            style={[styles.logo, { opacity: logoOpacity }]}
            resizeMode="contain"
        />
        )}

        {/* 5. CTA */}
        <Animated.View style={{ opacity: ctaOpacity, transform: [{ scale: ctaScale }] }}>
        <TouchableOpacity style={styles.ctaButton} onPress={handleLetsGo}>
            <Text style={styles.ctaText}>Let's go</Text>
        </TouchableOpacity>
        </Animated.View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    position: 'absolute',
    top: height * 0.25, // fixe à 1/4 du haut
    fontSize: 36,
    fontFamily: Fonts.Bold,
    color: Colors.text,
  },
  barContainer: {
    height: 2,
    marginTop: height * 0.35, // juste sous bienvenue
    marginBottom: 20,
  },
  barLine: {
    height: 2,
    backgroundColor: Colors.text,
  },
  universityName: {
    fontSize: 24,
    fontFamily: Fonts.Medium,
    color: Colors.secondaryText,
    marginBottom: 200,
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
    marginBottom: 50,
    borderRadius: 10,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  ctaText: {
    color: Colors.text,
    fontSize: 18,
    fontFamily: Fonts.Bold,
  },
});

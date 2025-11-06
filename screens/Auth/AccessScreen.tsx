import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { LinearGradient } from 'expo-linear-gradient';
import { getCampusFromEmail } from '../../data/campusList';

const { width, height } = Dimensions.get('window');

export default function AccessScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [page, setPage] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const containsAt = email.includes('@');

  const carouselData = [
    { text: 'Un multipass pour tous tes events', image: require('../../assets/images/multipass_qr.png'), },
    { text: 'Créer/Rejoins ton club', image: require('../../assets/images/club_logo.png'), },
    { text: 'Étudiant exclusivement', image: require('../../assets/images/student_only.png'), },
  ];

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));


    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleNext = () => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) return;

    const campusName = getCampusFromEmail(trimmedEmail) ?? undefined;

    if (campusName) {
        console.log('✅ Email vérifié :', trimmedEmail, '-> Campus :', campusName);
        navigation.navigate('VerificationScreen', { email: trimmedEmail, campus: campusName });
    } else {
        console.log('❌ Email non reconnu :', trimmedEmail);
        navigation.navigate('OupsScreen');
    }
  };



  const handleScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    setPage(index);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: Colors.background }}
    >
      {/* Haut de l'écran */}
      <View style={styles.topContainer}>
        {/* Image de fond */}
        <Image
          source={require('../../assets/images/banner_access.png')}
          style={styles.coverImage}
        />

        {/* Gradient */}
        <LinearGradient
          colors={['transparent', Colors.background]}
          locations={[0.4, 1]}
          style={styles.gradient}
        />

        {/* Logo + Tagline */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logos/snatch_logo.png')}
            style={styles.logo}
          />
          <Text style={styles.tagline}>
            Vis et revis ta vie étudiante avec Snatch.
          </Text>
        </View>
      </View>

      {/* Middle section - input + flèche + croix */}
        <View style={styles.inputWrapper}>
        <TextInput
            style={styles.input}
            placeholder="Entre ton mail étudiant..."
            placeholderTextColor={Colors.secondaryText}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            keyboardAppearance="dark"
        />

    {/* Croix pour effacer */}
        {email.length > 0 && (
            <TouchableOpacity
            onPress={() => setEmail('')}
            style={styles.clearButton}
            >
            <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
        )}

    {/* Bouton flèche */}
        <TouchableOpacity
            style={[
            styles.arrowButton,
            { backgroundColor: containsAt ? Colors.primary : '#3A3A3A' },
            ]}
            onPress={handleNext}
        >
            <Text style={styles.arrowText}>→</Text>
        </TouchableOpacity>
</View>


      {/* Carrousel - visible uniquement si clavier caché */}
      {!isKeyboardVisible && (
        <View style={styles.carouselContainer}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false, listener: handleScroll }
            )}
          >
            {carouselData.map((item, index) => (
             <View key={index} style={styles.carouselItem}>
                {item.image ? (
                    <Image source={item.image} style={styles.carouselImage} resizeMode="contain" />
                ) : (
                    <View style={styles.carouselImagePlaceholder} />
                )}
                <Text style={styles.carouselText}>{item.text}</Text>
            </View>
            ))}
          </Animated.ScrollView>

          {/* Pagination */}
          <View style={styles.pagination}>
            {carouselData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { opacity: page === index ? 1 : 0.3 },
                ]}
              />
            ))}
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    height: height * 0.5,
    backgroundColor: Colors.background,
  },
  coverImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  logo: {
    width: 140,
    height: 140,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8, // pour Android
  },

  tagline: {
    color: '#FFFFFF',
    fontFamily: Fonts.Medium,
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 24,
    marginTop: -16,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    height: 56,
    overflow: 'hidden', // important pour arrondir uniquement la flèche
    // paddingHorizontal: 16,  <-- supprimer ce padding
    },

  input: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontFamily: Fonts.Regular,
    fontSize: 16,
    paddingLeft: 16,  // espace à gauche pour le texte
    paddingRight: 0,  // pas de padding droit pour que le bouton touche le bord
    },

  clearButton: {
    width: 32,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    color: Colors.secondaryText,
    fontSize: 16,
  },
  arrowButton: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // pour coller à la hauteur du champ
  },

  arrowText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  carouselContainer: {
    marginTop: 24,
    flex: 1,
  },
  carouselItem: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImagePlaceholder: {
    width: 200,
    height: 120,
    backgroundColor: '#444',
    marginBottom: 16,
    borderRadius: 8,
  },
  carouselImage: {
    width: 200,
    height: 120,
    marginBottom: 16,
    borderRadius: 8,
  },
  carouselText: {
    color: Colors.secondaryText,
    fontFamily: Fonts.Regular,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
});

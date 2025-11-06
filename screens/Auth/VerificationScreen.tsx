import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Keyboard,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import BackArrow from '../../assets/icons/BackArrowIcon';
import { signInWithEmail } from '../../services/auth';
import { User, mockUsers } from '../../data/mockDatabase';
import { getCampusFromEmail } from '../../data/campusList';

const { width, height } = Dimensions.get('window');

export default function VerificationScreen({ route, navigation }: any) {
  const { email } = route.params;
  const [code, setCode] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height + 20,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleVerify = async () => {
    if (code === '2408') {
        // créer / récupérer l'utilisateur
        let { user, message } = await signInWithEmail(route.params.email);
        console.log(message);
        if (!user) {
            user = {
                id: `u_${Date.now()}`, // simple id unique pour mock
                email: route.params.email,
                campus: getCampusFromEmail(route.params.email) ?? undefined,
                hasProfile: false,
                adminClub: undefined,
                coAdminClubs: [],
                memberClubs: [],
            };

            // ici tu peux l'ajouter à ta mockDB
            mockUsers.push(user); 
        }
        

        // naviguer vers les onglets
        navigation.reset({
            index: 0,
            routes: [{ name: 'WelcomeScreen', params: { user } }],
        });
    } else {
        console.log('Code incorrect');
        // tu peux afficher un toast ou message d'erreur ici
    }
    };


  const handleResend = () => {
    console.log('Code renvoyé à', email);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

        {/* Bouton retour */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <View style={styles.backCircle}>
            <BackArrow width={32} height={32} fill="#FFFFFF" />
          </View>
        </TouchableOpacity>
      <Animated.View
        style={[
          styles.container,
          {
            // Décalage dynamique au clavier
            marginTop: Animated.add(
              new Animated.Value((height - 400) / 2), // hauteur approximative du bloc pour centrer
              keyboardHeight.interpolate({
                inputRange: [0, height],
                outputRange: [0, -100], // limite le décalage
                extrapolate: 'clamp',
              })
            ),
          },
        ]}
      >

        <Text style={styles.title}>Vérifie ton mail</Text>

        <Text style={styles.subtitle}>
          Un code à 4 chiffres a été envoyé à{'\n'}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
          <Text style={styles.resendText}>Renvoyer le code</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={code}
          onChangeText={(text) =>
            setCode(text.replace(/\D/g, '').slice(0, 4))
          }
          keyboardType="number-pad"
          placeholder="____"
          placeholderTextColor="#555"
          textAlign="center"
          maxLength={4}
          autoFocus={true}
          keyboardAppearance="dark"
          selectionColor={Colors.primary} // curseur rouge
        />

        <TouchableOpacity
          onPress={handleVerify}
          disabled={code.length !== 4}
          style={[
            styles.button,
            {
              backgroundColor:
                code.length === 4 ? Colors.primary : '#3A3A3A',
            },
          ]}
        >
          <Text style={styles.buttonText}>Continuer</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 18,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: Fonts.Bold,
    fontSize: 28,
    marginBottom: 12,
  },
  subtitle: {
    color: Colors.secondaryText,
    fontFamily: Fonts.Regular,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  email: {
    color: '#FFFFFF',
    fontFamily: Fonts.Medium,
  },
  resendButton: {
    marginBottom: 20,
  },
  resendText: {
    color: Colors.primary,
    fontFamily: Fonts.Medium,
    fontSize: 15,
  },
  input: {
    width: width * 0.5,
    height: 60,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    color: '#FFFFFF',
    fontSize: 28,
    letterSpacing: 12,
    fontFamily: Fonts.Bold,
    marginBottom: 32,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: Fonts.Medium,
    fontSize: 16,
  },
});

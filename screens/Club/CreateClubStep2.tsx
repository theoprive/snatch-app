// screens/clubs/CreateClubStep2.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Keyboard,
  Animated,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClubStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<ClubStackParamList, 'CreateClubStep2'>;
const AVATAR_SIZE = 120;

export default function CreateClubStep2({ route }: any) {
  const navigation = useNavigation<Nav>();
  const { coAdmins } = route.params;

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [keyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardWillShow', (e) => {
      Animated.timing(keyboardHeight, {
        duration: e.duration,
        toValue: e.endCoordinates.height,
        useNativeDriver: false,
      }).start();
    });
    const hideSub = Keyboard.addListener('keyboardWillHide', (e) => {
      Animated.timing(keyboardHeight, {
        duration: e.duration,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const canContinue = !!photoUri && name.trim().length > 0;

  const goNext = () => {
    if (!canContinue) return;
    navigation.navigate('ClubCreated', { clubId: 'temp-id' });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Header */}
      <Text style={styles.title}>Profil du Club</Text>

      {/* Formulaire avec Scroll si clavier */}
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Photo */}
        <View style={styles.avatarContainer}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholder}>
                <Ionicons name="image-outline" size={50} color={Colors.secondaryText} />
              </View>
            )}
            <View style={styles.plusIcon}>
              <Ionicons name="add-circle" size={28} color={Colors.text} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Nom */}
        <TextInput
          placeholder="Nom du club *"
          placeholderTextColor="#AAA"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {/* Description */}
        <TextInput
          placeholder="Description (optionnelle)"
          placeholderTextColor="#AAA"
          style={[styles.input, styles.description]}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </ScrollView>

      {/* Footer flottant */}
      <Animated.View style={[styles.floatingFooter, { bottom: keyboardHeight }]}>
        <TouchableOpacity
          style={[styles.button, !canContinue && styles.buttonDisabled]}
          disabled={!canContinue}
          onPress={goNext}
        >
          <Text style={styles.buttonText}>Créer le Club</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { color: '#FFF', fontFamily: Fonts.Bold, fontSize: 26, marginTop: 20, marginLeft: 20 },

  formContainer: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 140 },

  avatarContainer: { alignItems: 'center', marginBottom: 24 },
  avatarWrapper: { marginBottom: 12 },
  avatar: { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2 },
  placeholder: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: { position: 'absolute', bottom: 0, right: 0 },

  input: {
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 12,
    color: '#FFF',
    fontFamily: Fonts.Medium,
    fontSize: 16,
    marginBottom: 12,
    letterSpacing: 0,
  },
  description: { height: 150, textAlignVertical: 'top' }, // 5 lignes de texte

  floatingFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  buttonDisabled: { opacity: 0.3 },
  buttonText: { color: '#FFF', fontFamily: Fonts.Bold, fontSize: 16 },
});

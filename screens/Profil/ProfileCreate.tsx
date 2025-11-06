import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getCurrentUser, updateCurrentUser } from "../../services/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../navigation/types";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";
import { Ionicons } from "@expo/vector-icons";

type PropsProfile = NativeStackScreenProps<AppStackParamList, "ProfileCreate">;

export default function ProfileCreate({ navigation }: PropsProfile) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | null>(null);

// Computed pour savoir si le formulaire est valide
const year = birthDate.split("/")[2];
const isFormValid =
  firstName.trim() !== "" &&
  lastName.trim() !== "" &&
  username.trim() !== "" &&
  birthDate.trim().length === 10 &&
  !isNaN(Number(year)) &&
  photoUri !== undefined;



  useEffect(() => {
    (async () => {
      const cur = await getCurrentUser();
      if (!cur) return;
      setUserId(cur.id);
      if (cur.firstName) setFirstName(cur.firstName);
    })();
  }, []);


  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  async function saveProfile() {
    if (!userId) return;

  // Extraire uniquement l’année de naissance (aaaa)
  let yearNum: number | undefined = undefined;
  if (birthDate && birthDate.length === 10) {
    const parts = birthDate.split("/");
    const year = parseInt(parts[2], 10);
    if (!isNaN(year)) {
      yearNum = year;
    }
  }

    await updateCurrentUser({
        firstName,
        lastName,
        username,
        birthYear: yearNum,
        photoUri,
        hasProfile: true,
    });


    navigation.replace("MainTabs");
  }

  const handleClose = () => navigation.goBack();

  const handleDateChange = (text: string) => {
    // Auto-format dd/mm/yyyy
    let cleaned = text.replace(/\D/g, "");
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);
    let formatted = cleaned;
    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    } else if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    setBirthDate(formatted);
  };

  return (
    <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.background }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
        {/* Header fixe */}
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Créer ton profil</Text>
            <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={28} color={Colors.text} />
            </TouchableOpacity>
        </View>

        {/* Contenu scrollable */}
        <ScrollView contentContainerStyle={styles.content}>
            {/* Section 1 */}
            <View style={styles.section}>
            <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage}>
                {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.avatar} />
                ) : (
                <View style={styles.placeholder}>
                    <Ionicons name="image-outline" size={40} color={Colors.secondaryText} />
                </View>
                )}
                <View style={styles.plusIcon}>
                <Ionicons name="add-circle" size={28} color={Colors.text} />
                </View>
            </TouchableOpacity>

            <Text style={styles.subTitle}>Pour mes amis/clubs 🔒</Text>
            <TextInput style={[styles.input, {textAlign: 'left'}]} placeholder="Prénom" placeholderTextColor = {Colors.secondaryText} value={firstName} onChangeText={setFirstName} keyboardAppearance="dark"/>
            <TextInput style={styles.input} placeholder="Nom" placeholderTextColor = {Colors.secondaryText} value={lastName} onChangeText={setLastName} keyboardAppearance="dark"/>
            <TextInput style={styles.input} placeholder="Date de naissance (jj/mm/aaaa)" value={birthDate} onChangeText={handleDateChange} keyboardType="numeric" maxLength={10} keyboardAppearance="dark" />
            </View>

            {/* Ligne séparatrice */}
            <View style={styles.separator} />

            {/* Section 2 */}
            <View style={styles.section}>
            <Text style={styles.subTitle}>Pour mon campus</Text>
            <View style={styles.inputRow}>
                <View style={styles.initialCircle}>
                <Text style={styles.initialText}>{username ? username[0].toUpperCase() : ""}</Text>
                </View>
                <TextInput
                style={[styles.inputPseudo, {textAlign: 'left'}]}
                placeholder="Pseudo"
                placeholderTextColor={Colors.secondaryText}
                value={username}
                onChangeText={text => setUsername(text.replace(/\s/g, '').toLowerCase())}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardAppearance="dark"
                />
            </View>
            </View>
        </ScrollView>

        {/* CTA en bas */}
        <View style={styles.ctaWrapper}>
            <TouchableOpacity
            onPress={saveProfile}
            disabled={!isFormValid}
            style={[styles.saveButton, { backgroundColor: isFormValid ? Colors.primary : Colors.disabledRed }]}
            >
            <Text style={styles.saveButtonText}>Je crée mon profil</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    color: Colors.text,
    fontFamily: Fonts.Bold,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 100, // laisse de l'espace pour le CTA
  },

  section: {
    marginBottom: 0,
    alignItems: "center",
  },

  subTitle: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: Fonts.Bold,
    alignSelf: "center",
    marginBottom: 12,
  },

  avatarWrapper: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: { width: 130, height: 130, borderRadius: 65 },
  placeholder: {
    width: 130, height: 130, borderRadius: 65,
    backgroundColor: Colors.cardBackground,
    justifyContent: "center", alignItems: "center",
  },
  plusIcon: {
    position: "absolute", bottom: 4, right: 4, backgroundColor: Colors.background, borderRadius: 20,
  },

  input: {
    width: "100%", height: 56,
    backgroundColor: Colors.cardBackground,
    color: Colors.text,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 14,
    fontFamily: Fonts.Regular,
    fontSize: 16,
    textAlign: 'left',
  },

  separator: {
    width: "100%", height: 1,
    backgroundColor: Colors.secondaryText,
    marginVertical: 32,
    opacity: 0.3,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  initialCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.background,
    justifyContent: "center", alignItems: "center",
    marginRight: 10,
  },
  initialText: { color: Colors.text, fontFamily: Fonts.Medium, fontSize: 16 },
  inputPseudo: { flex: 1, height: 56, color: Colors.text, fontFamily: Fonts.Regular, fontSize: 16 },

  ctaWrapper: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    width: "100%",
  },
  saveButton: { width: "100%", height: 56, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  saveButtonText: { color: Colors.text, fontFamily: Fonts.Regular, fontSize: 16 },
});


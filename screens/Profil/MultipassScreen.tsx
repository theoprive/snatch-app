// /screens/Profil/MultipassScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Animated } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { useUser } from '../../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

type MultipassNavigationProp = NativeStackNavigationProp<AppStackParamList, 'MultipassScreen'>;

export default function MultipassScreen() {
  const { currentUser } = useUser();
  const navigation = useNavigation<MultipassNavigationProp>();

  const [qrKey, setQrKey] = useState<number>(0);
  const [progress, setProgress] = useState(new Animated.Value(0));

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.loadingText}>Chargement de l’utilisateur...</Text>
      </SafeAreaView>
    );
  }

  // Change le QR code toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setQrKey((prev) => prev + 1);
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start(() => {
        progress.setValue(0);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const qrValue = `${currentUser.id || currentUser.email || 'user-unknown'}-${qrKey}`;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>

        

        {/* QR Code avec logo centré */}
        <View style={styles.qrWrapper}>
          <QRCode
            value={qrValue}
            size={220}
            backgroundColor={Colors.secondaryText}
            color={Colors.cardBackground}
          />
          
        </View>

        {/* Barre de progression */}
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        {/* Titre */}
        <Text style={styles.title}>Mon Multipass</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    color: '#FFF',
    fontFamily: Fonts.Medium,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },

  header: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },

  title: {
    color: '#FFF',
    fontFamily: Fonts.Bold,
    fontSize: 22,
    marginTop: 22,
  },

  qrWrapper: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  progressBarBackground: {
    width: '70%',
    height: 4,
    borderRadius: 3,
    backgroundColor: Colors.cardBackground,
    overflow: 'hidden',
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
});

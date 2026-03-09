import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import SnatchLogoPart from '../../assets/logos/SnatchLogoSplit';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';

const { width, height } = Dimensions.get('window');

export default function OupsScreen({ navigation }: any) {

  return (
    <View style={styles.container}>
      {/* Logo animé */}
      <View style={{ marginBottom: 24 }}>
        <SnatchLogoPart width={215} height={235}/>
      </View>

      {/* Texte principal */}
      <Text style={styles.title}>Oups... 😕</Text>
      <Text style={styles.subtitle}>
        Snatch n’est pas encore disponible sur ton campus.
      </Text>

      {/* Bouton retour */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Changer mon email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: Fonts.Bold,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.secondaryText,
    fontFamily: Fonts.Regular,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: Fonts.Medium,
    fontSize: 16,
  },
});

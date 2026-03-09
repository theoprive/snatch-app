// screens/clubs/ClubCreated.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { ClubStackParamList, MainTabsParamList } from '../../navigation/types';

type ClubNav = NativeStackNavigationProp<ClubStackParamList, 'ClubCreated'>;
type MainTabsNav = BottomTabNavigationProp<MainTabsParamList>;

export default function ClubCreated({ route }: any) {
  const navigation = useNavigation<ClubNav>();
  const { clubId, clubName } = route.params;

  const goToSnatch = () => {
  const parentNav = navigation.getParent<BottomTabNavigationProp<MainTabsParamList>>();
  parentNav?.navigate('CreateSnatch'); // nom exact de la tab
};


  const goToProfile = () => {
    navigation.navigate('ClubProfile', { clubId });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Ton club a été créé !</Text>
          <Text style={styles.subtitle}>
            Tu peux désormais créer des Snatchs au nom de{" "}
            <Text style={styles.clubName}>{clubName}</Text> et être visible sur l’ensemble du campus.
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={goToSnatch}>
            <Text style={styles.buttonText}>Créer un Snatch</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={goToProfile}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Voir Profil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontFamily: Fonts.Bold,
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: '#AAA',
    fontFamily: Fonts.Medium,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  clubName: {
    color: Colors.primary,
    fontFamily: Fonts.Bold,
  },
  footer: {
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: Colors.cardBackground,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: Fonts.Bold,
    fontSize: 16,
  },
  secondaryButtonText: {
    color: Colors.primary,
  },
});

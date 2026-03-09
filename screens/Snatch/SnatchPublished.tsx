import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/types';
import { MaterialIcons } from '@expo/vector-icons';

type SnatchPublishedNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'SnatchPublished'
>;

type Props = {
  route: { params: { snatchId: string } };
};

export default function SnatchPublished({ route }: Props) {
  const navigation = useNavigation<SnatchPublishedNavigationProp>();
  const { snatchId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER avec croix */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'MainTabs', params: { screen: 'Snatch' } }],
            });
          }}
        >
          <MaterialIcons name="close" size={28} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* CONTENU CENTRAL */}
      <View style={styles.content}>
        <Text style={styles.title}>🎉 Snatch publié !</Text>
        <Text style={styles.subtitle}>
          Tu pourras compléter les détails plus tard.
        </Text>
      </View>

      {/* CTA en bas */}
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={() => navigation.navigate('SnatchDetail', { id: snatchId })}
      >
        <Text style={styles.ctaText}>Voir Snatch</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  header: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: 'flex-end', // croix en haut à droite
  },
  closeButton: {
    padding: 12, // zone de toucher confortable
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.secondaryText,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: Colors.cardBackground,
    paddingVertical: 14,
    marginHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

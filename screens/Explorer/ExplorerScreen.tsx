import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SnatchCard from '../../components/SnatchCard';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { universities } from '../../data/campusList';
import { useSnatchs } from '../../context/SnatchContext';
import { useUser } from '../../context/UserContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 129;
const CARD_HEIGHT = 272;

export default function ExploreScreen() {
  const { currentUser } = useUser();
  const { snatchs } = useSnatchs();

  // Navigation vers le Stack parent
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList, 'MainTabs'>>();

  const campusData = currentUser
    ? universities.find(u => currentUser.email.toLowerCase().endsWith(u.domain.toLowerCase()))
    : null;

  const handleOpenSnatch = (id: string) => {
    navigation.navigate('SnatchDetail', { id });
  };

  const mySnatchs = snatchs.filter(s => s.authorId === currentUser?.id);
  const otherSnatchs = snatchs
    .filter(s => s.authorId !== currentUser?.id)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🎓 {campusData?.name || 'Campus inconnu'}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Mes Snatchs */}
        <Text style={styles.sectionTitle}>Mes Snatchs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
          {mySnatchs.map(snatch => (
            <View key={snatch.id} style={{ marginRight: 12 }}>
              <SnatchCard
                item={{
                  id: snatch.id,
                  title: snatch.title,
                  dateStart: formatShortDate(snatch.startDate),
                  dateEnd: snatch.endDate,
                  image: snatch.image,
                }}
                onPress={() => handleOpenSnatch(snatch.id)}
              />
            </View>
          ))}

          {/* CTA Création */}
          <TouchableOpacity
            style={styles.ctaCard}
            onPress={() =>
              navigation.getParent<NativeStackNavigationProp<AppStackParamList>>()?.navigate('SnatchScreen')
            }
          >
            <Text style={styles.ctaPlus}>+</Text>
            <Text style={styles.ctaText}>Créer Snatch</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* À venir */}
        <Text style={styles.sectionTitle}>À venir</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 12 }}>
          {otherSnatchs.map(snatch => (
            <View key={snatch.id} style={{ width: (width - 36) / 2, marginBottom: 12 }}>
              <SnatchCard
                item={{
                  id: snatch.id,
                  title: snatch.title,
                  dateStart: formatShortDate(snatch.startDate),
                  dateEnd: snatch.endDate,
                  image: snatch.image,
                }}
                onPress={() => handleOpenSnatch(snatch.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper : formater date courte
function formatShortDate(iso?: string) {
  if (!iso) return undefined;
  const d = new Date(iso);
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const day = dayNames[d.getDay()];
  const date = d.getDate();
  const month = d.toLocaleString('fr-FR', { month: 'short' });
  const hours = d.getHours().toString().padStart(2, '0');
  const mins = d.getMinutes().toString().padStart(2, '0');
  return `${day} ${date} ${month.replace('.', '')}, ${hours}:${mins}`;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingVertical: 16, paddingHorizontal: 20, backgroundColor: Colors.background },
  headerText: { fontSize: 18, fontFamily: Fonts.Bold, color: Colors.text },
  sectionTitle: { fontSize: 16, fontFamily: Fonts.Bold, color: Colors.text, marginHorizontal: 16, marginVertical: 8 },
  ctaCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaPlus: { fontSize: 36, fontFamily: Fonts.Bold, color: Colors.text },
  ctaText: { fontSize: 12, fontFamily: Fonts.Regular, color: Colors.text, marginTop: 8, textAlign: 'center' },
});

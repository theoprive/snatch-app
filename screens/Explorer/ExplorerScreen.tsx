// screens/ExploreScreen.tsx (extrait)
import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, } from 'react-native';
import { User, mockSnatchs } from '../../data/mockDatabase';
import SnatchCard from '../../components/SnatchCard';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { getCurrentUser } from '../../services/auth';
import { universities } from '../../data/campusList';


type ExploreScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'MainTabs'>;


export default function ExploreScreen() {
  const [user, setUser] = useState<User | null>(null);
  const campusData = user
  ? universities.find(u => user.email.toLowerCase().endsWith(u.domain.toLowerCase()))
  : null;

    useEffect(() => {
    (async () => {
        const cur = await getCurrentUser(); // ou ta fonction pour récupérer l'utilisateur
        if (!cur) return;
        setUser(cur);
    })();
    }, []);

  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const handleOpenSnatch = (id: string) => {
    console.log('Open snatch', id);
        navigation.navigate('SnatchDetail', { id }); // décommente si tu veux la nav
  };

  const renderItem = ({ item }: any) => (
    <SnatchCard item={{
      id: item.id,
      title: item.title,
      dateStart: item.dateStart || item.publishedAt ? formatShortDate(item.publishedAt) : undefined,
      dateEnd: item.dateEnd,
      image: item.image,
    }} onPress={handleOpenSnatch} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{campusData?.name || 'Campus inconnu'}</Text>
      </View>

      <FlatList
        data={mockSnatchs}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ padding: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* helper: minimal short date formatter — adapte selon ton util */
function formatShortDate(iso?: string) {
  if (!iso) return undefined;
  const d = new Date(iso);
  // ex: "Ven 8 Nov, 20:00" — simple
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const day = dayNames[d.getDay()];
  const date = d.getDate();
  const month = d.toLocaleString('fr-FR', { month: 'short' }); // "nov."
  const hours = d.getHours().toString().padStart(2, '0');
  const mins = d.getMinutes().toString().padStart(2, '0');
  return `${day} ${date} ${month.replace('.', '')}, ${hours}:${mins}`;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingVertical: 16, paddingHorizontal: 20, backgroundColor: Colors.background },
  headerText: { fontSize: 18, fontFamily: Fonts.Bold, color: Colors.text, textAlign: 'left' },
  row: { justifyContent: 'space-between', marginBottom: 12 },
});

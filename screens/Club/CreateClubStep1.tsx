import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { mockUsers } from '../../data/mockDatabase';
import { useUser } from '../../context/UserContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClubStackParamList } from '../../navigation/types';

export default function CreateClubStep1() {
  type Nav = NativeStackNavigationProp<ClubStackParamList, 'CreateClubStep1'>;
  const navigation = useNavigation<Nav>();
  const { currentUser } = useUser();

  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const friends = useMemo(() => {
  if (!currentUser) return [];
  return mockUsers
    .filter(u => u.id !== currentUser.id && u.hasProfile)
    .filter(u => (u.firstName ?? '').toLowerCase().includes(search.toLowerCase()));
}, [currentUser, search]);


  const toggleSelect = (id: string) => {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 5) return prev;
      return [...prev, id];
    });
  };

  const canContinue = selected.length >= 1;

  const goNext = () => {
    navigation.navigate('CreateClubStep2', { coAdmins: selected });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Créer mon Club</Text>
        <Text style={styles.subtitle}>Choisis mes co-admins (entre 1 et 5)</Text>
      </View>

      <TextInput
        placeholder="Rechercher un ami"
        placeholderTextColor="#AAA"
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 140 }}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.id);
          return (
            <TouchableOpacity
              style={[styles.userItem, isSelected && styles.userItemSelected]}
              onPress={() => toggleSelect(item.id)}
            >
              <Image source={{ uri: item.photoUri }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.firstName}</Text>
                <Text style={styles.username}>@{item.username}</Text>
              </View>
              <View style={[styles.check, isSelected && styles.checkActive]}>
                {isSelected && <Text style={styles.checkMark}>✔</Text>}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.footer}>
        <Text style={styles.infoText}>
          Les co-admin peuvent scanner les entrées, créer ou modifier des Snatchs.
        </Text>
        <Text style={styles.count}>{selected.length}/5 sélectionnés</Text>
        <TouchableOpacity
          style={[styles.button, !canContinue && styles.buttonDisabled]}
          disabled={!canContinue}
          onPress={goNext}
        >
          <Text style={styles.buttonText}>Continuer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { padding: 20 },
  title: { color: "#FFF", fontFamily: Fonts.Bold, fontSize: 26 },
  subtitle: { color: "#AAA", marginTop: 6, fontFamily: Fonts.Medium },

  searchInput: {
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 12,
    color: "#FFF",
    letterSpacing: 0,
  },

  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: Colors.cardBackground,
  },
  userItemSelected: { borderColor: Colors.primary, borderWidth: 2 },
  avatar: { width: 54, height: 54, borderRadius: 27, marginRight: 14 },
  name: { color: "#FFF", fontFamily: Fonts.Medium, fontSize: 16 },
  username: { color: "#AAA", fontFamily: Fonts.Regular, fontSize: 14 },
  check: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: "#FFF", justifyContent: "center", alignItems: "center" },
  checkActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  checkMark: { color: "#FFF", fontSize: 14, fontWeight: "bold" },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoText: { color: "#AAA", marginBottom: 24, fontFamily: Fonts.Medium, fontSize: 13, textAlign: 'center' },
  count: { color: "#FFF", marginBottom: 10, fontFamily: Fonts.Medium },
  button: { backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 12, alignItems: "center" },
  buttonDisabled: { opacity: 0.3 },
  buttonText: { color: "#FFF", fontFamily: Fonts.Bold, fontSize: 16 },
});

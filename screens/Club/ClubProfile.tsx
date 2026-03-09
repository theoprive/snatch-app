// screens/clubs/ClubProfile.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClubStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { useClub, Snatch } from '../../context/ClubContext';
import { RouteProp} from '@react-navigation/native';

// Typage correct du route
type ClubProfileRouteProp = RouteProp<ClubStackParamList, 'ClubProfile'>;
type RouteProps = {
  params: {
    clubId: string;
  };
};

type Nav = NativeStackNavigationProp<ClubStackParamList, 'ClubProfile'>;

export default function ClubProfile() {
  const route = useRoute<ClubProfileRouteProp>();
  const { clubId } = route.params;
  const navigation = useNavigation<Nav>();
  const { getClubById } = useClub();
  const club = getClubById(clubId);

  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  if (!club) return <Text>Club non trouvé</Text>;

  const snatchs: Snatch[] =
    tab === 'upcoming' ? club.upcomingSnatchs : club.pastSnatchs;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profil du Club</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ModifyClub', { clubId })}>
          <Text style={styles.editButton}>Modifier</Text>
        </TouchableOpacity>
      </View>

      {/* Club info */}
      <View style={styles.clubInfo}>
        <Image source={{ uri: club.photoUri }} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.clubName}>{club.name}</Text>
          <Text style={styles.admins}>
            Admin: {club.admin} | Co-Admin: {club.coAdmin}
          </Text>
        </View>
      </View>

      {/* Description */}
      {club.description ? (
        <Text style={styles.description}>{club.description}</Text>
      ) : null}

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'upcoming' && styles.activeTab]}
          onPress={() => setTab('upcoming')}
        >
          <Text style={[styles.tabText, tab === 'upcoming' && styles.activeTabText]}>À venir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'past' && styles.activeTab]}
          onPress={() => setTab('past')}
        >
          <Text style={[styles.tabText, tab === 'past' && styles.activeTabText]}>Passés</Text>
        </TouchableOpacity>
      </View>

      {/* Snatch list */}
      <FlatList
        data={snatchs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.snatchItem}>
            <Text style={styles.snatchTitle}>{item.title}</Text>
            <Text style={styles.snatchDate}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {tab === 'upcoming' ? "Aucun snatch à venir" : "Aucun snatch passé"}
          </Text>
        }
      />
    </View>
  );
}

const AVATAR_SIZE = 80;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { color: '#FFF', fontFamily: Fonts.Bold, fontSize: 24 },
  editButton: { color: Colors.primary, fontFamily: Fonts.Medium, fontSize: 16 },

  clubInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2 },
  clubName: { color: '#FFF', fontFamily: Fonts.Bold, fontSize: 20 },
  admins: { color: '#AAA', fontFamily: Fonts.Medium, fontSize: 14 },

  description: { color: '#FFF', fontFamily: Fonts.Medium, fontSize: 14, marginBottom: 16 },

  tabs: { flexDirection: 'row', marginBottom: 12 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: Colors.primary },
  tabText: { color: '#AAA', fontFamily: Fonts.Medium },
  activeTabText: { color: '#FFF', fontFamily: Fonts.Bold },

  snatchItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
  },
  snatchTitle: { color: '#FFF', fontFamily: Fonts.Medium, fontSize: 16 },
  snatchDate: { color: '#AAA', fontFamily: Fonts.Regular, fontSize: 12 },
  emptyText: { color: '#AAA', fontFamily: Fonts.Medium, textAlign: 'center', marginTop: 20 },
});

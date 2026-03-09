// screens/Communaute/Announcements.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';

// Types
export type Announcement = {
  id: string;
  type: 'snatch_published' | 'participant_response' | 'friend_participation' | 'organizer_message';
  snatchName?: string;
  text?: string; // message de l'organisateur
  userId?: string; // pour participant/friend
  timestamp: string;
};

export const mockUsers = [
  { id: 'u1', firstName: 'Lucie', photoUri: 'https://i.pravatar.cc/150?img=10' },
  { id: 'u2', firstName: 'Marc', photoUri: 'https://i.pravatar.cc/150?img=20' },
];

export const mockAnnouncements: Announcement[] = [
  { id: 'a1', type: 'snatch_published', snatchName: 'Soirée Electro', timestamp: new Date().toISOString() },
  { id: 'a2', type: 'participant_response', snatchName: 'Soirée Electro', userId: 'u1', timestamp: new Date().toISOString() },
  { id: 'a3', type: 'friend_participation', snatchName: 'Apéro Jazz', userId: 'u2', timestamp: new Date().toISOString() },
  { id: 'a4', type: 'organizer_message', snatchName: 'Soirée Electro', text: 'Code d’entrée : 4506', timestamp: new Date().toISOString() },
];

export default function Announcements() {
  // Trier du plus récent au plus ancien
  const sortedAnnouncements = [...mockAnnouncements].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const renderItem = ({ item }: { item: Announcement }) => {
    let icon = null;
    let photo = null;
    let message = '';

    switch (item.type) {
      case 'snatch_published':
        icon = <Ionicons name="checkmark" size={24} color="white" style={styles.circleIconRed} />;
        message = `Bravo, ton Snatch "${item.snatchName}" a été publié !`;
        break;

      case 'participant_response':
        photo = mockUsers.find(u => u.id === item.userId)?.photoUri;
        message = `${mockUsers.find(u => u.id === item.userId)?.firstName || 'Utilisateur'} vient à "${item.snatchName}"`;
        break;

      case 'friend_participation':
        photo = mockUsers.find(u => u.id === item.userId)?.photoUri;
        message = `Ton ami ${mockUsers.find(u => u.id === item.userId)?.firstName || 'Utilisateur'} va à "${item.snatchName}"`;
        break;

      case 'organizer_message':
        icon = <Ionicons name="mail" size={24} color={Colors.primary} style={{ marginRight: 8 }} />;
        message = `Info importante pour "${item.snatchName}" : ${item.text}`;
        break;
    }

    return (
      <View style={styles.announcementContainer}>
        {photo && <Image source={{ uri: photo }} style={styles.avatar} />}
        {icon}
        <Text style={styles.messageText}>{message}</Text>
        <Text style={styles.timeText}>{formatTimeAgo(item.timestamp)}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={sortedAnnouncements}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

// Fonction simple pour afficher "X min/h/j"
function formatTimeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}j`;
}

const styles = StyleSheet.create({
  announcementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  circleIconRed: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 4,
    marginRight: 8,
  },
  messageText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'lexend-medium',
  },
  timeText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 8,
  },
});

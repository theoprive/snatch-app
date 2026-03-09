// screens/Chat/Friends.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { mockConversations } from '../../data/mockConversations';
import { mockUsers } from '../../data/mockDatabase';
import { ChatStackParamList } from '../../navigation/types';

type FriendsScreenProp = NativeStackNavigationProp<ChatStackParamList, 'ChatHome'>;

export default function Friends() {
  const navigation = useNavigation<FriendsScreenProp>();
  const currentUserId = 'u_théo'; // MVP: user courant
  const [search, setSearch] = useState('');

  const filteredConversations = mockConversations.filter(item => {
    const otherUserId = item.participants.find(id => id !== currentUserId);
    const user = mockUsers.find(u => u.id === otherUserId);
    return user?.firstName?.toLowerCase().includes(search.toLowerCase());
  });

  const renderItem = ({ item }: { item: typeof mockConversations[0] }) => {
    const otherUserId = item.participants.find(id => id !== currentUserId);
    const user = mockUsers.find(u => u.id === otherUserId);
    const lastMessage = item.messages[item.messages.length - 1];

    if (!user || !lastMessage) return null;

    return (
      <TouchableOpacity
        style={styles.conversation}
        onPress={() => navigation.navigate('Conversation', { conversationId: item.id })}
      >
        <Image
          source={{ uri: user.photoUri ?? `https://i.pravatar.cc/150?u=${user.id}` }}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{user.firstName || 'Utilisateur'}</Text>
          <Text style={styles.lastMessage}>{lastMessage.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un ami..."
        placeholderTextColor={Colors.secondaryText}
        value={search}
        onChangeText={setSearch}
      />

      {/* Liste des conversations */}
      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  searchInput: {
    backgroundColor: Colors.cardBackground,
    color: Colors.text,
    fontSize: 16,
    fontFamily: 'lexend-medium',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  conversation: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  avatar: { width: 72, height: 72, borderRadius: 50, marginRight: 12 },
  textContainer: { flex: 1 },
  userName: { fontSize: 20, fontFamily: 'lexend-medium', color: Colors.text },
  lastMessage: { fontSize: 14, color: Colors.secondaryText, marginTop: 4 },
  separator: { height: 1, backgroundColor: '#333', marginVertical: 4 },
});

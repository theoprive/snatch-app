import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { mockConversations } from '../../data/mockConversations';
import { mockUsers } from '../../data/mockDatabase';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  read?: boolean;
};

export default function Conversation() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { conversationId } = route.params;
  const currentUserId = 'u_théo';

  const conversation = mockConversations.find(c => c.id === conversationId);
  const otherUserId = conversation?.participants.find(id => id !== currentUserId);
  const otherUser = mockUsers.find(u => u.id === otherUserId);

  const [messages, setMessages] = useState<Message[]>(conversation?.messages ?? []);
  const [text, setText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      senderId: currentUserId,
      content: text,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages([...messages, newMessage]);
    setText('');
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Image
            source={{ uri: otherUser?.photoUri ?? 'https://i.pravatar.cc/150?img=12' }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{otherUser?.firstName || 'Utilisateur'}</Text>
        </View>
      </View>

      {/* MESSAGES + INPUT */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
        <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View
                style={[
                styles.message,
                item.senderId === currentUserId ? styles.myMessage : styles.theirMessage,
                ]}
            >
                <Text style={styles.messageText}>{item.content}</Text>
            </View>
            )}
            contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Tapez un message..."
            placeholderTextColor="#888"
            multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={22} color={Colors.background} />
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: Colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
  userName: { fontSize: 18, fontFamily: 'lexend-medium', color: Colors.text },

  message: {
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
    maxWidth: '70%',
  },
  myMessage: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: Colors.cardBackground,
    alignSelf: 'flex-start',
  },
  messageText: { color: Colors.text, fontFamily: 'lexend-medium', fontSize: 16 },

  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 8 : 10,
    color: Colors.text,
    fontFamily: 'lexend-small',
    fontSize: 16,
    textAlignVertical: 'center',
    maxHeight: 120,
  },
  sendButton: {
    marginLeft: 8,
    width: 36,
    height: 36,
    borderRadius: 22.5,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

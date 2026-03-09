// screens/Communaute/Discover.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Switch,
  Modal,
  Clipboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { friendsOfFriends, sameSnatchUsers, ConnexionsUser } from '../../data/mockConnexions';

export default function Discover() {
  const [friendsConsent, setFriendsConsent] = useState(true);
  const [snatchConsent, setSnatchConsent] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ConnexionsUser | null>(null);

  const handleConnect = (user: ConnexionsUser) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const confirmConnect = () => {
    if (selectedUser) {
      selectedUser.isFriend = true; // pour mock
      setModalVisible(false);
    }
  };

  const copyInviteLink = () => {
    if (selectedUser) {
      const link = `https://snatch.app/invite/${selectedUser.id}`;
      Clipboard.setString(link);
    }
  };

  const renderUserItem = ({ item }: { item: ConnexionsUser }) => (
    <View style={styles.userRow}>
      <Image source={{ uri: item.photoUri }} style={styles.avatar} />
      <Text style={styles.userName}>{item.firstName}</Text>
      <TouchableOpacity
        style={[styles.connectButton, item.isFriend && { opacity: 0.5 }]}
        disabled={item.isFriend}
        onPress={() => handleConnect(item)}
      >
        <Text style={styles.connectText}>{item.isFriend ? 'Connecté' : 'Connecter'}</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredSnatchUsers = sameSnatchUsers.filter(user => {
    if (!user.lastSnatchParticipation) return false;
    const snatchDate = new Date(user.lastSnatchParticipation);
    const now = new Date();
    return now.getTime() - snatchDate.getTime() <= 48 * 60 * 60 * 1000;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedUser && (
              <>
                <Image source={{ uri: selectedUser.photoUri }} style={styles.modalAvatar} />
                <Text style={styles.modalText}>
                  Pour devenir amis, vous devez tous les deux cliquer sur « Connecter ». {selectedUser.firstName} ne sera pas informé.
                </Text>
                <TouchableOpacity style={styles.modalButton} onPress={confirmConnect}>
                  <Text style={styles.modalButtonText}>Connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={copyInviteLink}>
                  <Text style={styles.modalButtonText}>Copier lien d’invitation</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalCancel}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCancelText}>Annuler</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Section Amis d’amis */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Amis d'amis</Text>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>J'accepte que mon profil soit suggéré</Text>
          <Switch
            value={friendsConsent}
            onValueChange={setFriendsConsent}
            trackColor={{ false: '#555', true: Colors.primary }}
            thumbColor={Colors.background}
          />
        </View>
        <FlatList
          data={friendsOfFriends}
          keyExtractor={item => item.id}
          renderItem={renderUserItem}
        />
      </View>

      {/* Section Ceux qui ont été au même Snatch */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Croisés au Snatch (48h)</Text>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>J'accepte que mon profil soit suggéré</Text>
          <Switch
            value={snatchConsent}
            onValueChange={setSnatchConsent}
            trackColor={{ false: '#555', true: Colors.primary }}
            thumbColor={Colors.background}
          />
        </View>
        <FlatList
          data={filteredSnatchUsers}
          keyExtractor={item => item.id}
          renderItem={renderUserItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },

  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontFamily: 'lexend-medium', marginBottom: 8, color: '#fff' },

  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  toggleText: { color: '#fff' },

  userRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  userName: { flex: 1, marginLeft: 12, fontSize: 16, color: '#fff' },

  connectButton: { backgroundColor: Colors.cardBackground, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  connectText: { color: '#fff' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: Colors.background, padding: 20, borderRadius: 12, width: '80%', alignItems: 'center' },
  modalAvatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  modalText: { fontSize: 16, textAlign: 'center', marginBottom: 16, color: Colors.text, fontFamily : 'lexend-regular'},
  modalButton: { backgroundColor: Colors.cardBackground, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, marginBottom: 8 },
  modalButtonText: { color: Colors.text, fontSize: 16 },
  modalCancel: { paddingVertical: 10, paddingHorizontal: 20 },
  modalCancelText: { color: Colors.primary, fontSize: 16 },
});

// ProfilScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { useUser } from '../../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { AppStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { mockClubs, User, Club } from '../../data/mockDatabase';


export default function ProfilScreen() {
  type ProfilScreenNavigationProp =
  NativeStackNavigationProp<AppStackParamList>;


  const navigation = useNavigation<ProfilScreenNavigationProp>();
  // Clubs mock
  const clubs = [
    { 
      id: 1, 
      name: 'Sunset Club', 
      image: { uri: 'https://images.unsplash.com/photo-1527549993586-dff825b37782?fit=crop&w=300&h=300' }, 
      role: 'Co-admin'
    },
    { 
      id: 2, 
      name: 'Night Society', 
      image: { uri: 'https://images.unsplash.com/photo-1527549993586-dff825b37782?fit=crop&w=300&h=300' }, 
      role: 'Co-admin'
    },
  ];

  const { currentUser } = useUser();

    // Préparer les clubs de l'utilisateur
  const userClubs: { id: string; name: string; role: 'Admin' | 'Co-admin'; image: any }[] = [];

  // Admin principal
  if (currentUser?.adminClub) {
    const club = mockClubs.find(c => c.id === currentUser.adminClub);
    if (club) {
      userClubs.push({
        id: club.id,
        name: club.name,
        role: 'Admin',
        image: require('../../assets/images/laconfig.png'), // image par défaut
      });
    }
  }

  // Co-admin
  currentUser?.coAdminClubs?.forEach(coId => {
    const club = mockClubs.find(c => c.id === coId);
    if (club) {
      userClubs.push({
        id: club.id,
        name: club.name,
        role: 'Co-admin',
        image: require('../../assets/images/laconfig.png'),
      });
    }
  });


  const avatarSource = currentUser?.photoUri
    ? { uri: currentUser.photoUri }
    : require('../../assets/images/laconfig.png');   
    
  console.log('currentUser:', currentUser);


  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <Image source={avatarSource} style={styles.avatar} />

          <View style={styles.headerCenter}>
            <Text style={styles.name}>{currentUser?.firstName ?? 'Utilisateur'}</Text>
            <Text style={styles.pseudo}>@{currentUser?.username ?? 'pseudo'}</Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() =>
              navigation.navigate('ViewProfile', {
                userId: currentUser?.id,
                firstName: currentUser?.firstName ?? 'John',
                lastName: currentUser?.lastName ?? 'Doe',
                pseudo: currentUser?.username ?? 'pseudo',
                email: currentUser?.email ?? '',
                profileImage: currentUser?.photoUri? { uri: currentUser.photoUri } : require('../../assets/images/laconfig.png'),

                instagram: 'https://instagram.com/snatch.app',
                whatsapp: 'https://wa.me/33600000000',
                snapchat: 'https://www.snapchat.com/add/snatch',

                participations: 12,
                snatchsCreated: 3,

                flashbacks: [], // mock vide pour l’instant
                clubs: userClubs, // <-- on envoie ici le tableau préparé
              })
            }
          >
            <Text style={styles.profileButtonText}>Voir profil</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={26} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* ---------- MULTIPASS ---------- */}
        <TouchableOpacity
            style={styles.multipassContainer}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('MultipassScreen')}
        >
          <Text style={styles.multipassTitle}>Mon Multipass</Text>

          <View style={styles.qrWrapper}>
            <Image 
              source={require('../../assets/images/multipass_qr.png')} 
              style={styles.qrCode}
            />
            <Image 
              source={require('../../assets/logos/snatch_logo.png')} 
              style={styles.qrLogo}
            />
          </View>
        </TouchableOpacity>

        {/* ---------- CLUBS ---------- */}
        <View style={styles.clubSection}>
          <Text style={styles.clubTitle}>Mes Clubs</Text>

          {/* Si pas Admin, cadre pour créer son club */}
          {!clubs.some(club => club.role === 'Admin') && (
            <TouchableOpacity
              style={[styles.clubItem, styles.createClub]}
              onPress={() => navigation.navigate('ClubStack')}
            >
              <Text style={styles.createClubText}>+ Créer ton propre Club étudiant</Text>
            </TouchableOpacity>
          )}


          {/* Clubs Admin */}
          {clubs.filter(club => club.role === 'Admin').map(club => (
            <TouchableOpacity key={club.id} style={styles.clubItem}>
              <Image source={club.image} style={styles.clubImage} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.clubName}>{club.name}</Text>
                <Text style={styles.clubRole}>🔰 {club.role}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}

          {/* Clubs Co-admin */}
          {clubs.filter(club => club.role === 'Co-admin').map(club => (
            <TouchableOpacity key={club.id} style={styles.clubItem}>
              <Image source={club.image} style={styles.clubImage} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.clubName}>{club.name}</Text>
                <Text style={styles.clubRole}>{club.role}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
  },

  // ---------- HEADER ----------
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: Colors.background
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  headerCenter: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    color: '#FFF',
    fontFamily: Fonts.Bold,
    fontSize: 22,
  },
  pseudo: {
    color: '#AAAAAA',
    fontFamily: Fonts.Medium,
    fontSize: 14,
    marginTop: 2,
  },
  iconBtn: {
    paddingHorizontal: 4,
  },
  profileButton: {
    backgroundColor: '#FFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  profileButtonText: {
    color: Colors.background,
    fontFamily: Fonts.Medium,
    fontSize: 14,
  },

  // ---------- MULTIPASS ----------
  multipassContainer: {
    width: '100%',
    height: 206,
    borderRadius: 12,
    backgroundColor: Colors.cardBackground,
    padding: 20,
    marginBottom: 35,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  multipassTitle: {
    color: '#FFF',
    fontFamily: Fonts.Bold,
    fontSize: 18,
  },
  qrWrapper: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  qrCode: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    opacity: 0.7,
  },
  qrLogo: {
    width: 38,
    height: 38,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -19,
    marginTop: -19,
  },

  // ---------- CLUBS ----------
  clubSection: {
    width: '100%',
  },
  clubTitle: {
    color: '#FFF',
    fontFamily: Fonts.Bold,
    fontSize: 18,
    marginBottom: 12,
  },
  clubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  clubImage: {
    width: 54,
    height: 54,
    borderRadius: 50,
  },
  clubName: {
    color: '#FFF',
    fontFamily: Fonts.Medium,
    fontSize: 16,
  },
  clubRole: {
    color: Colors.secondaryText,
    fontFamily: Fonts.Regular,
    fontSize: 13,
    marginTop: 2,
  },
  arrow: {
    color: '#FFF',
    fontSize: 26,
    marginRight: 5,
  },
  createClub: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 12,
    borderWidth:2,
    backgroundColor: Colors.background,
    borderColor: Colors.secondaryText,
  },
  createClubText: {
    color: Colors.text,
    fontFamily: Fonts.Medium,
    fontSize: 16,
  },
});

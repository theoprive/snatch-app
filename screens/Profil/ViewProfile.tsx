import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { universities } from '../../data/campusList';
import { mockClubs } from '../../data/mockDatabase';
import { useUser } from '../../context/UserContext';
import { Alert } from 'react-native';


type Props = NativeStackScreenProps<AppStackParamList, 'ViewProfile'>;
type NavigationProps = NativeStackNavigationProp<AppStackParamList>;


export default function ViewProfile({ route }: Props) {
  const { currentUser } = useUser(); // <-- on récupère le currentUser
  const navigation = useNavigation<NavigationProps>();
  const {
    userId,
    firstName,
    lastName,
    pseudo,
    instagram,
    whatsapp,
    snapchat,
    participations,
    snatchsCreated,
    profileImage,
    email,
    flashbacks = [],
  } = route.params;
  const userClubs = route.params.clubs ?? [];
  console.log('Clubs reçus pour affichage:', userClubs);
  const emailDomain = email?.toLowerCase().trim().split('@')[1] ?? '';
  const campus = universities.find(u =>
    emailDomain.endsWith(u.domain.toLowerCase())
  );

  const isMyProfile = route.params.userId === currentUser?.id;
  

  const renderSocialButton = (
    icon: string,
    label: string,
    url?: string,
    networkKey?: 'instagram' | 'whatsapp' | 'snapchat'
  ) => {
    // Cas où c'est mon profil
    if (isMyProfile) {
      return (
        <TouchableOpacity
          style={styles.socialCard}
          onPress={() => {
            if (url) {
              // Si déjà rempli, on peut modifier ou supprimer
              console.log(`Modifier ou supprimer ${label}`);
            } else {
              // Si pas encore rempli, inviter à ajouter
              console.log(`Ajouter ${label}`);
            }
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.socialIcon}>{icon}</Text>
          <Text style={styles.socialLabel}>{label}</Text>
          {!url && (
            <View style={styles.redDot} /> // pastille rouge si pas renseigné
          )}
        </TouchableOpacity>
      );
    }

    // Cas profil d'un autre utilisateur
    if (!url) return null; // Si non renseigné, on n'affiche pas

    return (
      <TouchableOpacity
        style={styles.socialCard}
        onPress={() => Linking.openURL(url)}
        activeOpacity={0.8}
      >
        <Text style={styles.socialIcon}>{icon}</Text>
        <Text style={styles.socialLabel}>{label}</Text>
      </TouchableOpacity>
    );
  };



  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={26} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>

        {/* Avatar + Badge université */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarContainer}>
            {profileImage ? (
              <Image source={profileImage} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}

            {campus && (
              <View style={styles.universityBadge}>
                <Image source={campus.logo} style={styles.universityIcon} resizeMode="contain" />
              </View>
            )}
          </View>
        </View>


        {/* Identity */}
        <Text style={styles.name}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.pseudo}>@{pseudo}</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{participations}</Text>
            <Text style={styles.statLabel}>Participations</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{snatchsCreated}</Text>
            <Text style={styles.statLabel}>Snatchs créés</Text>
          </View>
        </View>

        {/* Social buttons */}
        <View style={styles.socialRow}>
          {renderSocialButton('📷', 'Instagram', instagram, 'instagram')}
          {renderSocialButton('💬', 'WhatsApp', whatsapp, 'whatsapp')}
          {renderSocialButton('👻', 'Snapchat', snapchat, 'snapchat')}
        </View>

    

        {/* ---------- Clubs ---------- */}
        <Text style={styles.sectionTitle}>Clubs</Text>

        {userClubs && userClubs.length > 0 ? (
          <View style={styles.clubsGrid}>
            {userClubs.map((club, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.clubCard,
                  club.role === 'Admin' && styles.adminClubCard,
                ]}
                activeOpacity={0.85}
                onPress={() => {
                  navigation.navigate('ViewClub', {
                    id: club.id,
                    name: club.name,
                    image: club.image,
                    description: club.description,
                    address: club.address,
                    followersCount: club.followersCount ?? 0,
                    upcomingSnatchs: club.upcomingSnatchs ?? [],
                    admins: club.admins ?? [],
                    flashbacks: club.flashbacks ?? [],
                  });
                }}
              >
                {/* Emoji 🔰 pour les Admins */}
                {club.role === 'Admin' && (
                  <Text style={styles.adminEmoji}>🔰</Text>
                )}

                {/* Photo circulaire du club */}
                <Image source={club.image} style={styles.clubAvatar} />

                {/* Nom du club */}
                <Text style={styles.clubName}>{club.name}</Text>

                {/* Statut */}
                <Text style={styles.clubStatus}>
                  {club.role === 'Admin' ? 'Admin' : 'Co-admin'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>
            N&apos;est pas admin ou co-admin d&apos;un club pour le moment...
          </Text>
        )}



        {/* ---------- Flashbacks ---------- */}
        <Text style={styles.sectionTitle}>Flashbacks</Text>

        {flashbacks && flashbacks.length > 0 ? (
          <View style={styles.flashbacksGrid}>
            {flashbacks.map((fb, index) => (
              <Image key={index} source={{ uri: fb }} style={styles.flashbackItem} />
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>Pas de flashbacks publiés pour le moment...</Text>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  avatarWrapper: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },

  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.cardBackground,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },


  name: {
    fontFamily: Fonts.Bold,
    fontSize: 22,
    color: Colors.text,
    textAlign: 'center',
  },

  pseudo: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    color: Colors.secondaryText,
    textAlign: 'center',
    marginBottom: 20,
  },

  socialButton: {
    backgroundColor: Colors.cardBackground,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  socialText: {
    fontFamily: Fonts.Medium,
    fontSize: 13,
    color: Colors.text,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 36,
  },

  statItem: {
    alignItems: 'center',
  },

  statNumber: {
    fontFamily: Fonts.Bold,
    fontSize: 20,
    color: Colors.text,
  },

  statLabel: {
    fontFamily: Fonts.Regular,
    fontSize: 12,
    color: Colors.secondaryText,
  },

  sectionTitle: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
  },

  flashbacksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  flashbackItem: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  socialCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },

  socialIcon: {
    fontSize: 22,
    marginBottom: 6,
  },

  socialLabel: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
    color: Colors.text,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 0,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  avatarContainer: {
    position: 'relative',
  },

  universityBadge: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  universityIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

emptyText: {
  fontFamily: Fonts.Regular,
  fontSize: 14,
  color: Colors.secondaryText,
  textAlign: 'center',
  marginBottom: 20,
},

clubsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  rowGap: 12,
},

clubCard: {
  width: '48%',             // Deux cards par ligne
  alignItems: 'center',
  paddingVertical: 12,
  paddingHorizontal: 6,
  borderRadius: 12,
  backgroundColor: Colors.cardBackground,
  marginBottom: 12,
  position: 'relative',
  borderWidth: 0,           // par défaut pas de bordure
},

adminClubCard: {
      // bordure blanche pour les Admin
},

adminEmoji: {
  position: 'absolute',
  top: 6,
  left: 6,
  fontSize: 16,
},

clubAvatar: {
  width: 60,
  height: 60,
  borderRadius: 30,
  marginBottom: 8,
},

clubName: {
  fontFamily: Fonts.Medium,
  fontSize: 14,
  color: Colors.text,
  textAlign: 'center',
},

clubStatus: {
  fontFamily: Fonts.Regular,
  fontSize: 12,
  color: Colors.secondaryText,
  textAlign: 'center',
},

redDot: {
  position: 'absolute',
  top: 6,
  right: 6,
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: 'red',
},





});

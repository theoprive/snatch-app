import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { AppStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'ViewClub'>;
type NavigationProps = NativeStackNavigationProp<AppStackParamList>;

export default function ViewClub({ route }: Props) {
  const navigation = useNavigation<NavigationProps>();

  const {
    id,
    name,
    image,
    description,
    address,
    followersCount,
    upcomingSnatchs = [],
    admins = [],
    flashbacks = [],
    whatsapp,
    discord,
  } = route.params;

  // ⚠️ À brancher plus tard sur ton auth store
  const currentUserId = 'USER_ID';

  const isAdmin = admins.some(
    admin =>
      admin.id === currentUserId &&
      ['admin', 'co-admin'].includes(admin.role)
  );

  // MOCKS
  const snatchsCreatedCount = upcomingSnatchs.length;
  const participantsCount = snatchsCreatedCount * 25;

  const openLink = (url?: string) => {
    if (!url) return;
    Linking.openURL(url).catch(() =>
      console.log('Erreur ouverture lien')
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* BACK */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>

        {/* EDIT CLUB */}
        {isAdmin && (
          <TouchableOpacity style={styles.editClubButton}>
            <Ionicons name="pencil" size={22} color="#fff" />
          </TouchableOpacity>
        )}

        {/* HEADER */}
        <View style={styles.headerContainer}>

          {/* BANNIÈRE */}
          <View style={styles.banner}>
            {isAdmin && (
              <TouchableOpacity style={styles.editBannerBtn}>
                <Ionicons name="pencil" size={16} color="#fff" />
                <Text style={styles.editText}>Modifier bannière</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* AVATAR */}
          <View style={styles.avatarWrapper}>
            {image ? (
              <Image source={image} style={styles.clubAvatar} />
            ) : (
              <View style={styles.clubAvatarPlaceholder} />
            )}

            {isAdmin && (
              <TouchableOpacity style={styles.editAvatarBtn}>
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.clubName}>{name}</Text>
        </View>

        {/* RÉSEAUX */}
        {(whatsapp || discord) && (
          <View style={styles.socialRow}>
            {whatsapp && (
              <TouchableOpacity
                style={styles.socialCard}
                onPress={() => openLink(whatsapp)}
              >
                <Text style={styles.socialIcon}>💬</Text>
                <Text style={styles.socialLabel}>WhatsApp</Text>
              </TouchableOpacity>
            )}

            {discord && (
              <TouchableOpacity
                style={styles.socialCard}
                onPress={() => openLink(discord)}
              >
                <Text style={styles.socialIcon}>🎮</Text>
                <Text style={styles.socialLabel}>Discord</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{participantsCount}</Text>
            <Text style={styles.statLabel}>Participants</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{snatchsCreatedCount}</Text>
            <Text style={styles.statLabel}>Snatchs</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{followersCount}</Text>
            <Text style={styles.statLabel}>Suivis</Text>
          </View>
        </View>

        {/* DESCRIPTION */}
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}

        {/* ADRESSE */}
        {address && (
          <TouchableOpacity
            onPress={() =>
              openLink(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  address
                )}`
              )
            }
          >
            <Text style={styles.address}>{address}</Text>
          </TouchableOpacity>
        )}

        {/* SNATCHS */}
        <Text style={styles.sectionTitle}>À venir</Text>
        {upcomingSnatchs.length > 0 ? (
          upcomingSnatchs.map(snatch => (
            <View key={snatch.id} style={styles.snatchItem}>
              <Text style={styles.snatchTitle}>{snatch.title}</Text>
              <Text style={styles.snatchDate}>{snatch.date}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>
            Pas de Snatchs à venir...
          </Text>
        )}

        {/* ADMINS */}
        <Text style={styles.sectionTitle}>Admins</Text>
        {admins.length > 0 ? (
          <View style={styles.adminsGrid}>
            {admins.map(admin => (
              <TouchableOpacity
                key={admin.id}
                style={styles.adminCard}
                onPress={() =>
                  navigation.navigate('ViewProfile', {
                    userId: admin.id,
                    firstName: admin.firstName ?? '',
                    lastName: admin.lastName ?? '',
                    pseudo: admin.username ?? '',
                    email: admin.email ?? '',
                    profileImage: admin.photoUri
                      ? { uri: admin.photoUri }
                      : undefined,
                    participations: 0,
                    snatchsCreated: 0,
                    flashbacks: [],
                    clubs: [],
                  })
                }
              >
                {admin.photoUri ? (
                  <Image
                    source={{ uri: admin.photoUri }}
                    style={styles.adminAvatar}
                  />
                ) : (
                  <View style={styles.adminAvatarPlaceholder} />
                )}
                <Text style={styles.adminName}>{admin.firstName}</Text>
                <Text style={styles.adminRole}>{admin.role}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>
            Aucun admin pour ce club
          </Text>
        )}

        {/* FLASHBACKS */}
        <Text style={styles.sectionTitle}>Flashbacks</Text>
        {flashbacks.length > 0 ? (
          <View style={styles.flashbacksGrid}>
            {flashbacks.map((fb, idx) => (
              <Image
                key={idx}
                source={{ uri: fb }}
                style={styles.flashbackItem}
              />
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>
            Pas de flashbacks publiés pour le moment...
          </Text>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { paddingBottom: 32 },

  backButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 6,
  },

  editClubButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },

  headerContainer: { marginBottom: 24 },

  banner: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    padding: 12,
  },

  editBannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  editText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 6,
    fontFamily: Fonts.Medium,
  },

  avatarWrapper: {
    alignItems: 'center',
    marginTop: -60,
  },

  clubAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.background,
  },

  clubAvatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.cardBackground,
    borderWidth: 4,
    borderColor: Colors.background,
  },

  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  clubName: {
    fontFamily: Fonts.Bold,
    fontSize: 22,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 12,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingHorizontal: 20,
  },

  socialCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },

  socialIcon: { fontSize: 22, marginBottom: 6 },
  socialLabel: { fontFamily: Fonts.Medium, fontSize: 12 },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 24,
  },

  statItem: { alignItems: 'center', flex: 1 },
  statNumber: { fontFamily: Fonts.Bold, fontSize: 20, color: Colors.text, },
  statLabel: { fontFamily: Fonts.Regular, fontSize: 12, color: Colors.secondaryText },

  description: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },

  address: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 16,
    textDecorationLine: 'underline',
  },

  sectionTitle: {
    fontFamily: Fonts.Bold,
    color: Colors.text,
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 20,
  },

  snatchItem: { marginBottom: 10, paddingHorizontal: 20 },
  snatchTitle: { fontFamily: Fonts.Medium, fontSize: 14 },
  snatchDate: { fontFamily: Fonts.Regular, fontSize: 12, color: Colors.secondaryText },

  adminsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
  },

  adminCard: { width: 80, alignItems: 'center' },
  adminAvatar: { width: 50, height: 50, borderRadius: 25, marginBottom: 4 },
  adminAvatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.cardBackground, marginBottom: 4 },
  adminName: { fontFamily: Fonts.Medium, fontSize: 12, textAlign: 'center' },
  adminRole: { fontFamily: Fonts.Regular, fontSize: 11, color: Colors.secondaryText },

  flashbacksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
  },

  flashbackItem: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: Colors.cardBackground,
  },

  emptyText: {
    fontFamily: Fonts.Regular,
    fontSize: 12,
    color: Colors.secondaryText,
    textAlign: 'center',
    marginBottom: 12,
  },
});

import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import ReelActions from './ReelActions';
import TicketIcon from '../assets/icons/TicketIcon'; // ton icône ticket
import { BlurView } from 'expo-blur';
import { Colors } from '../theme/colors';


interface ReelItemProps {
  source: any;
  itemWidth: number;
  itemHeight: number;
  isGridView: boolean;
}

const { width } = Dimensions.get('window');
const LABEL_WIDTH = 368;
const LABEL_HEIGHT = 100;

export default function ReelItem({ source, itemWidth, itemHeight, isGridView }: ReelItemProps) {
  const player = useVideoPlayer(source, player => {
    player.loop = true;
    player.play();
  });

  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <View style={[styles.container, { width: itemWidth, height: itemHeight }]}>
      <VideoView
        player={player}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
        allowsFullscreen
      />

      {/* Actions uniquement si on est en mode liste */}
      {!isGridView && (
        <>
          <ReelActions
            participants={120}
            bookmarks={34}
            shares={12}
            distance={2.3}
            longitude={2.2945}
            latitude={48.8584}
            label={'Night Party'}
          />
          {/* Créateur */}
            <View style={styles.creatorContainer}>
            <Image
                source={require('../assets/images/laconfig.png')} // remplace par ton image
                style={styles.creatorAvatar}
            />
            <Text
                style={[styles.creatorName, { maxWidth: width / 2 }]} // ← limite à la moitié de l’écran
                numberOfLines={1}
                >
                @laconfig
            </Text>
            <TouchableOpacity
                style={[
                styles.followButton,
                isFollowing && styles.followingButton
                ]}
                onPress={() => setIsFollowing(!isFollowing)}
            >
                <Text
                style={[
                    styles.followText,
                    isFollowing && styles.followingText
                ]}
                >
                {isFollowing ? 'Suivi' : 'Suivre'}
                </Text>
            </TouchableOpacity>
            </View>


          {/* Event label */}
          <BlurView intensity={60} tint="light" style={[styles.eventLabel, { width: itemWidth - 32 }]}>
            <Image
              source={require('../assets/images/eventPoster.png')} // remplacer par ton poster
              style={styles.poster}
              resizeMode="cover"
            />
            <View style={styles.infoContainer}>
              <Text style={styles.title} numberOfLines={1}>Nom de l'événement</Text>
              <Text style={styles.dateTime}>Ven 8 Nov • 20:00</Text>
            </View>
            <View style={styles.ticketContainer}>
              <TicketIcon width={40} height={40} />
            </View>
          </BlurView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  eventLabel: {
    position: 'absolute',
    bottom: 12,
    left: 16,        // marge gauche
    right: 16,       // marge droite
    height: 100,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    overflow: 'hidden', // important pour le blur
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  poster: {
    width: 56,
    aspectRatio : 2/3,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  dateTime: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 4,
  },
  ticketContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  creatorContainer: {
  position: 'absolute',
  bottom: LABEL_HEIGHT + 20,
  left: 16,
  width: LABEL_WIDTH,
  flexDirection: 'row',
  alignItems: 'center',
},

creatorAvatar: {
  width: 32,
  height: 32,
  borderRadius: 20,
  marginRight: 8,
},
creatorName: {
  color: '#fff',
  fontSize: 14,
  fontWeight: '600',
  flexShrink: 1, // permet de tronquer si trop long
  marginRight: 10,
},
followButton: {
  borderWidth: 1,
  borderColor: '#fff',
  paddingVertical: 6,
  paddingHorizontal: 16,
  borderRadius: 20,
},
followText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: '500',
},
followingButton: {
  backgroundColor: '#fff',
  borderColor: '#fff',
},
followingText: {
  color: '#000',
},


});

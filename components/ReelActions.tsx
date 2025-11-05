import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import ParticipantIcon from '../assets/icons/ParticipantIcon';
import BookmarkIcon from '../assets/icons/BookmarkIcon';
import ShareIcon from '../assets/icons/ShareIcon';
import MapIcon from '../assets/icons/MapIcon';
import OptionsIcon from '../assets/icons/OptionsIcon';
import * as Linking from 'expo-linking';


interface ReelActionsProps {
  participants: number;
  bookmarks: number;
  shares: number;
  distance: number; // en km
  latitude : number;
  longitude : number;
  label : string;
}



export default function ReelActions({ participants, bookmarks, shares, distance, latitude, longitude, label }: ReelActionsProps) {

  const handleOpenMap = () => {
    const url = Platform.select({
        ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
        android: `geo:0,0?q=${latitude},${longitude}(${label})`,
    }) || '';

    if (url) {
        Linking.openURL(url);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <ParticipantIcon width={32} height={32} />
        <Text style={styles.count}>{participants}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <BookmarkIcon width={32} height={32} />
        <Text style={styles.count}>{bookmarks}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <ShareIcon width={32} height={32} />
        <Text style={styles.count}>{shares}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleOpenMap}>
        <MapIcon width={32} height={32} />
        <Text style={styles.count}>{distance} km</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <OptionsIcon width={32} height={32} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 8,
    bottom: 120, // position au-dessus de la future carte ticket
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginBottom: 16,
    alignItems: 'center',
  },
  count: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
});

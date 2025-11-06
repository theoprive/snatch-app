import React, {useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ensureProfile } from '../../services/profileCheck';
import { AppStackParamList } from '../../navigation/types'


export default function SnatchScreen() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();


  useEffect(() => {
    // Vérifie dès l'entrée sur l'écran
    (async () => {
      await ensureProfile(navigation);
    })();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Snatch Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: Fonts.Medium,
    fontSize: 20,
  },
});

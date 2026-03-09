import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '../../theme/colors';

type CreateSnatchCTAProps = {
  enabled: boolean;
  onPress: () => void;
};

export default function CreateSnatchCTA({ enabled, onPress }: CreateSnatchCTAProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={enabled ? onPress : undefined}
        style={[
          styles.button,
          {
            backgroundColor: enabled ? Colors.primary : Colors.disabledRed,
            ...enabled
              ? {
                  shadowColor: Colors.disabledRed,
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 1,
                  shadowRadius: 0,
                  elevation: 6, // Android shadow
                }
              : {}, // pas de shadow si disabled
          },
        ]}
      >
        <Text style={styles.text}>Créer Snatch</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

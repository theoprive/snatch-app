import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Colors } from '../../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Fonts } from '../../theme/fonts';

// ➕ IMPORT DE LA MODAL
import DescriptionModal from '../../components/CreateSnatch/DescriptionModal';

export default function OptionsSection() {
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('Mon campus');
  const [capacity, setCapacity] = useState('Illimitée');
  const [price, setPrice] = useState('Gratuit');
  const [checkInEnabled, setCheckInEnabled] = useState(false);

  // ➕ STATE POUR LA MODAL
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);

  return (
    <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 24 }}>
      <Text style={{ color: Colors.secondaryText, fontFamily: Fonts.Regular, marginBottom: 16 }}>
        Options
      </Text>

      {/* Description */}
      <TouchableOpacity
        style={styles.field}
        onPress={() => setDescriptionModalVisible(true)}
      >
        <MaterialIcons name="description" size={24} color={Colors.secondaryText} />

        <Text style={styles.value}>
          {description
            ? description.slice(0, 30) + (description.length > 30 ? '...' : '')
            : 'Ajouter une description'}
        </Text>
      </TouchableOpacity>

      {/* Visibilité */}
      <TouchableOpacity
        style={styles.field}
        onPress={() => console.log('Ouvrir modal visibilité')}
      >
        <MaterialIcons name="people" size={24} color={Colors.secondaryText} />
        <Text style={styles.value}>{visibility}</Text>
      </TouchableOpacity>

      {/* Capacité */}
      <TouchableOpacity
        style={styles.field}
        onPress={() => console.log('Ouvrir modal capacité')}
      >
        <MaterialIcons name="format-list-numbered" size={24} color={Colors.secondaryText} />
        <Text style={styles.value}>{capacity}</Text>
      </TouchableOpacity>

      {/* Prix */}
      <TouchableOpacity
        style={styles.field}
        onPress={() => console.log('Ouvrir modal prix')}
      >
        <MaterialIcons name="euro-symbol" size={24} color={Colors.secondaryText} />
        <Text style={styles.value}>{price}</Text>
      </TouchableOpacity>

      {/* Vérifier les entrées */}
      <TouchableOpacity
        style={styles.field}
        activeOpacity={1}
        onPress={() => console.log('Ouvrir modal checkin')}
      >
        <View style={styles.left}>
          <MaterialIcons name="qr-code" size={24} color={Colors.secondaryText} />
          <Text style={styles.fieldLabel}>Vérifier les entrées</Text>
        </View>

        <View style={styles.switchWrapper}>
          <Switch
            value={checkInEnabled}
            onValueChange={setCheckInEnabled}
            thumbColor={checkInEnabled ? Colors.text : '#fff'}
            trackColor={{ false: '#555', true: Colors.primary }}
          />
        </View>
      </TouchableOpacity>

      {/* ➕ MODAL DESCRIPTION */}
      <DescriptionModal
        visible={descriptionModalVisible}
        initialValue={description}
        onClose={() => setDescriptionModalVisible(false)}
        onSave={(text) => setDescription(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  value: {
    marginLeft: 12,
    color: Colors.secondaryText,
    fontFamily: Fonts.Regular,
    fontSize: 16,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    height: 56,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  fieldLabel: {
    marginLeft: 12,
    color: Colors.secondaryText,
    fontFamily: Fonts.Regular,
    fontSize: 16,
    textAlignVertical: 'center',
    flexShrink: 1,
  },
  switchWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    minWidth: 56,
  },
});

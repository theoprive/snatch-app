import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import EssentielDateTime from './EssentielDateTime';

type EssentielSectionProps = {
  name?: string;
  onChangeName?: (text: string) => void;
  startDate?: Date | null;
  setStartDate?: (date: Date) => void;
  endDate?: Date | null;
  setEndDate?: (date: Date) => void;
  address?: string;
  onChangeAddress?: (text: string) => void;
};

export default function EssentielSection({
  name,
  onChangeName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  address,
  onChangeAddress,
}: EssentielSectionProps) {
  return (
    <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 32 }}>
      {/* Titre Section */}
      <Text style={{ color: Colors.secondaryText, fontFamily: Fonts.Regular, marginBottom: 16 }}>
        L'Essentiel
      </Text>

      {/* Nom du Snatch */}
      <TextInput
        style={{
          width: '100%',
          height: 56,
          backgroundColor: Colors.cardBackground,
          borderRadius: 10,
          paddingHorizontal: 14,
          color: Colors.text,
          fontFamily: Fonts.Regular,
          fontSize: 16,
          marginBottom: 16,
        }}
        placeholder="Nom du Snatch"
        placeholderTextColor={Colors.secondaryText}
        value={name}
        onChangeText={onChangeName}
      />

      {/* Bloc Début / Fin */}
      <EssentielDateTime
        startDate={startDate}
        setStartDate={setStartDate!}
        endDate={endDate}
        setEndDate={setEndDate!}
      />

      {/* Adresse */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.cardBackground,
          borderRadius: 10,
          paddingHorizontal: 12,
          height: 56,
          marginTop: 16,
        }}
      >
        <Ionicons
          name="map-outline"
          size={24}
          color={Colors.secondaryText}
          style={{ marginRight: 10 }}
        />
        <TextInput
          style={{
            flex: 1,
            color: Colors.text,
            fontFamily: Fonts.Regular,
            fontSize: 16,
            textAlign: 'left',
            letterSpacing: 0,
          }}
          placeholder="Le Lieu"
          placeholderTextColor={Colors.secondaryText}
          value={address}
          onChangeText={onChangeAddress}
        />
      </View>
    </View>
  );
}

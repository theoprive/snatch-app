// screens/Club/ModifyClub.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClubStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<ClubStackParamList, 'ModifyClub'>;

export default function ModifyClub({ route, navigation }: Props) {
  const { clubId } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Modifier le Club</Text>
      <Text>ID : {clubId}</Text>

      <Button title="Enregistrer" onPress={() => navigation.goBack()} />
    </View>
  );
}

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { styles } from './EmailInput.styles';
import { Colors } from '../../theme/colors';

type Props = {
  email: string;
  setEmail: (value: string) => void;
  inlineSuggestion: string;
  setInlineSuggestion: (value: string) => void;
  onSubmit: () => void;
};

export default function EmailInput({
  email,
  setEmail,
  inlineSuggestion,
  setInlineSuggestion,
  onSubmit,
}: Props) {
  const containsAt = email.includes('@');

  return (
    <View style={styles.inputWrapper}>
      {/* Overlay suggestion */}
      <View style={styles.ghostOverlay}>
        <Text style={styles.ghostText}>{email}</Text>
        {inlineSuggestion !== '' && (
          <TouchableOpacity
            onPress={() => {
              const [local, domain] = email.split('@');
              setEmail(`${local}@${domain}${inlineSuggestion}`);
              setInlineSuggestion('');
            }}
          >
            <Text style={styles.suggestionGhost}>{inlineSuggestion}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Champ email */}
      <TextInput
        style={styles.input}
        placeholder="Entre ton mail étudiant..."
        placeholderTextColor={Colors.secondaryText}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          const parts = text.split('@');
          if (parts.length === 2) {
            const typedDomain = parts[1].toLowerCase();
            const match = universityDomains.find(domain =>
              domain.startsWith(typedDomain)
            );
            setInlineSuggestion(match ? match.slice(typedDomain.length) : '');
          } else {
            setInlineSuggestion('');
          }
        }}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        keyboardAppearance="dark"
      />

      {/* Croix pour effacer */}
      {email.length > 0 && (
        <TouchableOpacity
          onPress={() => setEmail('')}
          style={styles.clearButton}
        >
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}

      {/* Bouton flèche */}
      <TouchableOpacity
        style={[
          styles.arrowButton,
          { backgroundColor: containsAt ? Colors.primary : '#3A3A3A' },
        ]}
        onPress={onSubmit}
      >
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

// Domaine universitaire à suggérer
import { universities } from '../../data/campusList';
const universityDomains = universities.map(u => u.domain);

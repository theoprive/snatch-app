import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

interface DescriptionModalProps {
  visible: boolean;
  initialValue: string;
  onClose: () => void;
  onSave: (value: string) => void;
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({
  visible,
  initialValue,
  onClose,
  onSave
}) => {
  const [text, setText] = useState(initialValue);

  useEffect(() => {
    if (visible) setText(initialValue);
  }, [visible]);

  const handleSave = () => {
    onSave(text);
    onClose(); // fermeture immédiate
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={styles.modal}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Description</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* TEXTINPUT avec scroll si besoin */}
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TextInput
              style={styles.input}
              placeholder="Décris ton expérience..."
              placeholderTextColor="#888"
              multiline
              autoFocus
              value={text}
              onChangeText={setText}
              textAlignVertical="top"
            />
          </ScrollView>

          {/* BOUTON ENREGISTRER EN DEHORS DU SCROLL */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
            <Text style={styles.saveBtnText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#111',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '75%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  close: {
    color: '#fff',
    fontSize: 24,
  },
  input: {
    flex: 1,
    width: '100%',
    color: '#fff',
    fontSize: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: Platform.OS === 'ios' ? 14 : 6, // collé au clavier
  },
  saveBtnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default DescriptionModal;

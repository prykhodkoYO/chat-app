import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { countries, Country } from '../data/countries';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
}

export default function CountryModal({ visible, onClose, onSelect }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Select country</Text>

          <FlatList
            data={countries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.flag}>{item.flag}</Text>
                <Text style={styles.name}>
                  {item.name} (+{item.callingCode})
                </Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  flag: {
    fontSize: 28,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
  },
  closeBtn: {
    marginTop: 15,
    padding: 10,
  },
  closeText: {
    fontSize: 18,
    color: '#007AFF',
    textAlign: 'center',
  },
});

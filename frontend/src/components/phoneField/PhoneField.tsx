import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { countries, Country } from '../../data/countries';
import CountryModal from '../countryModal/CountryModal';
import { styles } from './PhoneField.styles';

interface Props {
  value: string;
  onChange: (text: string) => void;
  onValidChange: (valid: boolean) => void;
  onCountryChange: (country: Country) => void;
}

export default function PhoneField({ value, onChange, onValidChange, onCountryChange }: Props) {
  const [country, setCountry] = useState<Country>(countries[0]);
  const [visible, setVisible] = useState(false);

  const digits = value.replace(/\D+/g, '');

  useEffect(() => {
    onCountryChange(country);
  }, []);

  useEffect(() => {
    onValidChange(digits.length === country.maxLength);
  }, [digits, country]);

  const handleChange = (text: string) => {
    const cleaned = text.replace(/\D+/g, '');
    if (cleaned.length <= country.maxLength) {
      onChange(cleaned);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.countryBox} onPress={() => setVisible(true)}>
          <Text style={styles.flag}>{country.flag}</Text>
          <Text style={styles.code}>+{country.callingCode}</Text>
        </TouchableOpacity>

        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor="#888"
          value={digits}
          onChangeText={handleChange}
        />
      </View>

      <CountryModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSelect={(c) => {
          setCountry(c);
          onCountryChange(c);
          onChange('');
        }}
      />
    </>
  );
}

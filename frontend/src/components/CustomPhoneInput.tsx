import React, { useState, useRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

interface CustomPhoneInputProps {
  value: string;
  onChange: (text: string) => void;
  onValidChange: (valid: boolean) => void;
}

export default function CustomPhoneInput({
  value,
  onChange,
  onValidChange,
}: CustomPhoneInputProps) {
  const phoneRef = useRef<PhoneInput>(null);
  const [noResults, setNoResults] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <PhoneInput
      ref={phoneRef}
      defaultCode="UA"
      layout="first"
      value={value}
      onChangeFormattedText={(text) => {
        onChange(text);
        onValidChange(phoneRef.current?.isValidNumber(text) || false);
      }}
      withDarkTheme
      withShadow
      countryPickerProps={{
        withFilter: true,

        renderCountryFilter: () => (
          <View style={{ padding: 10 }}>
            <TextInput
              placeholder="Search country..."
              value={search}
              onChangeText={(text) => {
                setSearch(text);
                setNoResults(text.length > 0);
              }}
              style={{
                padding: 10,
                backgroundColor: '#eee',
                borderRadius: 6,
              }}
            />

            {noResults && <Text style={{ marginTop: 10, color: 'red' }}>No countries found</Text>}
          </View>
        ),
      }}
    />
  );
}

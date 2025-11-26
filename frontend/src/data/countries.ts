export interface Country {
  code: string;
  name: string;
  callingCode: string;
  flag: string;
  maxLength: number;
}

export const countries: Country[] = [
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', callingCode: '380', maxLength: 9 },
  { code: 'US', name: 'United States', flag: '🇺🇸', callingCode: '1', maxLength: 10 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', callingCode: '44', maxLength: 10 },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', callingCode: '48', maxLength: 9 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', callingCode: '49', maxLength: 11 },
  { code: 'FR', name: 'France', flag: '🇫🇷', callingCode: '33', maxLength: 9 },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', callingCode: '34', maxLength: 9 },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', callingCode: '39', maxLength: 10 },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', callingCode: '40', maxLength: 9 },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', callingCode: '373', maxLength: 8 },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', callingCode: '36', maxLength: 9 },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', callingCode: '420', maxLength: 9 },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', callingCode: '421', maxLength: 9 },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', callingCode: '31', maxLength: 9 },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', callingCode: '32', maxLength: 9 },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', callingCode: '46', maxLength: 9 },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', callingCode: '47', maxLength: 8 },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', callingCode: '45', maxLength: 8 },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', callingCode: '358', maxLength: 10 },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', callingCode: '30', maxLength: 10 },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', callingCode: '90', maxLength: 10 },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', callingCode: '972', maxLength: 9 },
  { code: 'IN', name: 'India', flag: '🇮🇳', callingCode: '91', maxLength: 10 },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', callingCode: '7', maxLength: 10 },
];

const MAX_LENGTH = {
  hash: 16, // For transaction hash and addresses
  normal: 20, // For regular values
};

export const truncateText = (text: string, type: 'hash' | 'normal' = 'normal') => {
  const maxLen = MAX_LENGTH[type];
  if (text.length <= maxLen) return text;

  if (type === 'hash') {
    const start = text.slice(0, maxLen / 2);
    const end = text.slice(-maxLen / 2);
    return `${start}...${end}`;
  }

  return `${text.slice(0, maxLen)}...`;
};

export const formatAmount = (value: string): string => {
  if (value.includes(' ')) {
    const [amount, unit] = value.split(' ');
    return `${amount.slice(0, 10)} ${unit}`;
  }
  return value.slice(0, 10);
};

export const getDisplayValue = (value: string, type?: string): string => {
  if (type === 'amount') {
    return formatAmount(value);
  }
  return truncateText(value, type === 'hash' || type === 'address' ? 'hash' : 'normal');
};

export const getValueStyle = (type: string | undefined, styles: any) => [
  styles.value,
  type === 'network' && styles.networkValue,
  type === 'status' && styles.statusValue,
];

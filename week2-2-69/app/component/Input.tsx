import { View, Text, TextInput } from 'react-native';

type Inputprops = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
}: Inputprops) => {
  return (
    <View className="mb-4">
      <Text className="text-lg font-bold mb-1">{label}</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-2"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

export default Input;

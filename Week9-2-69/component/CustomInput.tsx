import { View, Text, TextInput, TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  //CustomInput ใช้ prop ทุกอย่างที่ TextInput ใช้ได้
  label?: string;
  error?: string;
  touched?: boolean;
  showCharCount?: boolean;
}

const CustomInput = ({
  label,
  error,
  touched,
  showCharCount = false,
  ...props
}: CustomInputProps) => {
  const hasError = touched && error;
  const currentLength = props.value?.length || 0;
  const maxLength = props.maxLength || 200;

  return (
    <View className="w-full mb-4">
      {/* Label */}
      <Text className="text-gray-700 font-semibold mb-2 text-base">
        {label}
      </Text>

      {/* Input Field */}
      <TextInput
        className={`
          w-full px-4 rounded-lg border-2
          ${hasError ? 'border-red-500' : 'border-gray-300'}
          ${props.editable === false ? 'bg-gray-100' : 'bg-white'}
          text-base text-gray-800
          ${props.multiline ? 'py-3 h-[100px]' : 'py-3'}
        `}
        style={props.multiline ? { textAlignVertical: 'top' } : undefined}
        placeholderTextColor="#9CA3AF"
        {...props}
      />

      {/* Character Count */}
      {showCharCount && props.multiline && (
        <Text className="text-gray-500 text-sm mt-1 text-right">
          {currentLength}/{maxLength}
        </Text>
      )}

      {/* Error Message */}
      {hasError && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default CustomInput;

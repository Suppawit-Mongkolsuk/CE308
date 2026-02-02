import { Text, Pressable } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'undefined';
  size?: 'S' | 'L' | 'XL' | 'undefined';
};

const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'L',
}: ButtonProps) => {
  const variantStyles = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    danger: 'bg-red-500',
    undefined: 'bg-blue-500',
  };

  const sizeStyles = {
    S: 'px-3 py-1',
    L: 'px-5 py-3',
    XL: 'px-7 py-4',
    undefined: 'px-5 py-3',
  };

  return (
    <Pressable
      className={`${variantStyles[variant]} ${sizeStyles[size]} rounded-lg`}
      onPress={onPress}
    >
      <Text className="text-white text-center font-medium">{title}</Text>
    </Pressable>
  );
};

export default CustomButton;

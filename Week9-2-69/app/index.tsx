import './global.css';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import CustomInput from '../component/CustomInput';
import CustomButton from '../component/CustomButton';

// Interface สำหรับข้อมูล Form
interface FormData {
  fullName: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Interface สำหรับ Error Messages
interface FormErrors {
  fullName?: string;
  email?: string;
  address?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Index() {
  // State สำหรับเก็บข้อมูล Form
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // State สำหรับเก็บ Error Messages
  const [errors, setErrors] = useState<FormErrors>({});

  // State สำหรับเช็คว่า field ไหนถูก touch แล้ว
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // State สำหรับ loading
  const [isLoading, setIsLoading] = useState(false);

  // ฟังก์ชัน Validation สำหรับแต่ละ field
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          return 'กรุณากรอกชื่อ-นามสกุล';
        }
        if (value.trim().length < 3) {
          return 'ชื่อ-นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร';
        }
        return undefined;

      case 'email':
        if (!value.trim()) {
          return 'กรุณากรอกอีเมล';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'รูปแบบอีเมลไม่ถูกต้อง';
        }
        return undefined;

      case 'address':
        if (!value.trim()) {
          return 'กรุณากรอกที่อยู่';
        }
        if (value.trim().length < 10) {
          return 'ที่อยู่ต้องมีอย่างน้อย 10 ตัวอักษร';
        }
        return undefined;

      case 'phone':
        if (!value.trim()) {
          return 'กรุณากรอกเบอร์โทรศัพท์';
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
          return 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก';
        }
        return undefined;

      case 'password':
        if (!value) {
          return 'กรุณากรอกรหัสผ่าน';
        }
        if (value.length < 6) {
          return 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
        }
        return undefined;

      case 'confirmPassword':
        if (!value) {
          return 'กรุณายืนยันรหัสผ่าน';
        }
        if (value !== formData.password) {
          return 'รหัสผ่านไม่ตรงกัน';
        }
        return undefined;

      default:
        return undefined;
    }
  };

  // ฟังก์ชันจัดการเมื่อมีการเปลี่ยนแปลงค่าใน Input
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate realtime ถ้า field ถูก touch แล้ว
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // ฟังก์ชันจัดการเมื่อ Input ถูก blur (สูญเสียโฟกัส)
  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate เมื่อ blur
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // ฟังก์ชัน Validate ทั้ง Form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // ตรวจสอบทุก field
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    // Mark ทุก field ว่าถูก touch แล้ว
    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return isValid;
  };

  // ฟังก์ชันจัดการเมื่อกด Submit
  const handleSubmit = async () => {
    // ปิด Keyboard
    Keyboard.dismiss();

    // Validate Form
    if (!validateForm()) {
      Alert.alert('ข้อมูลไม่ถูกต้อง', 'กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง');
      return;
    }

    // จำลองการส่งข้อมูล
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'สำเร็จ!',
        `ลงทะเบียนสำเร็จ!\nชื่อ: ${formData.fullName}\nอีเมล: ${formData.email}\nเบอร์: ${formData.phone}`,
        [
          {
            text: 'ตรวจสอบ',
            onPress: () => console.log('Form Data:', formData),
          },
          {
            text: 'รีเซ็ตฟอร์ม',
            onPress: handleReset,
            style: 'cancel',
          },
        ],
      );
    }, 2000);
  };

  // ฟังก์ชันรีเซ็ตฟอร์ม
  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      address: '',
      phone: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setTouched({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-gray-50"
          contentContainerClassName="pb-8"
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="bg-blue-600 pt-16 pb-8 px-6">
            <Text className="text-white text-3xl font-bold">
              ลงทะเบียนสมาชิก
            </Text>
            <Text className="text-blue-100 text-base mt-2">
              กรุณากรอกข้อมูลให้ครบถ้วน
            </Text>
          </View>

          {/* Form Container */}
          <View className="px-6 mt-6">
            {/* ชื่อ-นามสกุล */}
            <CustomInput
              label="ชื่อ-นามสกุล"
              placeholder="ระบุชื่อและนามสกุล"
              value={formData.fullName}
              onChangeText={(value) => handleChange('fullName', value)}
              onBlur={() => handleBlur('fullName')}
              error={errors.fullName}
              touched={touched.fullName}
              autoCapitalize="words"
            />

            {/* อีเมล */}
            <CustomInput
              label="อีเมล"
              placeholder="example@email.com"
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              onBlur={() => handleBlur('email')}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* ที่อยู่ */}
            <CustomInput
              label="ที่อยู่"
              placeholder="ระบุที่อยู่"
              value={formData.address}
              onChangeText={(value) => handleChange('address', value)}
              onBlur={() => handleBlur('address')}
              error={errors.address}
              touched={touched.address}
              multiline
              numberOfLines={4}
              maxLength={200}
              showCharCount
              autoCapitalize="sentences"
            />

            {/* เบอร์โทรศัพท์ */}
            <CustomInput
              label="เบอร์โทรศัพท์"
              placeholder="0812345678"
              value={formData.phone}
              onChangeText={(value) => handleChange('phone', value)}
              onBlur={() => handleBlur('phone')}
              error={errors.phone}
              touched={touched.phone}
              keyboardType="phone-pad"
              maxLength={10}
            />

            {/* รหัสผ่าน */}
            <CustomInput
              label="รหัสผ่าน"
              placeholder="อย่างน้อย 6 ตัวอักษร"
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              onBlur={() => handleBlur('password')}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              autoCapitalize="none"
            />

            {/* ยืนยันรหัสผ่าน */}
            <CustomInput
              label="ยืนยันรหัสผ่าน"
              placeholder="ระบุรหัสผ่านอีกครั้ง"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              onBlur={() => handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            {/* Buttons */}
            <View className="mt-6">
              <CustomButton
                title="ลงทะเบียน"
                onPress={handleSubmit}
                variant="primary"
                loading={isLoading}
              />

              <View className="mt-3">
                <CustomButton
                  title="รีเซ็ตฟอร์ม"
                  onPress={handleReset}
                  variant="secondary"
                  disabled={isLoading}
                />
              </View>
            </View>

            {/* Info Box */}
            <View className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <Text className="text-blue-800 font-semibold text-base mb-2">
                คำแนะนำ
              </Text>
              <Text className="text-blue-700 text-sm leading-5">
                - กรอกข้อมูลให้ครบถ้วน{'\n'}- อีเมลต้องมีรูปแบบที่ถูกต้อง{'\n'}-
                เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก{'\n'}-
                รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

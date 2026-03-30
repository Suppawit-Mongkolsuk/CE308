import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormValues } from '../schemas/profileSchema';
import { useForm, useWatch, Controller, Control } from 'react-hook-form';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';

function NamePreview({ control }: { control: Control<ProfileFormValues> }) {
  const [firstName, lastName] = useWatch({
    control,
    name: ['firstName', 'lastName'],
  });
  return (
    <Text style={s.preview}>
      {firstName} {lastName}
    </Text>
  );
}

export default function ProfileScreen() {
  // useForm จัดการ state / validation / submit
  const {
    control, // ส่งให้ Controller และ useWatch
    handleSubmit, // validate ก่อน แล้วเรียก onSubmit
    setValue, // set ค่า field จากภายนอก (เช่น โหลด API)
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema), // ให้ Zod validate แทน
    defaultValues: { firstName: '', lastName: '', email: '', bio: '' },
  });

  // setValue: จำลองโหลดข้อมูลจาก API แล้ว set ลง form
  useEffect(() => {
    setTimeout(() => {
      setValue('firstName', 'สมชาย');
      setValue('lastName', 'ใจดี');
      setValue('email', 'somchai@example.com');
      setValue('bio', 'ชอบเขียนโค้ด');
    }, 500);
  }, [setValue]);

  // onSubmit: เรียกเฉพาะเมื่อ Zod validation ผ่านแล้ว
  const onSubmit = (data: ProfileFormValues) => {
    Alert.alert('บันทึกสำเร็จ', JSON.stringify(data, null, 2));
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.title}>แก้ไขโปรไฟล์</Text>
      <NamePreview control={control} />

      {/* ชื่อ */}
      <Text style={s.label}>ชื่อ</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[s.input, errors.firstName && s.err]}
            value={value}
            onChangeText={onChange} // แจ้ง form เมื่อค่าเปลี่ยน
            onBlur={onBlur} // แจ้ง form เมื่อออกจาก field
            placeholder="ชื่อ"
          />
        )}
      />

      {errors.firstName && (
        <Text style={s.errText}>{errors.firstName.message}</Text>
      )}

      <Text style={s.label}>นามสกุล</Text>
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[s.input, errors.lastName && s.err]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="นามสกุล"
          />
        )}
      />

      {errors.lastName && (
        <Text style={s.errText}>{errors.lastName.message}</Text>
      )}

      <Text style={s.label}>อีเมล</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[s.input, errors.email && s.err]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="อีเมล"
          />
        )}
      />

      {errors.email && <Text style={s.errText}>{errors.email.message}</Text>}

      <Text style={s.label}>bio</Text>
      <Controller
        control={control}
        name="bio"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[s.input, errors.bio && s.err]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="bio"
          />
        )}
      />

      {errors.bio && <Text style={s.errText}>{errors.bio.message}</Text>}

      <TouchableOpacity style={s.btn} onPress={handleSubmit(onSubmit)}>
        <Text style={s.btnText}>บันทึก</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  preview: {
    backgroundColor: '#dbeafe',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    color: '#1d4ed8',
  },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  err: { borderColor: '#ef4444' },
  errText: { color: '#ef4444', fontSize: 12, marginTop: 4 },
  btn: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

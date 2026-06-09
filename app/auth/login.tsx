import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '../../src/components/AppButton';
import { AppHeader } from '../../src/components/AppHeader';
import { firebaseAuth } from '../../src/firebase/auth';
import { isValidEmail, isValidPassword } from '../../src/utils/validation';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, FontSize, FontWeight, Spacing } from '../../src/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!isValidEmail(email)) { Alert.alert('Email inválido'); return; }
    if (!isValidPassword(password)) { Alert.alert('Contraseña muy corta (mínimo 6 caracteres)'); return; }
    setLoading(true);
    const user = await firebaseAuth.signInWithEmail(email, password);
    setLoading(false);
    if (user) {
      router.replace('/home');
    } else {
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifica tus datos o configura Firebase.');
    }
  };

  return (
    <View style={[styles.screen, { paddingBottom: insets.bottom + Spacing.xl }]}>
      <AppHeader title="Iniciar sesión" showBack />
      <View style={styles.content}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="tu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={Colors.textMuted}
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
          placeholderTextColor={Colors.textMuted}
        />

        <AppButton label="Entrar" onPress={handleLogin} loading={loading} style={{ marginTop: Spacing.md }} />

        <TouchableOpacity onPress={() => router.push('/auth/register')} style={styles.link}>
          <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/home')} style={styles.link}>
          <Text style={styles.linkText}>Continuar como invitado →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.sm },
  label: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.text },
  input: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  link: { alignItems: 'center', paddingVertical: Spacing.sm },
  linkText: { color: Colors.primary, fontSize: FontSize.md, fontWeight: FontWeight.medium },
});

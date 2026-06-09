import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../../src/components/AppHeader';
import { AppButton } from '../../src/components/AppButton';
import { AppCard } from '../../src/components/AppCard';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, FontSize, FontWeight, Spacing } from '../../src/constants/theme';

const FAMILY_KEY = '@family_profile';

interface FamilyProfile {
  name: string;
  members: string[];
  intention: string;
}

export default function FamilyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState<FamilyProfile | null>(null);
  const [name, setName] = useState('');
  const [member, setMember] = useState('');
  const [intention, setIntention] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(FAMILY_KEY).then((val) => {
      if (val) {
        try {
          setProfile(JSON.parse(val));
        } catch {
          setEditing(true);
        }
      } else {
        setEditing(true);
      }
    });
  }, []);

  const save = async () => {
    if (!name.trim()) { Alert.alert('Ingresa el nombre de tu familia'); return; }
    const p: FamilyProfile = { name: name.trim(), members, intention };
    await AsyncStorage.setItem(FAMILY_KEY, JSON.stringify(p));
    setProfile(p);
    setEditing(false);
  };

  const addMember = () => {
    if (!member.trim()) return;
    setMembers((m) => [...m, member.trim()]);
    setMember('');
  };

  if (profile && !editing) {
    return (
      <View style={styles.screen}>
        <AppHeader title="Familia" showBack />
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}>
          <AppCard style={styles.heroCard}>
            <Text style={styles.familyName}>🏠 Familia {profile.name}</Text>
            {profile.intention ? (
              <Text style={styles.intention}>Intención: {profile.intention}</Text>
            ) : null}
          </AppCard>

          <Text style={styles.sectionTitle}>Miembros</Text>
          {profile.members.map((m, i) => (
            <View key={i} style={styles.memberRow}>
              <Ionicons name="person-circle-outline" size={22} color={Colors.primary} />
              <Text style={styles.memberName}>{m}</Text>
            </View>
          ))}
          {profile.members.length === 0 && (
            <Text style={styles.empty}>No hay miembros agregados.</Text>
          )}

          <AppButton
            label="Rezar juntos ahora"
            onPress={() => router.push({ pathname: '/rosary/guided', params: {} })}
            style={{ marginTop: Spacing.md }}
          />
          <AppButton
            label="Editar perfil familiar"
            variant="outline"
            onPress={() => {
              setName(profile.name);
              setMembers(profile.members);
              setIntention(profile.intention);
              setEditing(true);
            }}
          />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader title="Perfil Familiar" showBack />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}>
        <Text style={styles.hint}>Crea el perfil de tu familia para rezar juntos.</Text>

        <Text style={styles.label}>Nombre de la familia</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ej: García"
          placeholderTextColor={Colors.textMuted}
        />

        <Text style={styles.label}>Agregar miembros</Text>
        <View style={styles.memberInput}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={member}
            onChangeText={setMember}
            placeholder="Nombre del miembro"
            placeholderTextColor={Colors.textMuted}
          />
          <TouchableOpacity onPress={addMember} style={styles.addBtn}>
            <Ionicons name="add" size={22} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        {members.map((m, i) => (
          <View key={i} style={styles.memberRow}>
            <Ionicons name="person-circle-outline" size={18} color={Colors.primary} />
            <Text style={styles.memberName}>{m}</Text>
            <TouchableOpacity onPress={() => setMembers((ms) => ms.filter((_, j) => j !== i))}>
              <Ionicons name="close-circle" size={18} color={Colors.danger} />
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.label}>Intención familiar (opcional)</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
          value={intention}
          onChangeText={setIntention}
          placeholder="Ej: Por la salud de nuestros abuelos..."
          placeholderTextColor={Colors.textMuted}
          multiline
        />

        <AppButton label="Guardar familia" onPress={save} style={{ marginTop: Spacing.md }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.sm },
  heroCard: { gap: Spacing.xs },
  familyName: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.primary },
  intention: { fontSize: FontSize.md, color: Colors.textSecondary, fontStyle: 'italic' },
  sectionTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text, marginTop: Spacing.md },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  memberName: { flex: 1, fontSize: FontSize.md, color: Colors.text },
  empty: { fontSize: FontSize.sm, color: Colors.textMuted, fontStyle: 'italic' },
  hint: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 22 },
  label: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.text, marginTop: Spacing.sm },
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
  memberInput: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center' },
  addBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

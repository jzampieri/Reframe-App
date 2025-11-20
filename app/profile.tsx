// app/profile.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { loadFromStorage, saveToStorage, STORAGE_KEYS, styles, User } from '../constants/futureSkills';

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      const user = await loadFromStorage<User | null>(STORAGE_KEYS.USER, null);
      if (user) {
        setName(user.name || '');
        setCurrentRole(user.currentRole || '');
        setTargetRole(user.targetRole || '');
      }
    };
    loadUser();
  }, []);

  const handleSave = async () => {
    if (!name || !currentRole || !targetRole) {
      alert('Preencha todos os campos.');
      return;
    }

    const user: User = { name, currentRole, targetRole };
    await saveToStorage(STORAGE_KEYS.USER, user);
    router.replace('dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>FutureSkills</Text>
        <Text style={styles.subtitle}>
          Plataforma de upskilling/reskilling com IA (simulada) para o Futuro do Trabalho.
        </Text>

        <Text style={styles.sectionTitle}>Seu perfil</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Como devemos te chamar?"
          placeholderTextColor="#6b7280"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Situação atual</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Suporte, Estagiário, Analista Jr..."
          placeholderTextColor="#6b7280"
          value={currentRole}
          onChangeText={setCurrentRole}
        />

        <Text style={styles.label}>Objetivo / Próximo papel</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Dev Back-end, Dados, Product Manager..."
          placeholderTextColor="#6b7280"
          value={targetRole}
          onChangeText={setTargetRole}
        />

        <Text style={styles.helperText}>
          Esses dados serão usados para personalizar as trilhas de aprendizado.
        </Text>

        <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
          <Text style={styles.primaryButtonText}>Salvar e ir para a avaliação</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

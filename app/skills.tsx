// app/skills.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
    SKILLS,
    STORAGE_KEYS,
    SkillLevels,
    loadFromStorage,
    saveToStorage,
    styles,
} from '../constants/futureSkills';

export default function SkillsScreen() {
  const router = useRouter();
  const [skillLevels, setSkillLevels] = useState<SkillLevels>({});

  useEffect(() => {
    const loadSkills = async () => {
      const stored = await loadFromStorage<SkillLevels>(STORAGE_KEYS.SKILLS, {});
      setSkillLevels(stored);
    };
    loadSkills();
  }, []);

  const updateSkill = (id: string, value: string) => {
    const numeric = parseInt(value || '0', 10);
    if (Number.isNaN(numeric) || numeric < 0 || numeric > 5) return;
    setSkillLevels((prev) => ({ ...prev, [id]: numeric }));
  };

  const handleSave = async () => {
    await saveToStorage(STORAGE_KEYS.SKILLS, skillLevels);
    router.replace('dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Avaliação de Habilidades</Text>
        <Text style={styles.subtitle}>
          Para cada skill, indique seu nível atual de 0 a 5. Isso ajuda a IA (simulada) a sugerir
          trilhas focadas nas suas lacunas.
        </Text>

        {SKILLS.map((skill) => (
          <View key={skill.id} style={styles.skillRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <Text style={styles.skillHint}>0 = nunca tive contato, 5 = muito domínio</Text>
            </View>
            <TextInput
              style={styles.skillInput}
              keyboardType="numeric"
              maxLength={1}
              placeholder="0"
              placeholderTextColor="#6b7280"
              value={skillLevels[skill.id]?.toString() ?? ''}
              onChangeText={(v) => updateSkill(skill.id, v)}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
          <Text style={styles.primaryButtonText}>Salvar e ver trilhas sugeridas</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

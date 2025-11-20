// app/path-detail.tsx
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import {
    LEARNING_PATHS,
    ProgressMap,
    STORAGE_KEYS,
    getBadgesFromXp,
    getLevelFromXp,
    loadFromStorage,
    saveToStorage,
    styles,
} from '../constants/futureSkills';

export default function PathDetailScreen() {
  const params = useLocalSearchParams<{ pathId: string }>();
  const pathId = params.pathId as string;

  const path = LEARNING_PATHS.find((p) => p.id === pathId);

  const [progress, setProgress] = useState<ProgressMap>({});
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const loadStored = async () => {
      const progressStored = await loadFromStorage<ProgressMap>(STORAGE_KEYS.PROGRESS, {});
      const gamificationStored = await loadFromStorage<{ xp: number }>(
        STORAGE_KEYS.GAMIFICATION,
        { xp: 0 },
      );
      setProgress(progressStored);
      setXp(gamificationStored.xp || 0);
    };
    loadStored();
  }, []);

  if (!path) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Trilha não encontrada</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const isModuleDone = (moduleId: string): boolean => {
    const pathProgress = progress[path.id] || {};
    return !!pathProgress[moduleId];
  };

  const toggleModule = async (moduleId: string) => {
    const pathProgress = progress[path.id] || {};
    const currentlyDone = !!pathProgress[moduleId];
    const newPathProgress = { ...pathProgress, [moduleId]: !currentlyDone };
    const newProgress: ProgressMap = { ...progress, [path.id]: newPathProgress };

    const module = path.modules.find((m) => m.id === moduleId);
    let newXp = xp;
    if (!currentlyDone) {
      newXp += module?.xp || 0;
    } else {
      newXp -= module?.xp || 0;
      if (newXp < 0) newXp = 0;
    }

    setProgress(newProgress);
    setXp(newXp);

    await saveToStorage(STORAGE_KEYS.PROGRESS, newProgress);
    await saveToStorage(STORAGE_KEYS.GAMIFICATION, { xp: newXp });

    const level = getLevelFromXp(newXp);
    const badges = getBadgesFromXp(newXp);

    Alert.alert(
      'Progresso atualizado',
      `XP total: ${newXp} | Nível: ${level}\nBadges: ${
        badges.length > 0 ? badges.join(', ') : 'nenhuma ainda'
      }`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{path.title}</Text>
        <Text style={styles.subtitle}>Papel alvo: {path.targetRole}</Text>
        <Text style={styles.helperText}>{path.futureDemandLabel}</Text>

        <Text style={styles.sectionTitle}>Módulos da trilha</Text>

        {path.modules.map((mod) => (
          <TouchableOpacity
            key={mod.id}
            style={[styles.card, isModuleDone(mod.id) && styles.cardDone]}
            onPress={() => toggleModule(mod.id)}
          >
            <Text style={styles.cardTitle}>{mod.title}</Text>
            <Text style={styles.cardSubtitle}>
              Tipo: {mod.type} | XP: {mod.xp}
            </Text>
            <Text style={styles.cardBody}>
              Status:{' '}
              {isModuleDone(mod.id)
                ? 'Concluído (toque para desfazer)'
                : 'Pendente (toque para concluir)'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

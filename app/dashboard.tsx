// app/dashboard.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
    LearningPath,
    ProgressMap,
    STORAGE_KEYS,
    SkillLevels,
    User,
    getBadgesFromXp,
    getLevelFromXp,
    getRecommendedPaths,
    loadFromStorage,
    styles,
} from '../constants/futureSkills';

export default function DashboardScreen() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [skillLevels, setSkillLevels] = useState<SkillLevels>({});
  const [progress, setProgress] = useState<ProgressMap>({});
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      const userStored = await loadFromStorage<User | null>(STORAGE_KEYS.USER, null);
      const skillsStored = await loadFromStorage<SkillLevels>(STORAGE_KEYS.SKILLS, {});
      const progressStored = await loadFromStorage<ProgressMap>(STORAGE_KEYS.PROGRESS, {});
      const gamificationStored = await loadFromStorage<{ xp: number }>(
        STORAGE_KEYS.GAMIFICATION,
        { xp: 0 },
      );

      setUser(userStored);
      setSkillLevels(skillsStored);
      setProgress(progressStored);
      setXp(gamificationStored.xp || 0);
      setLoading(false);
    };

    loadAll();
  }, []);

  const recommendedPaths = getRecommendedPaths(skillLevels);
  const level = getLevelFromXp(xp);
  const badges = getBadgesFromXp(xp);

  const handleRefazerAvaliacao = () => {
    router.push('skills');
  };

  const handleOpenPath = (path: LearningPath) => {
    router.push({ pathname: 'path-detail', params: { pathId: path.id } });
  };

  const percentCompleteForPath = (pathId: string): number => {
    const pathProgress = progress[pathId] || {};
    const done = Object.values(pathProgress).filter((v) => v === true).length;
    const total = recommendedPaths.find((p) => p.id === pathId)?.modules.length || 0;
    if (total === 0) return 0;
    return Math.round((done / total) * 100);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.splashText}>Carregando seus dados...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {user && (
          <View style={styles.section}>
            <Text style={styles.smallLabel}>Olá,</Text>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.subtitle}>
              Atual: {user.currentRole || '—'} {'\n'}
              Objetivo: {user.targetRole || '—'}
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seu progresso no Futuro do Trabalho</Text>
          <Text style={styles.gamificationText}>XP: {xp}</Text>
          <Text style={styles.gamificationText}>Nível: {level}</Text>

          {badges.length > 0 && (
            <View style={styles.badgeBox}>
              <Text style={styles.badgeTitle}>Badges conquistadas:</Text>
              {badges.map((badge) => (
                <Text key={badge} style={styles.badgeText}>
                  • {badge}
                </Text>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trilhas sugeridas para você</Text>
          <Text style={styles.helperText}>
            Baseado nas suas habilidades atuais e no papel que você deseja assumir.
          </Text>

          <FlatList
            data={recommendedPaths}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => handleOpenPath(item)}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>Papel alvo: {item.targetRole}</Text>
                <Text style={styles.cardBody}>{item.futureDemandLabel}</Text>
                <Text style={styles.cardProgress}>
                  Progresso: {percentCompleteForPath(item.id)}%
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleRefazerAvaliacao}>
          <Text style={styles.secondaryButtonText}>Refazer avaliação de habilidades</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

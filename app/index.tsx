import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { loadFromStorage, STORAGE_KEYS, styles, User } from '../constants/futureSkills';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const user = await loadFromStorage<User | null>(STORAGE_KEYS.USER, null);
      if (user) {
        router.replace('dashboard');
      } else {
        router.replace('profile');
      }
    };

    checkUser();
  }, [router]);

  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" />
      <Text style={styles.splashText}>Carregando...</Text>
    </View>
  );
}

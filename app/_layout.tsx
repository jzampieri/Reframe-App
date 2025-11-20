import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        options={{ title: 'Seu Perfil' }}
      />
      <Stack.Screen
        name="dashboard"
        options={{ title: 'Reframe' }}
      />
      <Stack.Screen
        name="skills"
        options={{ title: 'Avaliação de Habilidades' }}
      />
      <Stack.Screen
        name="path-detail"
        options={{ title: 'Detalhes da Trilha' }}
      />
    </Stack>
  );
}

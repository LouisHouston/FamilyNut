import { View, Button, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../providers/AuthProvider';
import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit  = () => {};
    const { signIn } = useAuth();
  
  const handleLogin = async () => {
    // Replace with real API login
    const fakeToken = 'abc123';
    const fakeUser = { id: '1', email: 'test@example.com' };
    await signIn(fakeToken, fakeUser);
    router.push('/'); // or router.replace('/(public)') if you don't want the user to go back to login
    // router.replace('/(public)');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <ThemedText type="title" style={{ marginBottom: 20 , textAlign: 'center' }}>fLogin</ThemedText>
        <TextInput placeholder='Email' value={email} onChangeText={setEmail} style={{ backgroundColor: 'lightgray', padding: 10, marginBottom: 10, color: 'red' }} />
        <TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry style={{ color: 'red', backgroundColor: 'lightgray', padding: 10, marginBottom: 10 }} />
        <Button title="Login" onPress={handleLogin}  />
        <Pressable onPress={() => router.back()}>
            <ThemedText> Back </ThemedText>
        </Pressable>
    </GestureHandlerRootView>
  );
}
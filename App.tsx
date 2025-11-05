import { useFonts, Lexend_400Regular, Lexend_500Medium, Lexend_700Bold } from '@expo-google-fonts/lexend';
import AppNavigator from './navigation/AppNavigator';
import { View, Text } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    'lexend-regular': Lexend_400Regular,
    'lexend-medium': Lexend_500Medium,
    'lexend-bold': Lexend_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return <AppNavigator />;
}
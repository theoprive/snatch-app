// App.tsx (extrait avec ajout UserProvider)
import React from 'react';
import { useFonts, Lexend_400Regular, Lexend_500Medium, Lexend_700Bold } from '@expo-google-fonts/lexend';
import AppNavigator from './navigation/AppNavigator';
import { View, Text, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Colors } from './theme/colors';
import { SnatchProvider } from './context/SnatchContext';
import { UserProvider } from './context/UserContext'; // <-- nouvel import

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <UserProvider> {/* ← nouvel provider */}
        <SnatchProvider>
          <BottomSheetModalProvider>
            <AppNavigator />
          </BottomSheetModalProvider>
        </SnatchProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}

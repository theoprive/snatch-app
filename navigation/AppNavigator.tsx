import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Animated } from 'react-native';
import SplashScreen from '../screens/Splash/SplashScreen';
import AccessScreen from '../screens/Auth/AccessScreen';
import OupsScreen from '../screens/Auth/OupsScreen';
import VerificationScreen from '../screens/Auth/VerificationScreen';
import MainTabs from './MainTabs';
import ProfileCreate from '../screens/Profil/ProfileCreate';
import { AppStackParamList } from './types';
import SnatchDetailScreen from '../screens/Snatch/SnatchDetailScreen'
import WelcomeScreen from '../screens/Auth/WelcomeScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // transition en fondu
          animation: 'fade', // pour react-native-screens/native-stack >= v3
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Access" component={AccessScreen} />
        <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
        <Stack.Screen name="OupsScreen" component={OupsScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="ProfileCreate" component={ProfileCreate} />
        <Stack.Screen name="SnatchDetail" component={SnatchDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

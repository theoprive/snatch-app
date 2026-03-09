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
import SnatchPublished from '../screens/Snatch/SnatchPublished';
import SnatchScreen from '../screens/Snatch/SnatchScreen';
import MultipassScreen from '../screens/Profil/MultipassScreen';
import ClubNavigator from './ClubNavigator';
import ViewProfile from '../screens/Profil/ViewProfile';
import ViewClub from '../screens/Profil/ViewClub';

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
        <Stack.Screen name="SnatchScreen" component={SnatchScreen} />
        <Stack.Screen name="SnatchDetail" component={SnatchDetailScreen} />
        <Stack.Screen name="SnatchPublished" component={SnatchPublished} options={{ headerShown: false }}/>
        <Stack.Screen name="MultipassScreen" component={MultipassScreen} />
        <Stack.Screen name="ClubStack" component={ClubNavigator} />
        <Stack.Screen name="ViewProfile" component={ViewProfile} />
        <Stack.Screen name="ViewClub" component={ViewClub} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

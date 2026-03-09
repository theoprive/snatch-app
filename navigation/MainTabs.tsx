import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/Feed/FeedScreen';
import ExplorerScreen from '../screens/Explorer/ExplorerScreen';
import SnatchScreen from '../screens/Snatch/SnatchScreen';
import ProfilScreen from '../screens/Profil/ProfilScreen';

import FeedIcon from '../assets/icons/navigations/FeedIcon';
import ExplorerIcon from '../assets/icons/navigations/ExplorerIcon';
import SnatchIcon from '../assets/icons/navigations/SnatchIcon';
import ChatIcon from '../assets/icons/navigations/ChatIcon';
import ProfilIcon from '../assets/icons/navigations/ProfilIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';



import { Colors } from '../theme/colors';
import ChatStack from './ChatStack';

const Tab = createBottomTabNavigator();



export default function MainTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50 + insets.bottom,
          paddingTop: 8,
          backgroundColor: '#121212',
          borderTopWidth: 0,
        }
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FeedIcon width={32} height={32} fill={focused ? Colors.primary : '#888'} />
          ),
        }}
        
      />
      <Tab.Screen
        name="Explorer"
        component={ExplorerScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ExplorerIcon width={32} height={32} color={focused ? Colors.primary : Colors.button} />
          ),
        }}
        
      />
      <Tab.Screen
        name="Snatch"
        component={SnatchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SnatchIcon width={40} height={40} fill={focused ? Colors.primary : '#888'} />
          ),
        }}
        listeners={{
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <ChatIcon width={36} height={36} fill={focused ? Colors.primary : '#888'} />
          ),
        }}
        
      />
      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfilIcon width={36} height={36} fill={focused ? Colors.primary : '#888'} />
          ),
        }}
        
      />
    </Tab.Navigator>
  );
}

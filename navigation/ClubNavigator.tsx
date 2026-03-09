import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClubStackParamList } from './types';

import CreateClubStep1 from '../screens/Club/CreateClubStep1';
import CreateClubStep2 from '../screens/Club/CreateClubStep2';
import ClubCreated from '../screens/Club/ClubCreated';
import ClubProfile from '../screens/Club/ClubProfile';
import ModifyClub from '../screens/Club/ModifyClub'

const Stack = createNativeStackNavigator<ClubStackParamList>();

export default function ClubNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateClubStep1" component={CreateClubStep1} />
      <Stack.Screen name="CreateClubStep2" component={CreateClubStep2} />
      <Stack.Screen name="ClubCreated" component={ClubCreated} />
      <Stack.Screen name="ClubProfile" component={ClubProfile} />
      <Stack.Screen name="ModifyClub" component={ModifyClub} />
    </Stack.Navigator>
  );
}

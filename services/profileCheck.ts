import { getCurrentUser } from './auth';
import { NavigationProp } from '@react-navigation/native';

export async function ensureProfile(navigation: NavigationProp<any>, action?: () => void) {
  const user = await getCurrentUser();
  if (!user || !user.hasProfile) {
    navigation.navigate('ProfileCreate');
    return;
  }
  if (action) action();
}

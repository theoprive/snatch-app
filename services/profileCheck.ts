import { getCurrentUser } from './auth';
import { NavigationProp } from '@react-navigation/native';

export async function ensureProfile(
  navigation: NavigationProp<any>,
  action?: () => void
) {
  const user = await getCurrentUser();

  if (!user) {
    console.log("Aucun utilisateur connecté — redirection vers ProfileCreate");
    navigation.navigate('ProfileCreate');
    return;
  }

  if (!user.hasProfile) {
    console.log(`Utilisateur ${user.email} trouvé mais profil incomplet — redirection vers ProfileCreate`);
    navigation.navigate('ProfileCreate');
    return;
  }

  console.log(`Profil OK pour ${user.email} — accès autorisé`);
  if (action) action();
}

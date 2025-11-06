// services/auth.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockUsers, User } from "../data/mockDatabase";

const STORAGE_KEY = "@snatch_current_user";

/**
 * Recherche un utilisateur existant par email dans mockUsers
 */
export async function findUserByEmail(email: string): Promise<User | undefined> {
  return mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
}

/**
 * Connexion simulée
 */
export async function signInWithEmail(email: string): Promise<{ user: User; message: string }> {
  const found = await findUserByEmail(email);
  
  if (found) {
    // Utilisateur existant
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    return { user: found, message: `Content de te revoir ${found.firstName ?? email.split("@")[0]}` };
  }

  // Nouvel utilisateur simulé
  const newUser: User = {
    id: "u_local_" + Date.now().toString(),
    email,
    hasProfile: false,
    campus: "Kedge Bordeaux",
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  return { user: newUser, message: "Bienvenue — crée ton profil pour débloquer toutes les fonctionnalités" };
}

/**
 * Récupère l’utilisateur courant depuis AsyncStorage
 */
export async function getCurrentUser(): Promise<User | null> {
  const s = await AsyncStorage.getItem(STORAGE_KEY);
  return s ? (JSON.parse(s) as User) : null;
}

/**
 * Met à jour l’utilisateur courant
 */
export async function updateCurrentUser(patch: Partial<User>): Promise<User | null> {
  const cur = await getCurrentUser();
  if (!cur) return null;
  const updated = { ...cur, ...patch };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Déconnexion
 */
export async function signOut() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

// utils/clubUtils.ts

import { Club, User } from "../data/mockDatabase";

/**
 * Vérifie si l'utilisateur est admin principal d'un club
 */
export function isClubAdmin(user: User, club: Club): boolean {
  return user.adminClub === club.id;
}

/**
 * Vérifie si l'utilisateur est co-admin d'un club
 */
export function isClubCoAdmin(user: User, club: Club): boolean {
  return club.coAdmins?.includes(user.id) ?? false;
}

/**
 * Vérifie si l'utilisateur est membre simple d'un club
 */
export function isClubMember(user: User, club: Club): boolean {
  return club.members?.includes(user.id) ?? false;
}

/**
 * Retourne le rôle de l'utilisateur dans un club donné
 */
export function getUserRoleInClub(user: User, club: Club): "admin" | "co-admin" | "member" | "none" {
  if (isClubAdmin(user, club)) return "admin";
  if (isClubCoAdmin(user, club)) return "co-admin";
  if (isClubMember(user, club)) return "member";
  return "none";
}

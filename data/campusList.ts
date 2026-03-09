// data/universities.ts

export type University = {
  domain: string; // domaine du mail, ex: kedgebs.com
  name: string;   // nom officiel
  logo : any;     // chemin vers l'image
};

export const universities: University[] = [
  { domain: 'kedgebs.com', name: 'Kedge Bordeaux', logo: require('../assets/images/campus/kedge_logo.png') },
  { domain: 'etu.u-bordeaux.fr', name: 'Université de Bordeaux', logo: require('../assets/images/campus/udeb_logo.png') },
  // ajoute les futurs campus ici
];

/**
 * Fonction helper pour trouver le nom du campus depuis l'email
 */
export function getCampusFromEmail(email: string): string {
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  const uni = universities.find(u => domain.endsWith(u.domain));
  return uni ? uni.name : ''; // retourne une string vide si aucune correspondance
}



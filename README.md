# AfriConnect Summit 2026

**Nom / Classe :** NOM Prenom — Groupe ISI, L1
**Projet :** Examen Web — Site vitrine d'une conférence tech fictive panafricaine
**Durée :** 2 semaines

## Description

Site vitrine complet pour « AfriConnect Summit », sommet tech et business
panafricain fictif se tenant du 12 au 14 mars 2027 à Diamniadio (Sénégal).
Le site présente l'événement, son programme sur trois jours, ses intervenants
et permet l'inscription en ligne.

Direction artistique : palette « braise orangée » et effet de **verre
liquide** (glassmorphism + nappes de dégradé animées en arrière-plan), pensée
comme identité visuelle propre au projet plutôt qu'un thème générique.

## Technologies utilisées

- **HTML5** sémantique (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** : variables custom properties, Flexbox, CSS Grid, media queries, animations
- **JavaScript vanilla** (aucune librairie, aucun framework)
- **Google Fonts** : Bricolage Grotesque (titres) + Albert Sans (texte)
- **Bootstrap Icons** (CDN) pour les icônes
- **Git & GitHub** pour le versioning, **GitHub Pages** pour le déploiement

## Fonctionnalités JavaScript implémentées

1. Dark mode / Light mode avec persistance `localStorage`, partagé entre les 4 pages
2. Navbar dynamique (fond + ombre après 80px) et menu hamburger mobile
3. Animations fade-in / slide-in / zoom-in au scroll via `IntersectionObserver`
4. Compte à rebours en temps réel vers la date du sommet
5. Compteurs animés des chiffres clés au scroll
6. Onglets du programme (Jour 1 / Jour 2 / Jour 3) sans rechargement de page
7. Filtrage dynamique des intervenants par thématique
8. Validation complète du formulaire d'inscription (regex e-mail, téléphone,
   longueur du message) avec retour visuel par champ
9. Bouton retour en haut (apparition après 300px, défilement fluide)
10. Année dynamique injectée dans tous les pieds de page

La FAQ de la page Contact est un accordéon **100% CSS** (`:checked`), sans
aucune ligne de JavaScript, conformément au cahier des charges.

## Arborescence

```
NOM-Prenom-AfriConnectSummit/
├── index.html
├── programme.html
├── intervenants.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
└── README.md
```

## Note sur les images

Les portraits des intervenants sont volontairement remplacés par des avatars
générés en CSS (initiales sur dégradé de couleur), afin de garder une identité
graphique cohérente sans dépendre de photos de stock. Si des photos réelles
sont souhaitées, il suffit de déposer les fichiers dans `images/` (Unsplash /
Pexels, libres de droits) et de remplacer les `div.avatar-intervenant` par des
balises `<img>` avec un attribut `alt` descriptif.

## Lien GitHub Pages

À compléter après déploiement : `https://VOTRE-PSEUDO.github.io/NOM-Prenom-AfriConnectSummit/`

## Ressources consultées

- MDN Web Docs — https://developer.mozilla.org/fr/
- CSS-Tricks (Flexbox & Grid) — https://css-tricks.com/
- Google Fonts — https://fonts.google.com/
- Bootstrap Icons — https://icons.getbootstrap.com/
- W3C Validator — https://validator.w3.org/
- Sites d'inspiration listés dans le sujet d'examen (Web Summit, Awwwards, Figma Config, Google I/O, Africa Tech Summit)

## Suivi Git conseillé

Le cahier des charges impose un minimum de 8 commits répartis sur les deux
semaines. Suggestion de découpage :

1. Initialisation du dépôt + arborescence
2. Structure HTML de `index.html`
3. Structure HTML des 3 pages internes
4. Variables CSS + thème clair/sombre
5. Mise en page Flexbox/Grid des sections
6. Responsive (mobile/tablette/desktop)
7. JavaScript : navbar, thème, scroll, compte à rebours
8. JavaScript : onglets, filtrage, validation de formulaire
9. Relecture, validation W3C, correctifs finaux
10. Déploiement GitHub Pages + rédaction du README

# Ma Grossesse 🤍

Application web progressive (PWA) de suivi de grossesse semaine par semaine, avec un guide d'alimentation détaillé. Mobile-first, hors-ligne, installable sur iOS et Android.

## ✨ Fonctionnalités

### Suivi de grossesse
- **37 semaines** (4 → 40) avec taille, poids, comparaison ludique et description
- **Calcul automatique** depuis la date prévue d'accouchement (DPA)
- **Mise à jour dynamique** : la semaine se met à jour automatiquement à chaque retour sur l'app
- **Stepper et slider** pour explorer manuellement
- **Animation douce** lors du changement de semaine (fade + cercle qui grandit)

### Guide alimentation (200+ aliments)
- 9 catégories : viandes, poissons, fromages, œufs, charcuterie, alcool, boissons chaudes, tisanes, sucres, épices, compléments…
- Statut clair : **vert** (OK), **orange** (attention), **rouge** (à éviter)
- Pour chaque aliment : explication du risque + alternative
- **Recherche instantanée** avec autocomplete (insensible aux accents)
- **Filtres rapides** par statut + favoris
- **Mode sombre** automatique ou forcé

### PWA
- Installable sur écran d'accueil iOS/Android
- Fonctionne hors ligne (service worker, cache des données)
- Standalone (sans barre d'URL)

## 🛠 Stack technique

- HTML / CSS / JavaScript vanilla — aucune dépendance
- Single-file (tout dans `index.html`)
- Stockage : `localStorage` (favoris, DPA, semaine, préférences thème)
- Polices : Fraunces + DM Sans (Google Fonts, mises en cache)

## 📁 Structure du repo

```
ma-grossesse/
├── index.html              # L'application complète
├── manifest.json           # Manifest PWA
├── sw.js                   # Service worker
├── icon-192.png            # Icône Android
├── icon-512.png            # Icône Android haute résolution
├── icon-maskable-512.png   # Icône maskable (Android)
├── apple-touch-icon.png    # Icône iOS (180×180)
├── favicon-32.png          # Favicon navigateur
├── .nojekyll               # Empêche Jekyll de filtrer les fichiers
└── README.md
```

## 🚀 Déploiement sur GitHub Pages

### Option 1 — Nouveau dépôt

```bash
# 1. Crée un nouveau dépôt sur github.com (par exemple ma-grossesse)
# 2. Clone-le en local et copie tous les fichiers dedans
git clone https://github.com/<ton-user>/ma-grossesse.git
cd ma-grossesse
# Copie le contenu du dossier output_repo/ ici, puis :
git add .
git commit -m "Initial commit: Ma Grossesse PWA"
git push origin main
```

### Option 2 — Sous l'organisation `app-WEYNII` (ton pattern habituel)

```bash
git clone https://github.com/app-WEYNII/ma-grossesse.git
cd ma-grossesse
# Copie le contenu de output_repo/
git add .
git commit -m "Init"
git push
```

### Activer GitHub Pages

1. Va dans **Settings** → **Pages** du dépôt
2. Source : **Deploy from a branch**
3. Branche : `main` / dossier `/ (root)`
4. Sauvegarde

L'URL sera disponible sous quelques minutes :
- `https://<user>.github.io/ma-grossesse/`
- ou `https://app-weynii.github.io/ma-grossesse/`

## 📲 Installation sur mobile

### iOS (Safari)
1. Ouvre l'URL dans Safari
2. Bouton **Partager** → **Sur l'écran d'accueil**
3. Confirme

### Android (Chrome)
1. Ouvre l'URL dans Chrome
2. Menu (⋮) → **Installer l'application**

## 🔄 Mise à jour du cache

À chaque modification, **incrémente** la constante `CACHE_VERSION` dans `sw.js` :

```js
const CACHE_VERSION = 'ma-grossesse-v2'; // était v1
```

Sans ça, les utilisateurs installés ne verront pas les nouvelles versions.

## 🎨 Personnalisation

### Couleurs (palette dusty rose / sage / cream)
Dans `index.html`, cherche `:root {` et modifie les variables CSS :
```css
--primary: #c97d8e;   /* dusty rose */
--accent: #8a9a7e;    /* sage */
--bg: #faf6f1;        /* cream */
```

### Polices
Modifie le `<link rel="stylesheet">` Google Fonts dans le `<head>` et les variables :
```css
--font-display: 'Fraunces', serif;
--font-body: 'DM Sans', sans-serif;
```

### Icône
Remplace les `.png` par tes propres assets aux mêmes dimensions :
- 192×192, 512×512 (Android)
- 512×512 maskable (Android adaptative)
- 180×180 (iOS)
- 32×32 (favicon)

## ⚠️ Avertissement médical

> Cette application est strictement **informative**. Elle ne remplace en aucun cas l'avis d'un professionnel de santé.
> Les recommandations alimentaires sont basées sur les directives générales de prévention (toxoplasmose, listériose, mercure, alcool). Consulte ta sage-femme ou ton médecin pour toute question.

## 📝 Licence

Usage personnel. Tu peux la copier/forker/modifier librement.

---

Fait avec ☕ pour une future maman 🤍

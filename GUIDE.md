# 📋 Guide d'installation – Charte HBMHJ

Ce guide vous explique pas à pas comment mettre en place le système complet :  
**Google Sheet → Google Apps Script → GitHub → Vercel**

---

## Étape 1 – Créer le Google Sheet

1. Ouvrez [Google Sheets](https://sheets.google.com) et créez une **nouvelle feuille de calcul**.
2. Nommez-la par exemple : `Acceptations Charte HBMHJ 2026`.
3. Copiez l'**ID du Sheet** depuis l'URL de votre navigateur :  
   ```
   https://docs.google.com/spreadsheets/d/  [COPIEZ_CE_SEGMENT]  /edit
   ```
   Gardez cet ID de côté, vous en aurez besoin à l'étape suivante.

> ℹ️ Le script créera automatiquement les colonnes **Nom / Prénom / Horodatage** lors de la première soumission.

---

## Étape 2 – Créer et déployer le Google Apps Script

### 2a – Ouvrir l'éditeur Apps Script

1. Dans votre Google Sheet, allez dans le menu : **Extensions → Apps Script**.
2. L'éditeur de script s'ouvre dans un nouvel onglet.

### 2b – Copier le code

1. Supprimez le contenu par défaut (`function myFunction() {}`).
2. Copiez le contenu du fichier **`Code.gs`** fourni dans ce repo et collez-le dans l'éditeur.
3. Remplacez la ligne :
   ```js
   var SHEET_ID = 'VOTRE_SHEET_ID_ICI';
   ```
   par l'ID copié à l'étape 1 :
   ```js
   var SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms'; // exemple
   ```
4. Cliquez sur **💾 Enregistrer** (ou `Cmd+S`).

### 2c – Déployer en tant que Web App

1. Cliquez sur **Déployer → Nouveau déploiement**.
2. À côté de "Type", cliquez sur l'icône ⚙️ et choisissez **Application Web**.
3. Remplissez :
   - **Description** : `Charte HBMHJ v1`
   - **Exécuter en tant que** : `Moi` (votre compte Google)
   - **Qui a accès** : **`Tout le monde`** ← ⚠️ indispensable pour que Vercel puisse envoyer les données
4. Cliquez sur **Déployer**.
5. Google vous demande d'**autoriser** l'accès au Sheet → cliquez sur **Autoriser** et acceptez.
6. Une fois le déploiement terminé, copiez l'**URL de l'application Web** (elle ressemble à) :
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

> ⚠️ Cette URL est la clé. Ne la partagez pas publiquement (toute personne la connaissant pourrait écrire dans votre Sheet).

---

## Étape 3 – Coller l'URL dans index.html

1. Ouvrez le fichier `index.html` du repo.
2. Repérez la ligne (vers la fin du fichier, dans la balise `<script>`) :
   ```js
   const APPS_SCRIPT_URL = 'VOTRE_URL_APPS_SCRIPT_ICI';
   ```
3. Remplacez `VOTRE_URL_APPS_SCRIPT_ICI` par l'URL copiée :
   ```js
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```
4. Sauvegardez le fichier.

---

## Étape 4 – Pousser le repo sur GitHub

> Si le repo est déjà créé et cloné (ce qui est le cas ici), vous pouvez directement passer au commit.

Dans votre terminal, depuis le dossier du projet :

```bash
cd /Users/valentinetesse/Documents/GitHub/HBMHJ

git add index.html charte.pdf Code.gs GUIDE.md
git commit -m "feat: charte graphique + formulaire d'acceptation"
git push origin main
```

Vérifiez sur GitHub que les fichiers sont bien présents :
- `index.html`
- `charte.pdf`
- `Code.gs`
- `GUIDE.md`

---

## Étape 5 – Déployer sur Vercel

### 5a – Connexion à Vercel

1. Rendez-vous sur [vercel.com](https://vercel.com) et connectez-vous (ou créez un compte gratuit).
2. Cliquez sur **Add New → Project**.

### 5b – Importer le repo GitHub

1. Cliquez sur **Import Git Repository**.
2. Autorisez Vercel à accéder à votre compte GitHub si ce n'est pas déjà fait.
3. Sélectionnez le repo `KingIrdawen/HBMHJ` dans la liste.

### 5c – Configuration du projet

Vercel détecte automatiquement qu'il s'agit d'un **site statique** (pas de framework).

- **Framework Preset** : `Other` (ou laissez vide)
- **Root Directory** : `/` (racine du repo)
- **Build Command** : laisser vide
- **Output Directory** : laisser vide (ou `.`)

Cliquez sur **Deploy**.

### 5d – Votre site est en ligne !

Vercel vous donne une URL de type :
```
https://hbmhj.vercel.app
```

À chaque `git push` sur la branche `main`, Vercel redéploiera automatiquement le site.

---

## Étape 6 – Vérification end-to-end

1. Ouvrez l'URL Vercel dans votre navigateur.
2. Vérifiez que le PDF s'affiche correctement.
3. Remplissez Nom + Prénom → la case à cocher s'active.
4. Cochez → le bouton s'active.
5. Cliquez sur **Valider** → le message de confirmation apparaît.
6. Ouvrez votre Google Sheet → une nouvelle ligne doit être présente avec Nom, Prénom et horodatage.

---

## Résumé des fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Page web complète (HTML + CSS + JS) |
| `charte.pdf` | Charte graphique du club affichée en ligne |
| `Code.gs` | Script Google Apps Script (backend léger) |
| `GUIDE.md` | Ce guide d'installation |

---

## En cas de problème

| Symptôme | Solution |
|---|---|
| Le PDF ne s'affiche pas | Vérifiez que `charte.pdf` est bien à la racine du repo et bien déployé sur Vercel |
| Erreur CORS lors de l'envoi | Vérifiez que la Web App Apps Script est déployée avec accès "Tout le monde" |
| Rien n'apparaît dans le Sheet | Vérifiez le `SHEET_ID` dans `Code.gs` et les permissions du script |
| Vercel ne voit pas le repo | Allez dans les paramètres GitHub de Vercel et autorisez l'accès au repo |

# github-users

## Installer le projet
```
npm install
```

Créer un fichier .env.local avec une variable d'environnement `VUE_APP_TOKEN=<token>` contenant un token pour l'authentification à l'API

### Lancer le serveur de développement
```
npm run serve
```

### Compiler pour la production
```
npm run build
```

### Lancer eslint
```
npm run lint
```

### Dépendances utilisées
* vue-select pour le dropdown des filtres
* vue-highlight-text pour mettre la chaîne de caractères recherchée en surbrillance sur les logins
* @beyonk/google-fonts-webpack-plugin pour mettre en place facilement des google fonts

### Pistes d'amélioration
* Factorisation des fonctions d'appel vers l'API github
* Mise en place de tests unitaires
* Déploiement automatique vers un serveur distant

# 
- Utiliser Typescript !
  - Créer des types Movie et MovieSearchResult utilisables dans toute l'application.
  - Créer une classe Omdb qui fait office de service pour appeller l'API avec la fonction de recherche et de récupération de film. (nommées searchMovies et getMovie par exemple).
  - Regardez apps/react-app/src/JSON.d.ts, les définitions JSON.parse() et de response.json() ( utilisé après un fetch ) ont été modififés pour retourner __unknown__. Vous devrez parser les résultats de ces fonctions et prouver au système de type que les résultats correspondent aux schémas attendus. Il n'est pas nécessaire de couvrir l'intégralité du schéma proposé par OMBD, uniquement les propriétés dont vous avez besoin dans l'application.Vous pouvez prendre en charge la rédaction de fonctions de parsing/validation, mais vous êtes libre d'utiliser une librairie si vous en connaissez une.

# 💡 Pensez-y

- Gérez les erreurs et affichez un message dans l'interface (pas seulement dans la console ou avec une alert box)
- Gérer les temps de chargement visuellement (Avec un composant CircularProgress de la librairie Material UI par exemple)

# ✅ Livrable

Pusher le code sur un dépot Github public.

- Bonus :
  + Builder et déployer l'app ( e.g. sur github-pages ).

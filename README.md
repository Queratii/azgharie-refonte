# Azgharie — refonte visuelle (HTML/CSS statique)

> Maquette de refonte visuelle — non indexée par les moteurs de recherche (balise `noindex` sur chaque page). Le site officiel reste [azgharie.net](https://www.azgharie.net).

Maquette intégrée de la refonte « L'Atlas d'Azgharie ». Le site est pensé pour être repris dans le WordPress existant (ou tout autre CMS) : aucune dépendance, aucun build.

## Structure

```
index.html              Accueil
agenda.html             Agenda (« tableau des départs », filtres par jeu)
elite-dangerous.html    Territoire 01 (+ vidéos ED, BD Les Zarbros)
flight-simulator.html   Territoire 02 (World Tour 2, Azgharie Airlines, archives)
f1.html                 Territoire 03 (Ligue Azgharienne)
no-mans-sky.html        Territoire 04 (guilde)
planet-coaster-2.html   Territoire 05 (NexChesterLand)
multigaming.html        Territoire 06
contacts.html           Réseaux, soutien, chaînes recommandées
assets/css/style.css    Feuille unique, jetons en tête de fichier (:root)
assets/js/main.js       Menu mobile, sous-menu « Territoires », filtres de l'agenda
assets/img/cocarde.svg  Emblème / favicon
```

## Système visuel

- **Couleurs** : toutes définies en variables CSS dans `:root` (Nuit `#0B1B33`, Encre `#12305A`, Azur `#2A72B0`, Ciel `#8EC3EE`, Papier `#EEF3F8`…). L'orange `--signal` est réservé au « en direct » et à l'état actif.
- **Polices** (Google Fonts) : Archivo (titres en largeur 125 %, textes), IBM Plex Mono (codes, horaires, étiquettes).
- **Animations** : uniquement le survol (200 ms) et la pulsation lente du point « direct ». Tout est désactivé si l'utilisateur a demandé moins d'animations (`prefers-reduced-motion`).
- **Responsive** : testé à 1440 px et 390 px, sans défilement horizontal. Le menu passe en burger sous 1080 px ; les tableaux de l'agenda deviennent des fiches empilées sous 760 px.

## À brancher par le développeur

Les zones à remplacer sont signalées en commentaire HTML (`<!-- IMAGE : … -->`, `<!-- DONNÉES : … -->`, `<!-- CARTE : … -->`) et affichées sous forme de blocs hachurés bleus `[…]`.

| Zone | Où | Source suggérée |
|---|---|---|
| Captures des jeux | accueil, multigaming, Planet Coaster 2 | médiathèque WordPress actuelle — remplacer le bloc `.ph` par `<img class="media" src="…" alt="">` |
| 3 dernières vidéos | accueil, Elite Dangerous | flux / API YouTube de la chaîne |
| Prochains directs + agenda | accueil, agenda | calendrier existant (plugin agenda). Une ligne = un `.board__row` avec `data-territoire="ed|msfs|f1|nms|pc2|multi"` ; un jour = un bloc `[data-day]` |
| Bandeau « Prochain direct » | haut de toutes les pages | premier événement à venir de l'agenda |
| Compteurs et itinéraire du World Tour | accueil, flight-simulator | Google Sheet / données actuelles de la page World Tour 2 |
| Carte Leaflet du World Tour | flight-simulator | reprendre la carte existante |
| Derniers vols Azgharie Airlines | flight-simulator | flux FSHub (exemple avec les vols du 08/10/2026) |
| Glyphes du portail NMS | no-mans-sky | image actuelle de la page NMS |
| Planches BD Les Zarbros | elite-dangerous | images actuelles |
| Avatar / pseudo du passeport | accueil | décoratif, peut rester tel quel |

Les liens vers les sous-pages non refaites (Livrées, Mods & logiciels, Azgharie Airlines, parc NexChesterLand) pointent vers les URL actuelles du site.

## Points à confirmer

- **Saison F1** : la page F1 actuelle indique « saison 7 en cours », l'agenda annonce la saison 8 (F1 26) le 16 octobre. La maquette affiche la saison 8 ; le règlement pointe encore sur `saison7.pdf`.
- **Repères de la semaine** (agenda) : déduits de l'agenda d'octobre (F1 ven. 20h, NMS sam. 13h, ED dim. 13h, World Tour dim. 20h).

## Bugs relevés sur le site actuel

- Pied de page : le lien Discord commence par `tel:` et le lien de l'extension Firefox par `mailto:` → les deux sont cassés.
- Accueil : la section « Mes dernières vidéos » s'affiche vide.

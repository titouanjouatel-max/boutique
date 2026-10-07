# Mettre la boutique BRAISE en ligne sur Shopify

Trois fichiers :

- `braise-theme.zip` : le thème (design sobre, blanc + orange)
- `produit-braise.csv` : le produit avec ses 12 variantes (3 packs × 4 coloris), prêt à importer
- ce guide

## 1. Importer le produit (2 min)

Admin Shopify › **Produits** › **Importer** › choisir `produit-braise.csv` › **Importer**.

Le produit contient :

- les packs **Solo ×1**, **Duo ×2** et **Famille ×3**, à 24,99 €, 44,99 € et 59,99 € ;
- les coloris **Argent**, **Or**, **Rose** et **Noir** ;
- le coût d'achat AliExpress (7,49 € par unité), pour que Shopify calcule ta marge.

Les 7 photos du produit sont déjà intégrées au thème (accueil, packs, fiche produit). Ajoute-les aussi sur la fiche produit dans Shopify (Produits › Chauffe-mains › Médias) pour qu'elles apparaissent dans le panier, au paiement et dans les e-mails de commande.

Garde les noms des options « Pack » et « Couleur », et le « ×N » à la fin des noms de packs : le thème s'en sert pour calculer la remise et le prix à l'unité.

## 2. Installer le thème (2 min)

**Boutique en ligne** › **Thèmes** › **Ajouter un thème** › **Importer un fichier zip** › `braise-theme.zip`.

Puis **Personnaliser** › **Paramètres du thème** (icône engrenage) › **Produit** › choisis « Chauffe-mains rechargeable ». Clique sur **Publier** quand tout te va.

## 3. Livraison

**Paramètres** › **Expédition et livraison** › zone France :

- « Livraison suivie » à 4,90 € (exemple) pour les commandes **de moins de 40 €** ;
- « Livraison offerte » à 0 € pour les commandes **de 40 € ou plus**.

Les packs Duo et Famille passent ainsi automatiquement en livraison gratuite.

## 4. Paiement et pages légales

- **Paramètres** › **Paiements** : active Shopify Payments (carte, Apple Pay, Google Pay).
- **Paramètres** › **Politiques** : génère les CGV et la politique de remboursement. Elles s'affichent toutes seules dans le pied de page.
- Page contact : **Boutique en ligne** › **Pages** › **Ajouter** « Contact » › Modèle « page.contact ».

## 5. Commandes AliExpress

Installe **DSers** (appli officielle AliExpress) et associe chaque variante au produit fournisseur. Pour les packs, utilise la fonction « Bundle » : Duo ×2 = 2 unités, Famille ×3 = 3 unités.

## À modifier dans « Personnaliser »

- **Textes** : tous les textes de la page sont modifiables dans l'éditeur.
- **Photos** : section Hero › « Photo ».
- **Avis** : ce sont des exemples. Remplace-les par de vrais avis, puis décoche « Avis d'exemple ».
- **FAQ** : complète le délai de livraison.
- **Contact** : e-mail et téléphone dans Paramètres du thème › Contact.
- **Bandeau du haut** : section En-tête.
- **Offre de lancement** : Paramètres du thème › Offre limitée. Le compte à rebours vise la date de fin choisie (19/10 par défaut) et l'offre disparaît toute seule après. À la fin de l'offre, remonte le prix des packs ou lance une nouvelle offre avec une nouvelle date : ne la prolonge pas en boucle, c'est interdit en France (pratique commerciale trompeuse).
- **« Le plus populaire »** : badge du pack Duo (section Packs). Garde-le seulement s'il reste vrai d'après tes ventes.

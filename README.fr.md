## Traduction du fichier README

**Langues :**[Anglais](README.md)\|[Chinois simplifié](README.zh-CN.md)\|[Chinois traditionnel](README.zh-TW.md)\|[hindi](README.hi.md)\|[arabe](README.ar.md)\|[Française](README.fr.md)\|[Espagnol](README.es.md)\|[Allemand](README.de.md)\|[japonais](README.ja.md)\|[portugais](README.pt.md)\|[russe](README.ru.md)\|[italien](README.it.md)\|[coréen](README.ko.md)\|[turc](README.tr.md)\|[Néerlandais](README.nl.md)\|[thaïlandais](README.th.md)\|[vietnamien](README.vi.md)\|[polonais](README.pl.md)\|[Українська](README.uk.md)\|[grec](README.el.md)

# Bot de télégramme de bouclier de groupe

La fonction principale du Group Shield Telegram Bot est de vérifier les nouveaux membres. Les utilisateurs doivent réussir le processus de vérification avant de pouvoir envoyer des messages dans le groupe.

Supports multilingual settings and dynamic adaptation to the user’s language.

## Caractéristiques

-   /muet {minutes}
    Vous pouvez utiliser la commande /mute pour empêcher quelqu'un d'envoyer des messages. Avant de l’utiliser, répondez au message de la personne. Par défaut, la sourdine est permanente, mais vous pouvez ajouter la durée en minutes après la commande. Par exemple, ajouter « 1 » les coupe pendant 1 minute.
-   /unmute Pour réactiver le son d'un membre du groupe et lui permettre d'envoyer à nouveau des messages, répondez à son message avant d'utiliser la commande.
-   /coup de pied {minutes} 
    Vous pouvez utiliser la commande /kickout pour supprimer quelqu'un du groupe. Répondez au message de la personne avant d’utiliser la commande. Par défaut, la suppression est permanente, mais vous pouvez ajouter la durée en minutes après la commande. Par exemple, ajouter « 1 » signifie qu’ils peuvent rejoindre après 1 minute.

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## Guide de déploiement

### Étape 1 : Créez votre robot Telegram

1.  Aller à**@BotPère**sur Telegram et utilisez le`/newbot`commande pour créer votre bot.
2.  Suivez les invites pour fournir les informations requises.
3.  Une fois créé,**@BotPère**vous enverra le jeton du bot. Ce jeton est essentiel au déploiement : conservez-le pour une utilisation ultérieure.

### Étape 2 : Déployer le bot sur le serveur

Vous devez copier le fichier docker-compose.yml du répertoire source vers le répertoire de votre serveur. Ensuite, configurez les valeurs de BOT_TOKEN et BOT_USERNAME dans le fichier docker-compose.yml.

-   BOT_TOKEN – This is the bot’s token.
-   BOT_USERNAME – This is the bot’s username without the “@” symbol.

Une fois rempli, vous êtes prêt à partir.

-   VERIFICATION_EXPIRATION_SECONDS – La valeur par défaut est 120 secondes. Cela signifie que les utilisateurs disposent de 120 secondes pour terminer le processus de vérification lorsqu'ils rejoignent le groupe. S'ils échouent, ils seront supprimés.
-   RE_JOIN_SECONDS – La valeur par défaut est 120 secondes. Après avoir été supprimés, les utilisateurs peuvent rejoindre le groupe après 120 secondes.
-   LANGUAGE_CODE – La valeur par défaut est « en ».["in", "zh", "es", "of", "nl", "it", "ar", "pt", "ko", "ru", "fr", "id", "ms ", "fa", "uk", "vi", "tr", "ja"]
-   ADMIN_CHAT_ID - Entrez votre identifiant de discussion. Après être entré, le robot vous avertira une fois qu'il aura démarré.
-   ENFORCE_PRIMARY_LANGUAGE - La valeur par défaut est false, « false » signifie que le système basculera dynamiquement en fonction du code de langue de l'utilisateur. Le définir sur « vrai » signifie que toutes les configurations suivront la langue principale que vous avez définie.
-   UPDATE_NOTIFICATION_URL - Vous pouvez définir une URL de notification et le bot enverra des messages de mise à jour via POST à ​​votre application serveur. Si elle est laissée vide, cette fonctionnalité sera désactivée par défaut.
-   UPDATE_NOTIFICATION_AUTHORIZATION - Vous pouvez définir un en-tête d'autorisation pour l'authentification des notifications. Si elle est laissée vide, cette fonctionnalité est désactivée par défaut.

### Étape 3 : démarrez le robot

Après avoir tout configuré, démarrez le bot en exécutant la commande suivante :

```bash
docker compose up -d
```

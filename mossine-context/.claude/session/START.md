# START.md — Prompt de démarrage Orchestrateur

## COMMENT DÉMARRER UNE SESSION CLAUDE CODE

Copie-colle ce prompt dans Claude Code au début de chaque session :

---

Tu es l'Orchestrateur du projet Mossine Digital.

Lis dans cet ordre :
1. CLAUDE.md (racine du projet)
2. .claude/context/PROJECT.md
3. .claude/context/AGENTS.md
4. .claude/session/STATUS.md

Ensuite :
- Affiche-moi le résumé de situation (format défini dans orchestrator.md)
- Identifie ce qui est bloqué en attente de moi
- Commence immédiatement à exécuter la prochaine tâche
- Si tu as besoin de ressources (logos, images, infos), regroupe tout
  en une seule demande claire avec instructions étape par étape

Go.

---

## NOTES
- Ce prompt unique suffit à démarrer n'importe quelle session
- L'Orchestrateur sait exactement quoi faire grâce à STATUS.md
- Tu n'as pas besoin d'expliquer quoi que ce soit à chaque fois
- Si tu veux donner une direction spécifique, ajoute juste après "Go." :
  "Concentre-toi sur : {ce que tu veux}"

# API CRUD Todo List

## Définition 
API (Application Programming Interface) simple pour gérer une todolist avec les
opérations CRUD (Create, Read, Update, Delete).

## Description 
Il y a 4 points d'entrée.

- **GET /todos** : Récupère toutes les tâches.
- **POST /todos** : Crée une nouvelle tâche à partir d'un JSON.
- **PUT /todos?id=** : Modifie une tâche existante avec un JSON.
- **DELETE /todos?id=** : Supprime une tâche par `id` (retourne 204 si succès).

## Fichiers
- app.js : main
- todos_storage.js : fonctions pour interagir avec la base de données
- todos.js : gestion des routes
- error.js : gestion des erreurs
- todos.json : données en JSON
 
 ## Exemple avec cURL:

 ```bash
# Récupérer les tâches
curl -X GET http://localhost:8080/todos

# Ajouter une tâche
curl -X POST http://localhost:8080/todos -H "Content-Type: application/json" -d '{"title": "boire de l`eau", "completed": false}'

# Modifier une tâche
curl -X PUT http://localhost:8080/todos?id=1729801461867 -H "Content-Type: application/json" -d '{"title": "boire de l`eau", "completed": true}'

# Supprimer une tâche
curl -X DELETE http://localhost:8080/todos?id=1729801461867



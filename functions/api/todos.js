import { json } from "stream/consumers"
import { createTodo, findTodos, removeTodo, UpdateTodo } from "../todos_storage.js"


// fichier pour gérer les routes de l'api et les requêtes

export async function index (req, res) {
    return findTodos()
}

export async function create (req, res) {
    return createTodo(await json(req))
}

export async function remove (req,res, url){
    const id = parseInt(url.searchParams.get('id'),10)
    await removeTodo(id)
    res.writeHead(204)
}

export async function update (req,res, url){
    const id = parseInt(url.searchParams.get('id'),10)
    return UpdateTodo(id, await json(req))
}
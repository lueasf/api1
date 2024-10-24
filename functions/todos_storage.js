import { readFile, writeFile } from "node:fs/promises"
import { NotFoundError } from "./errors.js"

// fichier pour interagir avec le fichier todos.json

const path = 'storage/todos.json'

/** Nouveau type
 * @typedef {object} Todo
 * @property {number} id 
 * @property {string} title
 * @property {boolean} completed
 */


/** Renvoie un tab de Todo
 * @return {Promise<Todo[]}
 */
export async function findTodos () {
    const data = await readFile(path, 'utf8')
    return JSON.parse(data)
}


/** Sauvegarde un nouveau todo
 * @param {string} title
 * @param {boolean} completed
 * @return {Promise<Todo>}
*/
export async function createTodo ({title, completed = false}) {
    const todo = {title, completed, id: Date.now()}
    const todos = [todo, ...await findTodos()]
    await writeFile(path, JSON.stringify(todos, null, 2))  // ici on enregistre le nouveau todo dans le fichier
    return todo
}


/** Supprime un todo
 * @param {boolean} id 
 * @return {Promise<>} // promise vide
*/
export async function removeTodo (id) {
    const todos = await findTodos() 
    const todo = todos.findIndex(todo => todo.id === id)
    if (todo === -1){
        throw new NotFoundError()
    }
    await writeFile(path,JSON.stringify(todos.filter(todo => todo.id !== id), null, 2))
}

/** Met à jour un todo
 * @param {number} id
 * @param {completed?: boolean, title?: string} partialTodo
 * @return {Promise<Todo>} // promise vide
*/
export async function UpdateTodo (id, partialTodo) {
    const todos = await findTodos()
    const todo = todos.find(todo => todo.id === id)
    if (todo === undefined){
        throw new NotFoundError()
    }
    Object.assign(todo, partialTodo)
    await writeFile(path, JSON.stringify(todos, null, 2 )) // 2 pour avoir 2 espaces
    return todo
}
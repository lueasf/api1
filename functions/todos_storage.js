import { readFile, writeFile } from "node:fs/promises"

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


/** sauvegarde un nouveau todo
 * @param {string} title
 * @param {boolean} completed
 * @return {Promise<Todo>}
*/

export async function createTodo ({title, completed = false}) {
    const todo = {title, completed, id: Date.now()}
    const todos = [todo, ...await findTodos()]
    await writeFile(path, JSON.stringify(todos))  // ici on enregistre le nouveau todo dans le fichier
    return todo
}
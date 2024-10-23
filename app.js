import {createServer} from "node:http"
import {findTodos, createTodo} from "./functions/todos_storage.js"
import { json } from "stream/consumers"

createServer(async (req,res) => {
    res.setHeader('Content-Type', 'application/json')
    const url = new URL(req.url, `http://${req.headers.host}`)

    if (url.pathname === '/todos') {

        if (req.method === 'GET'){
            const todos = await findTodos()
            res.write(JSON.stringify(todos))
        } else if (req.method === 'POST'){
            const todo = await createTodo(await json(req))
            res.write(JSON.stringify(todo))
        }

    } else{
        res.writeHead('404')
    }
    res.end()
}).listen(8080)
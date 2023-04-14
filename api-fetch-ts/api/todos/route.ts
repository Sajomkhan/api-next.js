import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos"

const API_KEY: string = process.env.DATA_API_KEY as string

export async function GET() {
    const res = await fetch(DATA_SOURCE_URL)
    const todos: Todo[] = await res.json()
    return NextResponse.json(todos)
}

export async function DELETE(req: Request) {
    const {id}: Partial<Todo> = await req.json()
    if(!id) return NextResponse.json({"message":"Todo id required"})

    await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'API-Key': API_KEY
        }
    })
    return NextResponse.json({"message": `Todo ${id} deleted`})
}

export async function POST(req: Request) {
    const {userId, title}: Partial<Todo> = await req.json()
    if(!userId || !title) return NextResponse.json({"message":"Missing required data"})

    const res = await fetch(DATA_SOURCE_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'API-Key': API_KEY
        },
        body: JSON.stringify({
            userId, title, completed: false
        })
    })
    const newTodo: Todo = await res.json()
    return NextResponse.json(newTodo)
}

export async function PUT(req: Request) {
    const {userId, id, title, completed}: Partial<Todo> = await req.json()
    if(!userId || !id || !title || typeof(completed) !== 'boolean') return NextResponse.json({"message":"Missing required data"})

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'API-Key': API_KEY
        },
        body: JSON.stringify({
            userId, title, completed
        })
    })
    const updatedTodo: Todo = await res.json()
    return NextResponse.json(updatedTodo)
}
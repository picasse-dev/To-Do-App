const express = require('express')
const app = express()

// ---------- MIDDLEWARES ----------
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))

// ---------- DATA ----------
let tasks = [
  { id: '1', task: 'Salir a trotar', done: true },
  { id: '2', task: 'Meditar', done: false },
  { id: '3', task: 'Estudiar', done: true },
  { id: '4', task: 'Encontrar la forma de hacer mucho dinero', done: true },
  { id: '5', task: 'Respirar', done: true },
  { id: '6', task: 'Cuidar la espalda', done: true },
  { id: '7', task: 'Aprender algo nuevo', done: true }
]

// ---------- HELPERS ----------
const generateId = () => {
  const maxId = tasks.length > 0
    ? Math.max(...tasks.map(t => Number(t.id)))
    : 0
  return String(maxId + 1)
}

const isPlainObject = (value) =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const findDuplicateTask = (text) =>
  tasks.find(t => t.task.toLowerCase() === text.toLowerCase())

/**
 * Valida el body recibido.
 * - POST:  task obligatorio, done opcional (por defecto false)
 * - PUT:   task y done obligatorios (reemplaza el recurso completo)
 * - PATCH: al menos uno de los dos (actualización parcial)
 * Devuelve { errors, data }. Solo se copian los campos conocidos (task, done).
 */
const validateTaskBody = (body, mode) => {
  const errors = []
  const data = {}

  if (!isPlainObject(body)) {
    return { errors: ['Request body must be a JSON object'], data }
  }

  const hasTask = body.task !== undefined
  const hasDone = body.done !== undefined

  // task
  if (hasTask) {
    if (typeof body.task !== 'string' || body.task.trim() === '') {
      errors.push('"task" must be a non-empty string')
    } else {
      data.task = body.task.trim()
    }
  } else if (mode === 'POST' || mode === 'PUT') {
    errors.push('"task" is required')
  }

  // done
  if (hasDone) {
    if (typeof body.done !== 'boolean') {
      errors.push('"done" must be a boolean')
    } else {
      data.done = body.done
    }
  } else if (mode === 'PUT') {
    errors.push('"done" is required')
  } else if (mode === 'POST') {
    data.done = false
  }

  if (mode === 'PATCH' && !hasTask && !hasDone) {
    errors.push('At least one of "task" or "done" must be provided')
  }

  return { errors, data }
}

const sendValidationError = (response, errors) =>
  response.status(400).json({ error: 'Validation failed', details: errors })

const sendNotFound = (response) =>
  response.status(404).json({ error: 'Task not found' })

// ---------- ROUTES ----------
// GET all -> 200
app.get('/api/tasks', (request, response) => {
  response.status(200).json(tasks)
})

// GET one -> 200 | 404
app.get('/api/tasks/:id', (request, response) => {
  const task = tasks.find(t => t.id === request.params.id)
  if (!task) return sendNotFound(response)

  response.status(200).json(task)
})

// POST -> 201 | 400 | 409
app.post('/api/tasks', (request, response) => {
  const { errors, data } = validateTaskBody(request.body, 'POST')
  if (errors.length > 0) return sendValidationError(response, errors)

  const duplicate = findDuplicateTask(data.task)
  if (duplicate) {
    return response
      .status(409)
      .json({ error: 'Task already exists', existingId: duplicate.id })
  }

  const newTask = { id: generateId(), ...data }
  tasks = tasks.concat(newTask)

  response
    .status(201)
    .location(`/api/tasks/${newTask.id}`)
    .json(newTask)
})

// PUT (reemplazo completo) -> 200 | 400 | 404
app.put('/api/tasks/:id', (request, response) => {
  const id = request.params.id
  if (!tasks.some(t => t.id === id)) return sendNotFound(response)

  const { errors, data } = validateTaskBody(request.body, 'PUT')
  if (errors.length > 0) return sendValidationError(response, errors)

  const updatedTask = { id, ...data }
  tasks = tasks.map(t => (t.id === id ? updatedTask : t))

  response.status(200).json(updatedTask)
})

// PATCH (actualización parcial) -> 200 | 400 | 404
app.patch('/api/tasks/:id', (request, response) => {
  const id = request.params.id
  const existingTask = tasks.find(t => t.id === id)
  if (!existingTask) return sendNotFound(response)

  const { errors, data } = validateTaskBody(request.body, 'PATCH')
  if (errors.length > 0) return sendValidationError(response, errors)

  const updatedTask = { ...existingTask, ...data }
  tasks = tasks.map(t => (t.id === id ? updatedTask : t))

  response.status(200).json(updatedTask)
})

// DELETE -> 204 | 404
app.delete('/api/tasks/:id', (request, response) => {
  const id = request.params.id
  if (!tasks.some(t => t.id === id)) return sendNotFound(response)

  tasks = tasks.filter(t => t.id !== id)
  response.status(204).end()
})

// ---------- ERROR HANDLING ----------
const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'Unknown endpoint' })
}

// Debe ir después de las rutas y de unknownEndpoint, con 4 parámetros
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  // JSON mal formado enviado por el cliente
  if (error.type === 'entity.parse.failed') {
    return response.status(400).json({ error: 'Malformed JSON' })
  }

  // Cualquier otro error inesperado
  response.status(500).json({ error: 'Internal server error' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

// ---------- SERVER ----------
const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})






























/*
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
morgan.token('body', (req) => {return req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH'? JSON.stringify(req.body): ''})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let activities = [
  {
    id: "1",
    task: "React",
    done: true
  },
  {
    id: "2",
    task: "Exercise",
    done: false
  },
  {
    id: "3",
    task: "Food",
    done: true
  },
  {
    id: "4",
    task: "Sleep",
    done: true
  }
]

app.get('/',(request, response) => {response.send('<h1>Hello world in /</h1>')})

app.get('/api',(request, response) => {response.send('<h1>Hello world in /api</h1>')})

app.get('/api/activities',(request, response) => {response.json(activities)})

app.post('/api/activities/',(request, response) =>{

  const body = request.body

  if (
    (body.task !== undefined &&
      (typeof body.task !== 'string' || !body.task.trim())) ||
    (body.done !== undefined &&
      (typeof body.done !== 'boolean'))
  ) {
    return response.status(400).json({
      error: 'invalid task or done attributes'
    })
  }

  const newActivity = {
    id: Math.floor(Math.random()*1e10).toString(),
    task: body.task.toString(),
    done: body.done || false
  }
  activities = [...activities, newActivity]

  response.status(201).json(newActivity)
})

app.put('/api/activities/:id',(request, response) => {
  const body = request.body
  const updatedActivity = {
    id:body.id.toString(),
    task:body.task.toString(),
    done:body.done.toString() || false
  }
  
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknowwwwn endpoint' })
}

app.use(unknownEndpoint)


const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
/**/
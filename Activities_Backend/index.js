const express = require('express')
const app = express()

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
  }
]

app.get('/',(request, response) => {response.send('<h1>Hello world</h1>')})
app.get('/api/activities',(request, response) => {response.json(activities)})
app.post('/api/activities/',(request, response) =>{
  const body = request.body
  const newActivity = {
    id:Math.floor(Math.random()*1e10).toString(),
    task:body.task.toString(),
    done:body.done.toString() || false
  }
  activities = [...activities, newActivity]

  response.json(newActivity)
})
app.put('/api/activities/:id',(request, response) => {
  const body = request.body
  const updatedActivity = {
    id:body.id.toString(),
    task:body.task.toString(),
    done:body.done.toString() || false
  }
  
})

const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

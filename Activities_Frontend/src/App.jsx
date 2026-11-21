import { useState, useEffect } from 'react'
import activitiesService from './services/activities'
import TaskCreator from './components/TaskCreator'
import ActivityTable from './components/ActivityTable'

const App = () => {
  const [activities, setActivities] = useState([])
  const [newTask, setNewTask] = useState('')
  const [editingActivityId, setEditingActivityId] = useState(null)
  const [editedTask, setEditedTask] = useState('')

  useEffect(() => {
    activitiesService
      .getAll()
      .then(initialActivities => 
        setActivities(initialActivities))
      .catch(error => (console.log("Error recibiendo la data"))
      )
  }, [])

  const handleNewTaskChange = (event) => { setNewTask(event.target.value) }
  const handleEditedTaskChange = (event) => { setEditedTask(event.target.value) }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!newTask.trim()) return

    const newActivity = {
      task: newTask,
      done: false
    }

    activitiesService
      .create(newActivity)
      .then(returnedActivity => {
        setActivities(prev => [...prev, returnedActivity])
        setNewTask('')
      })
  }

  const toggleActivityDone = (id) => {
    const activity = activities.find(activity => activity.id === id)

    if (!activity) return

    const updatedActivity = {
      ...activity,
      done: !activity.done
    }

    activitiesService
      .updatePut(id, updatedActivity)
      .then(returnedActivity => {
        setActivities(prev =>
          prev.map(activity =>
            activity.id === id ? returnedActivity : activity
          )
        )
      })
  }

  const handleDeleteActivity = (id) => {
    activitiesService
      .remove(id)
      .then(() => {
        setActivities(prev =>
          prev.filter(activity => activity.id !== id)
        )
      })
  }

  const handleEditActivity = (id) => {
    const activityToEdit = activities.find(activity => activity.id === id)

    if (!activityToEdit) return

    setEditingActivityId(id)
    setEditedTask(activityToEdit.task)
  }

  const handleSaveActivity = (id) => {
    const updatedActivityProperty = {task: editedTask}

    activitiesService
      .updatePatch(id, updatedActivityProperty)
      .then(returnedActivity => {
        setActivities(prev =>
          prev.map(activity =>
            activity.id === id ? returnedActivity : activity
          )
        )

        setEditedTask('')
        setEditingActivityId(null)
      })
  }

  const handleCancelEdit = () => {
    setEditingActivityId(null)
    setEditedTask('')
  }

  return (
    <>
      <h1>To Do</h1>

      <TaskCreator 
        handleSubmit = {handleSubmit} 
        newTask = {newTask} 
        handleNewTaskChange = {handleNewTaskChange} 
      />

      <br />

      <ActivityTable
        activities = {activities}
        editingActivityId = {editingActivityId}
        editedTask = {editedTask}
        handleEditedTaskChange = {handleEditedTaskChange}
        toggleActivityDone = {toggleActivityDone}
        handleSaveActivity = {handleSaveActivity}
        handleCancelEdit = {handleCancelEdit}
        handleDeleteActivity = {handleDeleteActivity}
        handleEditActivity = {handleEditActivity}
      />
    </>
  )
}
export default App
/*
Cuando pueda hacer todo esto sin ver la docu:
  Crear la app de react
  Implementar funcionalidades (Renderizado condicional, find, filter, map, includes, some)
  Implementar comunicacion con backend
  Extraer la comunicacion con el backend en un modulo separado
  Manejo de errores
  Modularizar
  Inline Styles
  Notificacion de error
  Notificacion de acciones
  Conectar con backend (hacer todo el backend)
  Desplegar
  DB

*/
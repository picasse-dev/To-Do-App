const TaskCreator = ({ handleSubmit, newTask, handleNewTaskChange }) => {
  return(
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTask}
        onChange={handleNewTaskChange}
      />
      <button type="submit">Add</button>
    </form>
  )
}
export default TaskCreator
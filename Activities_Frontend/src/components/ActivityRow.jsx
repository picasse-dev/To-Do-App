const ActivityRow = ({ 
  activity,
  isEditing,
  editedTask,
  handleEditedTaskChange,
  toggleActivityDone,
  handleSaveActivity,
  handleCancelEdit,
  handleDeleteActivity,
  handleEditActivity
}) => {
  return isEditing
    ? 
      <tr>
        <td><input type="text" value={editedTask} onChange={handleEditedTaskChange}/></td>
        <td><input type="checkbox" checked={activity.done} onChange={() => toggleActivityDone(activity.id)}/></td>
        <td><button type="button" onClick={() => handleSaveActivity(activity.id)}>Save</button></td>
        <td><button type="button" onClick={handleCancelEdit}>Cancel</button></td>
      </tr>
    : 
      <tr>
        <td>{activity.task}</td>
        <td><input type="checkbox" checked={activity.done} onChange={() => toggleActivityDone(activity.id)}/> </td>
        <td><button type="button" onClick={() => handleDeleteActivity(activity.id)}>Delete</button></td>
        <td><button type="button" onClick={() => handleEditActivity(activity.id)}>Edit</button></td>
      </tr>
}
export default ActivityRow
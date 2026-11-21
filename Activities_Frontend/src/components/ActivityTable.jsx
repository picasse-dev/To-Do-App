import ActivityRow from './ActivityRow'

const ActivityTable = ({
  activities,

  editingActivityId,
  editedTask,
  handleEditedTaskChange,
  toggleActivityDone,
  handleSaveActivity,
  handleCancelEdit,
  handleDeleteActivity,
  handleEditActivity
}) => {
  return(
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Done</th>
        </tr>
      </thead>

      <tbody>
        {activities.map(activity => (
          <ActivityRow
            key={activity.id}
            activity = {activity}
            isEditing={activity.id === editingActivityId}
            editedTask = {editedTask}
            handleEditedTaskChange = {handleEditedTaskChange}
            toggleActivityDone = {toggleActivityDone}
            handleSaveActivity = {handleSaveActivity}
            handleCancelEdit = {handleCancelEdit}
            handleDeleteActivity = {handleDeleteActivity}
            handleEditActivity = {handleEditActivity}
          />
        ))}
      </tbody>
    </table>
  )
}
export default ActivityTable
import { useContext } from "react";
import { ActionsContext } from "../contexts/ActionsContext";

function Action({ action }) {
  const { deleteAction, updateAction } = useContext(ActionsContext);

  const handleToggleCompleted = () => {
    const updatedFields = {
      ...action.fields,
      completed: !action.fields.completed,
    };
    const updatedAction = { id: action.id, fields: updatedFields };
    updateAction(updatedAction);
  };

  return (
    <div>
      <li className="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-2">
        <input
          type="checkbox"
          name="completed"
          id="completed"
          checked={action.fields.completed}
          className="mr-2 form-checkbox h-5 w-5"
          onChange={handleToggleCompleted}
        />
        <p
          className={`flex-1 text-gray-800 ${
            action.fields.completed ? "line-through" : ""
          }`}
        >
          {action.fields.description}
        </p>
        <button
          type="button"
          className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
          onClick={() => deleteAction(action.id)}
        >
          Delete
        </button>
      </li>
    </div>
  );
}

export default Action;

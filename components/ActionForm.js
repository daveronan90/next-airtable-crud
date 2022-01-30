import { useContext, useState } from "react";
import { ActionsContext } from "../contexts/ActionsContext";

function ActionForm() {
  const [action, setAction] = useState("");
  const { addAction } = useContext(ActionsContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    addAction(action);

    setAction("");
  };

  return (
    <form className="form my-6" onSubmit={handleSubmit}>
      <div className="flex flex-col text-sm mb-2">
        <label className="font-bold mb-2 text-gray-800" htmlFor="action">
          New Action
        </label>
        <input
          type="text"
          name="action"
          id="action"
          placeholder="ex. Complete a new quote"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="border-gray-200 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
        />
        <button
          className="self-start rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ActionForm;

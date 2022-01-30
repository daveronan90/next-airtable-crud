import { createContext, useState } from "react";

const ActionsContext = createContext();

const ActionsProvider = ({ children }) => {
  const [actions, setActions] = useState([]);

  const refreshActions = async () => {
    try {
      const res = await fetch("/api/getActions");
      const latestActions = await res.json();
      setActions(latestActions);
    } catch (error) {
      console.error(error);
    }
  };

  const addAction = async (description) => {
    try {
      const res = await fetch("/api/createAction", {
        method: "POST",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newAction = await res.json();

      setActions((prevActions) => [newAction, ...prevActions]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateAction = async (updatedAction) => {
    try {
      const res = await fetch("/api/updateAction", {
        method: "PUT",
        body: JSON.stringify(updatedAction),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();

      setActions((prevActions) => {
        const existingActions = [...prevActions];
        const actionIndex = existingActions.findIndex(
          (action) => action.id === updatedAction.id
        );
        existingActions[actionIndex] = updatedAction;
        return existingActions;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAction = async (id) => {
    try {
      await fetch("/api/deleteAction", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "content-type": "application/json",
        },
      });
      setActions((prevActions) => {
        return prevActions.filter((action) => action.id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ActionsContext.Provider
      value={{
        actions,
        setActions,
        refreshActions,
        updateAction,
        deleteAction,
        addAction,
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
};

export { ActionsProvider, ActionsContext };

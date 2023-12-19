import React, { useContext, useState } from "react";
import DataContext from "./context/DataContext";

const EditClient = ({ name, id, setIsEditModalOpen }) => {
  const { api, setStatus, setFetchError, fetchData, projects, logItems } =
    useContext(DataContext);

  const [updatedClientName, setUpdatedClientName] = useState(name);

  const cancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleNameUpdate = (event) => {
    setUpdatedClientName(event.target.value);
  };

  async function handleClientUpdate(e) {
    e.preventDefault();

    try {
      await updateClient(updatedClientName);
      await updateClientInLog(name, updatedClientName, logItems);
      await updateClientInProjects(name, updatedClientName, projects);
      setIsEditModalOpen(false);
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  function updateClientInLog(name, updatedClientName, logItems) {
    // Check if any entries match the current client name
    const entriesToUpdate = logItems.filter((entry) => entry.client === name);

    if (entriesToUpdate.length) {
      // Update each matching entry individually and collect promises
      const updatePromises = entriesToUpdate.map((entry) =>
        api(`/log/${entry.id}`, "PATCH", {
          client: updatedClientName,
        })
      );

      // Wait for all updates to finish before processing further
      Promise.all(updatePromises)
        .then(() => console.log("All cients updated in log successfully!"))
        .catch((error) =>
          console.error("Error updating clients in log:", error)
        );
    } else {
      console.warn(`Client "${name}" not found in the log`);
    }
  }

  function updateClientInProjects(name, updatedClientName, projects) {
    // Check if any entries match the current client name
    const entriesToUpdate = projects.filter((entry) => entry.client === name);

    if (entriesToUpdate.length) {
      // Update each matching entry individually and collect promises
      const updatePromises = entriesToUpdate.map((entry) =>
        api(`/projects/${entry.id}`, "PATCH", {
          client: updatedClientName,
        })
      );

      // Wait for all updates to finish before processing further
      Promise.all(updatePromises)
        .then(() => console.log("All cients updated in projects successfully!"))
        .catch((error) =>
          console.error("Error updating clients in projects:", error)
        );
    } else {
      console.warn(`Client "${name}" not found in projects`);
    }
  }

  const updateClient = async (updatedClientName) => {
    const result = api(`/clients/${id}`, "PUT", {
      name: updatedClientName,
    });
    if (result) setFetchError(result);
    setStatus("Client updated");
  };

  return (
    <tr>
      <td colSpan="3" className="updateDetailsTd">
        <h2>
          Edit name for above client{" "}
          <span className="material-symbols-outlined">arrow_upward</span>
        </h2>
        <form className="editForm" onSubmit={handleClientUpdate}>
          <label htmlFor="clientName">Client Name: </label>
          <input
            type="text"
            id="cientName"
            name="cientName"
            defaultValue={name}
            onChange={handleNameUpdate}
          />
          <br />
          <button type="submit" id="updateClientButton" className="mainButton">
            Update Client
          </button>
        </form>
        <button className="cancelButton" onClick={cancelEdit}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditClient;

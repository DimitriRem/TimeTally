import React, { useEffect, useState, useContext } from "react";
import DataContext from "./context/DataContext";

const AddNewClient = () => {
  const [addClientName, setAddClientName] = useState("");
  const [newClientDetails, setNewClientDetails] = useState("");
  const {
    clients,
    currentNav,
    setClients,
    setStatus,
    setFetchError,
    addNewClientClose,
    setAddNewClientIsVisible,
    api,
    fetchData,
  } = useContext(DataContext);

  const handleNameChange = (event) => {
    setAddClientName(event.target.value);
  };

  const hideCancel = currentNav === "clients";

  const handleAddClient = (e) => {
    e.preventDefault();
    addClient(addClientName);
  };

  const addClient = async () => {
    const listClients = [...clients, newClientDetails];
    setClients(listClients);
    setAddNewClientIsVisible(false);
    const result = await api("/clients", "POST", newClientDetails);
    setStatus("New client added.");
    if (result) setFetchError(result);
    fetchData();
  };

  useEffect(() => {
    setNewClientDetails({ name: addClientName });
  }, [addClientName]);

  return (
    <div id="addClientContainer" className="entryContainer">
      <div className="entryHeader">
        <span>Add a Client</span>
      </div>
      <form onSubmit={handleAddClient} id="addClientForm">
        <label htmlFor="addClientName">Client Name:</label>
        <input
          type="text"
          id="addClientName"
          name="addClientName"
          value={addClientName}
          onChange={handleNameChange}
          placeholder="Enter client name"
          required
        />
        <button type="submit" id="addClientButton" className="mainButton">
          Add Client
        </button>
        <br />
        <button
          className="cancelButton"
          onClick={addNewClientClose}
          hidden={hideCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddNewClient;

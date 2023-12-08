import React, { useEffect, useState, useContext } from "react";
import DataContext from "./context/DataContext";

const AddNewClient = () => {
  const [addClientName, setAddClientName] = useState("");
  const [newClientDetails, setNewClientDetails] = useState("");
  const {
    clients,
    setClients,
    setStatus,
    setFetchError,
    addNewClientClose,
    setAddNewClientIsVisible,
    api,
  } = useContext(DataContext);

  const handleNameChange = (event) => {
    setAddClientName(event.target.value);
  };

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
  };

  useEffect(() => {
    setNewClientDetails({ name: addClientName });
  }, [addClientName]);

  return (
    <div id="blackout">
      <div id="addClientContainer" className="entryContainer">
        <div className="entryHeader">
          <span>Add a Client</span>
        </div>
        <form onSubmit={handleAddClient} id="addClientForm">
          <label htmlFor="ClientNameBox">Client Name:</label>
          <input
            type="text"
            id="addClientName"
            name="addClientName"
            value={addClientName}
            onChange={handleNameChange}
            placeholder="Enter client name"
          />
          <button type="submit" id="addClientButton" className="mainButton">
            Add Client
          </button>
          <br />
          <button className="cancelButton" onClick={addNewClientClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewClient;

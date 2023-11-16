import React, { useEffect, useState } from "react";

const AddNewClient = ({
  addClient,
  addNewClientClose,
  clients,
  newClientDetails,
  setNewClientDetails,
}) => {
  const [addClientName, setAddClientName] = useState("");

  const handleNameChange = (event) => {
    setAddClientName(event.target.value);
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    addClient(addClientName);
  };

  useEffect(() => {
    setNewClientDetails({
      name: addClientName,
    });
  }, [addClientName]);

  return (
    <div id="addClientContainer" className="entryContainer">
      <div className="entryHeader">
        <span>Add a Client</span>
        <button className="cancelButton" onClick={addNewClientClose}>
          Cancel
        </button>
      </div>
      <form onSubmit={handleAddClient} id="addClientForm">
        <label htmlFor="ClientNameBox">Client Name:</label>
        <input
          type="text"
          id="addClientName"
          name="addClientName"
          onChange={handleNameChange}
          placeholder="Enter client name"
        ></input>

        <button type="submit" id="addClientButton" className="mainButton">
          Add Client
        </button>
      </form>
    </div>
  );
};

export default AddNewClient;

import React, { useEffect, useState } from "react";

const AddNewClient = ({
  addClient,
  addNewClientClose,
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

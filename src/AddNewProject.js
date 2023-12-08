import React, { useEffect, useState, useContext } from "react";
import ClientOption from "./ClientOption";
import DataContext from "./context/DataContext";

const AddNewProject = () => {
  const {
    addNewProjectClose,
    clients,
    projects,
    addNewClientPop,
    setProjects,
    setAddNewProjectIsVisible,
    setFetchError,
    api,
    setStatus,
  } = useContext(DataContext);
  const [addProjectName, setAddProjectName] = useState("");
  const [currentClientIndex, setCurrentClientIndex] = useState("0");
  const [newProjectDetails, setNewProjectDetails] = useState({});

  const handleNameChange = (event) => {
    setAddProjectName(event.target.value);
  };

  const handleClientChange = (event) => {
    const selectedValue = Number(event.target.value);
    if (selectedValue === -2) {
      addNewClientPop();
    } else {
      const matchingClientIndex = clients.findIndex(
        (client) => client.id === selectedValue
      );

      setCurrentClientIndex(matchingClientIndex);
    }
  };

  useEffect(() => {
    setNewProjectDetails({
      name: addProjectName,
      client: clients[currentClientIndex].name,
    });
  }, [addProjectName, currentClientIndex]);

  const handleAddProject = (e) => {
    e.preventDefault();
    addProject(newProjectDetails);
  };

  const addProject = async () => {
    const listProjects = [...projects, newProjectDetails];
    setProjects(listProjects);
    setAddNewProjectIsVisible(false);
    const result = await api("/projects", "POST", newProjectDetails);
    setStatus("new project added.");
    if (result) setFetchError(result);
  };

  return (
    <div id="blackout">
      <div id="addProjectContainer" className="entryContainer">
        <div className="entryHeader">
          <span>Add a Project</span>
        </div>
        <form onSubmit={handleAddProject} id="addProjectForm">
          <label htmlFor="projectNameBox">Project Name:</label>
          <input
            type="text"
            id="addProjectName"
            name="addProjectName"
            onChange={handleNameChange}
            placeholder="Enter project name"
          ></input>
          <br />
          <label htmlFor="clientList">Client:</label>
          <select
            id="clientList"
            name="clientList"
            onChange={handleClientChange}
          >
            <option value="null">Select Client</option>
            <option value="-2" className="utility">
              + Add a new Client
            </option>
            {clients.map((client) => (
              <ClientOption key={client.id} id={client.id} name={client.name} />
            ))}
          </select>

          <button type="submit" id="addProjectButton" className="mainButton">
            Add Project
          </button>
          <br />
          <button className="cancelButton" onClick={addNewProjectClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewProject;

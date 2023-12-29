import React, { useEffect, useState, useContext } from "react";
import ClientOption from "./ClientOption";
import DataContext from "./context/DataContext";

const AddNewProject = () => {
  const {
    addNewProjectClose,
    clients,
    currentNav,
    projects,
    addNewClientPop,
    setProjects,
    setAddNewProjectIsVisible,
    setFetchError,
    api,
    setStatus,
    fetchData,
  } = useContext(DataContext);
  const [addProjectName, setAddProjectName] = useState("");
  const [clientSelected, setClientSelected] = useState(false);
  const [currentClientIndex, setCurrentClientIndex] = useState("0");
  const [newProjectDetails, setNewProjectDetails] = useState({});

  const handleNameChange = (event) => {
    setAddProjectName(event.target.value);
  };

  const hideCancel = currentNav === "projects";

  const handleClientChange = (event) => {
    setClientSelected(true);
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
    if (!clientSelected) {
      setStatus("No Client Selected!");
      return;
    }
    addProject(newProjectDetails);
  };

  const addProject = async () => {
    const listProjects = [...projects, newProjectDetails];
    setProjects(listProjects);
    setAddNewProjectIsVisible(false);
    const result = await api("/projects", "POST", newProjectDetails);
    setStatus("new project added.");
    if (result) setFetchError(result);
    await fetchData();
  };

  return (
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
          required
        ></input>
        <br />
        <label htmlFor="clientList">Client:</label>
        <select
          id="clientList"
          name="clientList"
          onChange={handleClientChange}
          required
        >
          <option value="-1">Select Client</option>
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
        <button
          className="cancelButton"
          onClick={addNewProjectClose}
          hidden={hideCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddNewProject;

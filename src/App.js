import React, { useState, useEffect } from "react";
import Header from "./Header";
import TimeEntry from "./TimeEntry";
import AddNewProject from "./AddNewProject";
import AddNewClient from "./AddNewClient";
import AddNewRate from "./AddNewRate";
import LogTable from "./LogTable";
import apiRequest from "./apiRequest";

const API_URL = "http://localhost:3500/";

function App() {
  const currentDate = new Date();
  const dateOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-UK", dateOptions);

  const [items, setItems] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [rates, setRates] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newProjectDetails, setNewProjectDetails] = useState("");
  const [newClientDetails, setNewClientDetails] = useState("");
  const [newRateDetails, setNewRateDetails] = useState("");
  const [addNewProjectIsVisible, setAddNewProjectIsVisible] = useState(false);
  const [addNewClientIsVisible, setAddNewClientIsVisible] = useState(false);
  const [addNewRateIsVisible, setAddNewRateIsVisible] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          itemsResponse,
          clientsResponse,
          projectsResponse,
          ratesResponse,
        ] = await Promise.all([
          fetch(API_URL + "log/"),
          fetch(API_URL + "clients/"),
          fetch(API_URL + "projects/"),
          fetch(API_URL + "rates/"),
        ]);

        if (!itemsResponse.ok) throw Error("did not receive expected data");
        const itemsData = await itemsResponse.json();
        setItems(itemsData);

        if (!clientsResponse.ok)
          throw Error("did not receive expected data(clients)");
        const clientsData = await clientsResponse.json();
        setClients(clientsData);

        if (!projectsResponse.ok)
          throw Error("did not receive expected data(projects)");
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);

        if (!ratesResponse.ok)
          throw Error("did not receive expected data(rates)");
        const ratesData = await ratesResponse.json();
        setRates(ratesData);

        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addItem = async (item) => {
    const listItems = [...items, newItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    };

    const result = await apiRequest(API_URL + "log/", postOptions);
    setStatus("Hours submitted");

    if (result) setFetchError(result);
  };

  useEffect(() => {
    let timeoutId;

    if (status !== "") {
      timeoutId = setTimeout(() => {
        setStatus("");
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [status]);

  const addProject = async (project) => {
    const listProjects = [...projects, newProjectDetails];
    setProjects(listProjects);
    setAddNewProjectIsVisible(false);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProjectDetails),
    };

    const result = await apiRequest(API_URL + "projects/", postOptions);
    setStatus("new project added.");
    if (result) setFetchError(result);
  };

  const addClient = async (client) => {
    const listClients = [...clients, newClientDetails];
    setClients(listClients);
    setAddNewClientIsVisible(false);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClientDetails),
    };

    const result = await apiRequest(API_URL + "clients/", postOptions);
    setStatus("New client added.");
    if (result) setFetchError(result);
  };

  const addRate = async (rate) => {
    const listRates = [...rates, newRateDetails];
    setRates(listRates);
    setAddNewRateIsVisible(false);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRateDetails),
    };

    const result = await apiRequest(API_URL + "rates/", postOptions);
    setStatus("New rate added.");
    if (result) setFetchError(result);
  };

  const handleSubmit = (newItem) => {
    if (!newItem) {
      return;
    }
    addItem(newItem);
    setNewItem("");
  };

  const addNewProjectPop = () => {
    setAddNewProjectIsVisible(true);
  };

  const addNewProjectClose = () => {
    setAddNewProjectIsVisible(false);
  };

  const addNewClientPop = () => {
    setAddNewClientIsVisible(true);
  };

  const addNewClientClose = () => {
    setAddNewClientIsVisible(false);
  };

  const addNewRatePop = () => {
    setAddNewRateIsVisible(true);
  };

  const addNewRateClose = () => {
    setAddNewRateIsVisible(false);
  };

  return (
    <>
      <Header date={formattedDate} />

      <div className={`status ${status !== "" ? "show" : ""}`}>{status}</div>

      <div id="desktopContainer">
        <div id="toolbox">
          {!fetchError && !isLoading && (
            <TimeEntry
              projects={projects}
              rates={rates}
              newItem={newItem}
              setNewItem={setNewItem}
              handleSubmit={handleSubmit}
              addNewProjectPop={addNewProjectPop}
              addNewRatePop={addNewRatePop}
            />
          )}
          {addNewProjectIsVisible && (
            <AddNewProject
              addProject={addProject}
              clients={clients}
              setClients={setClients}
              addNewProjectClose={addNewProjectClose}
              newProjectDetails={newProjectDetails}
              setNewProjectDetails={setNewProjectDetails}
              addNewClientPop={addNewClientPop}
            />
          )}
          {addNewClientIsVisible && (
            <AddNewClient
              addClient={addClient}
              clients={clients}
              setClients={setClients}
              addNewClientClose={addNewClientClose}
              newClientDetails={newClientDetails}
              setNewClientDetails={setNewClientDetails}
            />
          )}
          {addNewRateIsVisible && (
            <AddNewRate
              addRate={addRate}
              addNewRateClose={addNewRateClose}
              newRateDetails={newRateDetails}
              setNewRateDetails={setNewRateDetails}
            />
          )}
        </div>
        <div id="tableContainer">
          {isLoading && <p>Loading items...</p>}
          {fetchError && (
            <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>
          )}
          {!fetchError && !isLoading && (
            <LogTable
              items={items}
              API_URL={API_URL}
              rates={rates}
              projects={projects}
              addNewProjectPop={addNewProjectPop}
              addNewRatePop={addNewRatePop}
              setStatus={setStatus}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;

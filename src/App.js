import Header from "./Header";
import TimeEntry from "./TimeEntry";
import AddNewProject from "./AddNewProject";
import AddNewClient from "./AddNewClient";
import AddNewRate from "./AddNewRate";
import LogTable from "./LogTable";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/";
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
    if (result) setFetchError(result);
  };

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
    if (result) setFetchError(result);
  };

  const [addNewProjectIsVisible, setAddNewProjectIsVisible] = useState(false);

  const addNewProjectPop = () => {
    setAddNewProjectIsVisible(true);
  };
  const addNewProjectClose = () => {
    setAddNewProjectIsVisible(false);
  };

  const [addNewClientIsVisible, setAddNewClientIsVisible] = useState(false);

  const addNewClientPop = () => {
    setAddNewClientIsVisible(true);
  };
  const addNewClientClose = () => {
    setAddNewClientIsVisible(false);
  };

  const [addNewRateIsVisible, setAddNewRateIsVisible] = useState(false);

  const addNewRatePop = () => {
    setAddNewRateIsVisible(true);
  };
  const addNewRateClose = () => {
    setAddNewRateIsVisible(false);
  };

  const handleSubmit = (newItem) => {
    if (!newItem) {
      return;
    }
    addItem(newItem);
    setNewItem("");
  };

  return (
    <>
      <Header date={formattedDate} />
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
      {isLoading && <p>Loading items...</p>}
      {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
      {!fetchError && !isLoading && <LogTable items={items} />}
    </>
  );
}

export default App;

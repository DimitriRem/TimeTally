import { createContext, useState, useEffect } from "react";
import { api } from "../utils/api";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [rates, setRates] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [addNewProjectIsVisible, setAddNewProjectIsVisible] = useState(false);
  const [addNewClientIsVisible, setAddNewClientIsVisible] = useState(false);
  const [addNewRateIsVisible, setAddNewRateIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          itemsResponse,
          clientsResponse,
          projectsResponse,
          ratesResponse,
        ] = await Promise.all([
          api("/log"),
          api("/clients"),
          api("/projects"),
          api("/rates"),
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

  // Status pop timer
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
    <DataContext.Provider
      value={{
        addNewClientClose,
        addNewClientIsVisible,
        addNewClientPop,
        addNewProjectClose,
        addNewProjectIsVisible,
        addNewProjectPop,
        addNewRateClose,
        addNewRateIsVisible,
        addNewRatePop,
        api,
        clients,
        items,
        isLoading,
        fetchError,
        newItem,
        projects,
        rates,
        setAddNewClientIsVisible,
        setAddNewProjectIsVisible,
        setAddNewRateIsVisible,
        setFetchError,
        setItems,
        setNewItem,
        setProjects,
        setRates,
        setStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

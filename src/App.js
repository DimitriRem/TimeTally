import Header from "./Header";
import Toolbox from "./Toolbox";
import LogTable from "./LogTable";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";

function App() {
  const API_URL_LOG = "http://localhost:3500/log";
  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-UK", options);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL_LOG);
        if (!response.ok) throw Error("did not receive expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    (async () => await fetchItems())();
  }, []);

  // const addItem = async (item) => {
  //   const id = items.length ? items[items.length - 1].id + 1 : 1;
  //   const myNewItem = {
  //     id,
  //     project,
  //     details,
  //     client,
  //     rate,
  //     startTime,
  //     endTime,
  //   };
  //   const listItems = [...items, myNewItem];
  //   setItems(listItems);

  //   const postOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(myNewItem),
  //   };

  //   const result = await apiRequest(API_URL_LOG, postOptions);
  //   if (result) setFetchError(result);
  // };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL_LOG}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  return (
    <>
      <Header date={formattedDate} />
      <Toolbox />
      {isLoading && <p>Loading items...</p>}
      {fetchError && <p style={{ color: "red" }}>{`Eror: ${fetchError}`}</p>}
      {!fetchError && !isLoading && <LogTable items={items} />}
    </>
  );
}

export default App;

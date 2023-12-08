import { useContext } from "react";
import DataContext from "./context/DataContext";
import TimeEntry from "./TimeEntry";
import AddNewProject from "./AddNewProject";
import AddNewClient from "./AddNewClient";
import AddNewRate from "./AddNewRate";

const Toolbox = () => {
  const {
    fetchError,
    isLoading,
    addNewProjectIsVisible,
    addNewClientIsVisible,
    addNewRateIsVisible,
  } = useContext(DataContext);

  return (
    <>
      {!fetchError && !isLoading && <TimeEntry />}
      {addNewProjectIsVisible && <AddNewProject />}
      {addNewClientIsVisible && <AddNewClient />}
      {addNewRateIsVisible && <AddNewRate />}
    </>
  );
};

export default Toolbox;

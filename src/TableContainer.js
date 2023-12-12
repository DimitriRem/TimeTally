import React, { useContext } from "react";
import DataContext from "./context/DataContext";
import LogTable from "./LogTable";
import ProjectsTable from "./ProjectsTable";
import ClientsTable from "./ClientsTable";
import RatesTable from "./RatesTable";

const TableContainer = () => {
  const { currentNav } = useContext(DataContext);

  return (
    <>
      {currentNav === "log" ? <LogTable /> : ""}
      {currentNav === "projects" ? <ProjectsTable /> : ""}
      {currentNav === "clients" ? <ClientsTable /> : ""}
      {currentNav === "rates" ? <RatesTable /> : ""}
    </>
  );
};

export default TableContainer;

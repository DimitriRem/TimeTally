import React, { useContext } from "react";
import DataContext from "./context/DataContext";
// import RatesTableRow from "./RatesTableRow";

const RatesTable = () => {
  const { projects, isLoading, fetchError } = useContext(DataContext);

  return <></>;
};

export default RatesTable;

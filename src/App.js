import React from "react";
import Header from "./Header";
import Toolbox from "./Toolbox";
import LogTable from "./LogTable";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <>
      <DataProvider>
        <Header />
        <div id="desktopContainer">
          <div id="toolbox">
            <Toolbox />
          </div>
          <div id="tableContainer">
            <LogTable />
          </div>
        </div>
      </DataProvider>
    </>
  );
}

export default App;

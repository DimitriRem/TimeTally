import React from "react";
import TimeEntry from "./TimeEntry";
import ProjectStack from "./ProjectStack";
import ClientStack from "./ClientStack";
import RateStack from "./RateStack";

const Toolbox = () => {
  return (
    <div id="toolbox">
      <div id="toolboxLeft">
        <TimeEntry />
      </div>
      <div id="toolboxRight">
        <ProjectStack />
        <ClientStack />
        <RateStack />
      </div>
    </div>
  );
};

export default Toolbox;

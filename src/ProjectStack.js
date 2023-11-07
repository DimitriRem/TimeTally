import React from "react";

const ProjectStack = () => {
  return (
    <div id="projectsStack" className="stackItem">
      <div id="projectStackHeader" className="stackItemHeader">
        Projects
        <div id="projectStackNav" className="stackNav">
          <span className="material-symbols-outlined">add_box</span>
          <span className="material-symbols-outlined">delete</span>
        </div>
      </div>
      <div id="projectStackList" className="stackList">
        <div className="stackListItem">Project x</div>
        <div className="stackListItem">Project y</div>
        <div className="stackListItem">Project z</div>
        <div className="stackListItem">Project x</div>
        <div className="stackListItem">Project y</div>
        <div className="stackListItem">Project z</div>
        <div className="stackListItem">Project x</div>
        <div className="stackListItem">Project y</div>
        <div className="stackListItem">Project z</div>
      </div>
    </div>
  );
};

export default ProjectStack;

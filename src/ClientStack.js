import React from "react";

const ClientStack = () => {
  return (
    <div id="clientStack" className="stackItem">
      <div id="clientStackHeader" className="stackItemHeader">
        Clients
        <div id="clientStackNav" className="stackNav">
          <span className="material-symbols-outlined">add_box</span>{" "}
          <span className="material-symbols-outlined">delete</span>
        </div>
      </div>
      <div id="clientStackList" className="stackList">
        <div className="stackListItem">Client x</div>
        <div className="stackListItem">Client y</div>
        <div className="stackListItem">Client z</div>
        <div className="stackListItem">Client x</div>
        <div className="stackListItem">Client y</div>
        <div className="stackListItem">Client z</div>
        <div className="stackListItem">Client x</div>
        <div className="stackListItem">Client y</div>
        <div className="stackListItem">Client z</div>
      </div>
    </div>
  );
};

export default ClientStack;

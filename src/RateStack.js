import React from "react";

const RateStack = () => {
  return (
    <div id="rateStack" className="stackItem">
      <div id="rateStackHeader" className="stackItemHeader">
        Rates
        <div id="rateStackNav" className="stackNav">
          <span className="material-symbols-outlined">add_box</span>{" "}
          <span className="material-symbols-outlined">delete</span>
        </div>
      </div>
      <div id="rateStackList" className="stackList">
        <div className="stackListItem">$10/hr</div>
        <div className="stackListItem">$20/hr</div>
        <div className="stackListItem">$30/hr</div>
        <div className="stackListItem">$10/hr</div>
        <div className="stackListItem">$20/hr</div>
        <div className="stackListItem">$30/hr</div>
        <div className="stackListItem">$10/hr</div>
        <div className="stackListItem">$20/hr</div>
        <div className="stackListItem">$30/hr</div>
      </div>
    </div>
  );
};

export default RateStack;

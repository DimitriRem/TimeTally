import React, { useEffect, useState } from "react";

const AddNewRate = ({
  addRate,
  addNewRateClose,
  newRateDetails,
  setNewRateDetails,
}) => {
  const [addRateLabel, setAddRateLabel] = useState("");
  const [addRateNumber, setAddRateNumber] = useState("");

  const handleLabelChange = (event) => {
    setAddRateLabel(event.target.value);
  };
  const handleNumberChange = (event) => {
    setAddRateNumber(event.target.value);
  };

  const handleAddRate = (e) => {
    e.preventDefault();
    addRate(newRateDetails);
  };

  useEffect(() => {
    setNewRateDetails({
      rate: addRateNumber,
      label: addRateLabel,
    });
  }, [addRateNumber, addRateLabel]);

  return (
    <div id="blackout">
      <div id="addRateContainer" className="entryContainer">
        <div className="entryHeader">
          <span>Add a Rate</span>
        </div>
        <form onSubmit={handleAddRate} id="addRateForm">
          <label htmlFor="addRateLabelBox">Rate Label:</label>
          <input
            type="text"
            id="addRateLabelBox"
            name="addRateLabelBox"
            onChange={handleLabelChange}
            placeholder="Enter rate label"
          ></input>
          <br />
          <label htmlFor="addRateNumberBox">Rate: $</label>
          <input
            type="text"
            id="addRateNumberBox"
            name="addRateNumberBox"
            onChange={handleNumberChange}
            placeholder="00"
          ></input>
          /hr
          <button type="submit" id="addRateButton" className="mainButton">
            Add Rate
          </button>
          <br />
          <button className="cancelButton" onClick={addNewRateClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewRate;

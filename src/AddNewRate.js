import React, { useEffect, useState, useContext } from "react";
import DataContext from "./context/DataContext";

const AddNewRate = () => {
  const {
    addNewRateClose,
    currentNav,
    setRates,
    rates,
    setAddNewRateIsVisible,
    api,
    setStatus,
    setFetchError,
    fetchData,
  } = useContext(DataContext);

  const [addRateLabel, setAddRateLabel] = useState("");
  const [newRateDetails, setNewRateDetails] = useState({});
  const [addRateNumber, setAddRateNumber] = useState("");

  const hideCancel = currentNav === "rates";

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

  const addRate = async () => {
    const listRates = [...rates, newRateDetails];
    setRates(listRates);
    setAddNewRateIsVisible(false);
    const result = await api("/rates", "POST", newRateDetails);
    setStatus("New rate added.");
    if (result) setFetchError(result);
    fetchData();
  };

  return (
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
          required
        ></input>
        <br />
        <label htmlFor="addRateNumberBox">Rate: $</label>
        <input
          type="text"
          id="addRateNumberBox"
          name="addRateNumberBox"
          onChange={handleNumberChange}
          placeholder="00"
          required
        ></input>
        /hr
        <button type="submit" id="addRateButton" className="mainButton">
          Add Rate
        </button>
        <br />
        <button
          className="cancelButton"
          onClick={addNewRateClose}
          hidden={hideCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddNewRate;

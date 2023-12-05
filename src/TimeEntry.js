import React, { useState, useEffect } from "react";
import ProjectOption from "./ProjectOption";
import RateOption from "./RateOption";

const TimeEntry = ({
  projects,
  rates,
  handleSubmit,
  newItem,
  setNewItem,
  addNewProjectPop,
  addNewRatePop,
}) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentRateIndex, setCurrentRateIndex] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [details, setDetails] = useState("");
  const [totalHours, setTotalHours] = useState("0");
  const [totalFee, setTotalFee] = useState("0");
  const [formDate, setFormDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [finalStartTime, setFinalStartTime] = useState("");
  const [finalEndTime, setFinalEndTime] = useState("");
  const mainTextColorStyle = {
    color: "var(--mainTextColor)",
  };

  const handleProjectOptionChange = (event) => {
    const selectedValue = Number(event.target.value);
    if (selectedValue === -2) {
      addNewProjectPop();
    } else {
      const matchingProjectIndex = projects.findIndex(
        (project) => project.id === selectedValue
      );

      setCurrentProjectIndex(matchingProjectIndex);
    }
  };

  const handleRateOptionChange = (event) => {
    const selectedValue = Number(event.target.value);
    if (selectedValue === -2) {
      addNewRatePop();
    } else {
      const matchingRateIndex = rates.findIndex(
        (rate) => rate.id === selectedValue
      );

      setCurrentRateIndex(matchingRateIndex);
    }
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handleDateChange = (event) => {
    setFormDate(event.target.value);
  };

  useEffect(() => {
    if (startTime && endTime) {
      const startDate = new Date(`${formDate}T${startTime}`);
      const endDate = new Date(`${formDate}T${endTime}`);
      const differenceInMilliseconds = Math.abs(endDate - startDate);

      setTotalHours((differenceInMilliseconds / (1000 * 60 * 60)).toFixed(2));
      setFinalStartTime(startDate);
      setFinalEndTime(endDate);
    }
  }, [formDate, startTime, endTime]);

  useEffect(() => {
    if (totalHours !== "" && currentRateIndex !== "-1") {
      setTotalFee((totalHours * rates[currentRateIndex].rate).toFixed(2));
    }
  }, [totalHours, currentRateIndex]);

  useEffect(() => {
    setNewItem({
      project: projects[currentProjectIndex].name,
      details: details,
      client: projects[currentProjectIndex].client,
      rate: rates[currentRateIndex].rate,
      startTime: finalStartTime,
      endTime: finalEndTime,
    });
  }, [
    details,
    currentProjectIndex,
    currentRateIndex,
    finalStartTime,
    finalEndTime,
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(newItem);
  };

  return (
    <div id="timeEntryContainer" className="entryContainer">
      Log time for
      <form className="logForm" onSubmit={handleFormSubmit}>
        <div id="timeEntryHeader" className="entryHeader">
          <div className="entryHeaderLeft">
            <div id="projectName" className="projectName">
              {projects[currentProjectIndex].name}
            </div>
            <div id="clientName" className="clientName">
              <span style={mainTextColorStyle}>for</span>{" "}
              {projects[currentProjectIndex].client}
            </div>
          </div>
          <div id="projectSelector">
            <span style={mainTextColorStyle}>or</span>{" "}
            <select name="project" onChange={handleProjectOptionChange}>
              <option value="">Another Project</option>
              <option value="-2" className="utility">
                + Add a new Project
              </option>
              {projects.map((project) => (
                <ProjectOption
                  key={project.id}
                  id={project.id}
                  name={project.name}
                />
              ))}
            </select>
          </div>
        </div>
        <div id="logFormLeft">
          <label htmlFor="startTime">Start time: </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            onChange={handleStartTimeChange}
            required
          />{" "}
          <input type="date" value={formDate} onChange={handleDateChange} />
          <br />
          <label htmlFor="endTime">End time: </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            onChange={handleEndTimeChange}
            required
          />
          <br />
          <label htmlFor="rate">Rate: </label>
          <select id="rate" name="rate" onChange={handleRateOptionChange}>
            {rates.map((rate) => (
              <RateOption
                key={rate.id}
                id={rate.id}
                rate={rate.rate}
                label={rate.label}
              />
            ))}
            <option value="-2" className="utility">
              Add a new rate
            </option>
          </select>
        </div>

        <label htmlFor="descriptionBox">Work details:</label>
        <br />
        <textarea
          id="descriptionBox"
          required
          name="descriptionBox"
          placeholder="Describe what was done."
          defaultValue=""
          rows="4"
          cols="5"
          onChange={handleDetailsChange}
        ></textarea>

        <button type="submit" id="submitHours" className="mainButton">
          Submit Hours
          <br />
          <span className="buttonTotals">
            (Total: {totalHours}hrs, ${totalFee})
          </span>
        </button>
      </form>
    </div>
  );
};

export default TimeEntry;

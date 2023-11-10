import React, { useState, useEffect } from "react";
import ProjectOption from "./ProjectOption";
import RateOption from "./RateOption";

const TimeEntry = ({ projects, rates, handleSubmit, newItem, setNewItem }) => {
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

  let matchingProjectIndex = -2;
  let matchingRateIndex = -2;

  const handleProjectOptionChange = (event) => {
    const selectedValue = Number(event.target.value); ////ll
    if (selectedValue === "addProject") {
      // Code to add a new project
    } else {
      matchingProjectIndex = projects.findIndex(
        (project) => project.id === selectedValue
      );

      setCurrentProjectIndex(matchingProjectIndex);
    }
  };

  const handleRateOptionChange = (event) => {
    const selectedValue = Number(event.target.value);
    if (selectedValue === "addRate") {
      // Code to add a new project
    } else {
      matchingRateIndex = rates.findIndex((rate) => rate.id === selectedValue);

      setCurrentRateIndex(matchingRateIndex);
      //handleTotalsChange();
    }
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
    //handleTotalsChange();
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
    //handleTotalsChange();
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
    if (totalHours !== "" && currentRateIndex !== "") {
      setTotalFee((totalHours * rates[currentRateIndex].rate).toFixed(2));
    }
  }, [totalHours, currentRateIndex]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setNewItem({
      project: projects[currentProjectIndex].name,
      details: details,
      client: projects[currentProjectIndex].client,
      rate: rates[currentRateIndex].rate,
      startTime: finalStartTime,
      endTime: finalEndTime,
    });
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
              for {projects[currentProjectIndex].client}
            </div>
          </div>
          <div id="projectSelector">
            or
            <select name="project" onChange={handleProjectOptionChange}>
              <option value="null">Another Project</option>
              <option value="addProject" className="utility">
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
        <div id="timeBlock">
          <div id="logFormLeft">
            <label htmlFor="startTime">Start time:</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              onChange={handleStartTimeChange}
              required
            />
            <input type="date" value={formDate} onChange={handleDateChange} />
            <br />
            <label htmlFor="endTime">End time:</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              onChange={handleEndTimeChange}
              required
            />
            <br />
            <label htmlFor="rate">Rate:</label>
            <select id="rate" name="rate" onChange={handleRateOptionChange}>
              {rates.map((rate) => (
                <RateOption
                  key={rate.id}
                  id={rate.id}
                  rate={rate.rate}
                  label={rate.label}
                />
              ))}
              <option value="addRate" className="utility">
                Add a new rate
              </option>
            </select>
          </div>

          <div id="totalHours">
            Total: {totalHours}hrs, ${totalFee}
          </div>
        </div>
        <label htmlFor="descriptionBox">Work details:</label>
        <textarea
          id="descriptionBox"
          required
          name="descriptionBox"
          placeholder="Describe what was done."
          defaultValue="Describe what was done."
          rows="4"
          cols="5"
          onChange={handleDetailsChange}
        ></textarea>

        <button type="submit" id="submitHours" className="mainButton">
          Submit Hours
        </button>
      </form>
    </div>
  );
};

export default TimeEntry;

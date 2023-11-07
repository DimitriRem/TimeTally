import React from "react";

const TimeEntry = () => {
  return (
    <div id="timeEntryContainer" className="entryContainer">
      Log time for
      <div id="timeEntryHeader" className="entryHeader">
        <div className="entryHeaderLeft">
          <div id="projectName" className="projectName">
            Kooleidoscope
          </div>
          <div id="clientName" className="clientName">
            for Client Inc.
          </div>
        </div>
        <div id="projectSelector">
          or
          <select id="projectSelectorDropdown">
            <option value="null">Another Project</option>
            <option value="addProject" className="utility">
              + Add a new Project
            </option>
            <option value="project-2">Project Two</option>
            <option value="project-3">Project Three</option>
          </select>
        </div>
      </div>
      <form action="" id="logForm">
        <div id="timeBlock">
          <div id="logFormLeft">
            <label htmlFor="startTime">Start time:</label>
            <input type="time" id="startTime" name="startTime" />
            <a href="">today</a>.<br />
            <label htmlFor="endTime">End time:</label>
            <input type="time" id="endTime" name="endTime" />
            <a href="">today</a>.<br />
            <label htmlFor="rate">Rate:</label>
            <select id="rate">
              <option value="rate-1">$10/hr</option>
              <option value="rate-2">$20/hr</option>
              <option value="rate-3">$30/hr</option>
              <option value="addRate" className="utility">
                Add a new rate
              </option>
            </select>
          </div>

          <div id="totalHours">Total: 3hrs, $60</div>
        </div>
        <label htmlFor="descriptionBox">Work details:</label>
        <textarea
          id="descriptionBox"
          name="descriptionBox"
          placeholder="Describe what was done."
          defaultValue="Describe what was done."
          rows="4"
          cols="5"
        ></textarea>

        <button type="submit" id="submitHours" className="mainButton">
          Submit Hours
        </button>
      </form>
    </div>
  );
};

export default TimeEntry;

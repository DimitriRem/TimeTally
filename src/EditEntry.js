import React, { useEffect, useState } from "react";

const EditEntry = ({ editEntryClose }) => {
  return (
    <div id="editEntryContainer" className="entryContainer">
      <div className="entryHeader">
        <span>Edit Entry</span>
        <button className="cancelButton" onClick={editEntryClose}>
          Cancel
        </button>
      </div>
      <form>
        <label htmlFor="projectName">Project Name: </label>
        <input type="text" id="projectName" name="projectName" />
        <br /> <label htmlFor="projectDetails">Details: </label>
        <input type="text" id="projectDetails" name="projectDetails" />
        <br />
        <label htmlFor="rate">Rate: </label>
        <select id="rate" name="rate">
          <option value="-2" className="utility">
            Add a new rate
          </option>
        </select>
        <br />
        <label htmlFor="startTime">Start time: </label>
        <input type="time" id="startTime" name="startTime" required />
        <input type="date" />
        <br />
        <label htmlFor="endTime">End time: </label>
        <input type="time" id="endTime" name="endTime" required />
        <br />
        <button type="submit" id="updateentryButton" className="mainButton">
          Update
        </button>{" "}
        <br />
        <button id="deleteEntryButton" className="deleteButton">
          Delete Entry
        </button>
      </form>
    </div>
  );
};

export default EditEntry;

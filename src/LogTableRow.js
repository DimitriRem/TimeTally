import React, { useState } from "react";

const LogTableRow = ({
  id,
  project,
  details,
  client,
  rate,
  startTime,
  endTime,
  API_URL,
}) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const differenceInMilliseconds = Math.abs(endDate - startDate);
  const numberOfHours = differenceInMilliseconds / (1000 * 60 * 60);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const confirmDelete = () => {
    // Perform the delete operation here
    deleteEntry(id);
    setIsDeleteModalOpen(false);
    window.location.reload();
  };
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const cancelEdit = () => {
    setIsEditModalOpen(false);
  };
  const deleteEntry = (id) => {
    fetch(`${API_URL}log/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <React.Fragment>
      <tr>
        <td>{project}</td>
        <td>{details}</td>
        <td>{client}</td>
        <td>${rate}/hr</td>
        <td>
          {startDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </td>
        <td>
          {endDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </td>
        <td>{numberOfHours}hrs</td>

        <td>${numberOfHours * rate}</td>
        <td>
          <span
            className="material-symbols-outlined rowButton"
            onClick={handleEdit}
          >
            edit
          </span>
          <span
            className="material-symbols-outlined rowButton"
            onClick={handleDelete}
          >
            delete
          </span>
        </td>
      </tr>
      {isDeleteModalOpen && (
        <tr>
          <td colSpan="7" className="deleteConfirm">
            Are you sure you want to delete the above entry? <br />
            <span style={{ fontWeight: "normal" }}>
              ({details} for {project})
            </span>
          </td>
          <td colSpan="2" className="deleteConfirm">
            <button onClick={confirmDelete} className="confirmButton">
              Yes, delete it!
            </button>
            <span className="deleteCancel" onClick={cancelDelete}>
              No, cancel.
            </span>
          </td>
        </tr>
      )}
      {isEditModalOpen && (
        <tr>
          <td colSpan="9" className="updateDetailsTd">
            <h2>
              Edit details for above entry{" "}
              <span className="material-symbols-outlined">arrow_upward</span>
            </h2>
            <form>
              <label htmlFor="projectName">Project Name: </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={project}
              />
              <br /> <label htmlFor="projectDetails">Details: </label>
              <input
                type="text"
                id="projectDetails"
                name="projectDetails"
                value={details}
              />
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
              <button
                type="submit"
                id="updateentryButton"
                className="mainButton"
              >
                Update
              </button>
            </form>
            <span className="deleteCancel" onClick={cancelEdit}>
              Cancel
            </span>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default LogTableRow;

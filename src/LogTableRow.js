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
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
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
          <span className="material-symbols-outlined rowButton">edit</span>
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
    </React.Fragment>
  );
};

export default LogTableRow;

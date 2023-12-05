import React from "react";

const DeleteEntry = ({
  details,
  project,
  id,
  API_URL,
  setIsDeleteModalOpen,
  setStatus,
}) => {
  const confirmDelete = () => {
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
    setStatus("Entry deleted");
  };

  return (
    <tr>
      <td colSpan="9" className="deleteConfirm">
        Are you sure you want to delete the above entry? <br />
        <span style={{ fontWeight: "normal" }}>
          ({details} for {project})
        </span>
        <br />
        <button onClick={confirmDelete} className="confirmButton">
          Yes, delete it!
        </button>
        <br />
        <span className="deleteCancel" onClick={cancelDelete}>
          No, cancel.
        </span>
      </td>
    </tr>
  );
};

export default DeleteEntry;

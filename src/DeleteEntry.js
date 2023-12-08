import React, { useContext } from "react";
import DataContext from "./context/DataContext";

const DeleteEntry = ({ details, project, id, setIsDeleteModalOpen }) => {
  const { api, setStatus, setFetchError } = useContext(DataContext);
  const confirmDelete = () => {
    deleteEntry(id);

    setIsDeleteModalOpen(false);
    window.location.reload();
  };
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteEntry = async (id) => {
    const result = api(`log/${id}`, "DELETE");
    if (result) setFetchError(result);
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
        <button className="cancelButton" onClick={cancelDelete}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default DeleteEntry;

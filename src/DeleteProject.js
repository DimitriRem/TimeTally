import React, { useContext } from "react";
import DataContext from "./context/DataContext";

const DeleteProject = ({ name, id, setIsDeleteModalOpen }) => {
  const { api, setStatus, setFetchError, fetchData } = useContext(DataContext);

  const confirmDelete = () => {
    deleteProject(id);

    setIsDeleteModalOpen(false);
    fetchData();
  };
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteProject = async (id) => {
    const result = api(`/projects/${id}`, "DELETE");
    if (result) setFetchError(result);
    setStatus("Project deleted");
  };

  return (
    <tr>
      <td colSpan="3" className="deleteConfirm">
        Are you sure you want to delete project "{name}"? <br />
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

export default DeleteProject;

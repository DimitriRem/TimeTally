import React, { useContext } from "react";
import DataContext from "./context/DataContext";

const DeleteClient = ({ name, id, setIsDeleteModalOpen }) => {
  const { api, setStatus, setFetchError, fetchData } = useContext(DataContext);

  const confirmDelete = () => {
    deleteClient(id);

    setIsDeleteModalOpen(false);
    fetchData();
  };
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteClient = async (id) => {
    const result = api(`/clients/${id}`, "DELETE");
    if (result) setFetchError(result);
    setStatus("Client deleted");
  };

  return (
    <tr>
      <td colSpan="3" className="deleteConfirm">
        Are you sure you want to delete Client "{name}"? <br />
        <br />
        <button onClick={confirmDelete} className="confirmButton">
          Yes, delete client!
        </button>
        <br />
        <button className="cancelButton" onClick={cancelDelete}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default DeleteClient;

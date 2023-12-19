import React, { useContext } from "react";
import DataContext from "./context/DataContext";

const DeleteRate = ({ label, id, rate, setIsDeleteModalOpen }) => {
  const { api, setStatus, setFetchError, fetchData } = useContext(DataContext);

  const confirmDelete = () => {
    deleteRate(id);

    setIsDeleteModalOpen(false);
    fetchData();
  };
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteRate = async (id) => {
    const result = api(`/rates/${id}`, "DELETE");
    if (result) setFetchError(result);
    setStatus("Rate deleted");
  };

  return (
    <tr>
      <td colSpan="3" className="deleteConfirm">
        Are you sure you want to delete rate "{label}"? <br />
        <br />
        <button onClick={confirmDelete} className="confirmButton">
          Yes, delete rate!
        </button>
        <br />
        <button className="cancelButton" onClick={cancelDelete}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default DeleteRate;

import React, { useContext, useState } from "react";
import DataContext from "./context/DataContext";

const EditRate = ({ label, id, rate, setIsEditModalOpen }) => {
  const { api, setStatus, setFetchError, fetchData, logItems } =
    useContext(DataContext);

  const [updatedRateLabel, setUpdatedRateLabel] = useState(label);
  const [updatedRateAmount, setUpdatedRateAmount] = useState(rate);

  const cancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleLabelUpdate = (event) => {
    setUpdatedRateLabel(event.target.value);
  };
  const handleAmountUpdate = (event) => {
    setUpdatedRateAmount(event.target.value);
  };

  async function handleRateUpdate(e) {
    e.preventDefault();

    try {
      await updateRate();
      await updateRateInLog(rate, updatedRateAmount, logItems);
      setIsEditModalOpen(false);
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  function updateRateInLog(rate, updatedRateAmount, logItems) {
    // Check if any entries match the current client name
    const entriesToUpdate = logItems.filter((entry) => entry.rate === rate);

    if (entriesToUpdate.length) {
      // Update each matching entry individually and collect promises
      const updatePromises = entriesToUpdate.map((entry) =>
        api(`/log/${entry.id}`, "PATCH", {
          rate: updatedRateAmount,
        })
      );

      // Wait for all updates to finish before processing further
      Promise.all(updatePromises)
        .then(() => console.log("All rates updated in log successfully!"))
        .catch((error) => console.error("Error updating rates in log:", error));
    } else {
      console.warn(`Rate "${rate}" not found in the log`);
    }
  }

  const updateRate = async () => {
    const result = api(`/rates/${id}`, "PUT", {
      label: updatedRateLabel,
      rate: updatedRateAmount,
    });
    if (result) setFetchError(result);
    setStatus("Rate updated");
  };

  return (
    <tr>
      <td colSpan="3" className="updateDetailsTd">
        <h2>
          Edit details for above rate{" "}
          <span className="material-symbols-outlined">arrow_upward</span>
        </h2>
        <form className="editForm" onSubmit={handleRateUpdate}>
          <label htmlFor="rateLabel">Rate Label: </label>
          <input
            type="text"
            id="rateLabel"
            name="rateLabel"
            defaultValue={label}
            onChange={handleLabelUpdate}
          />
          <br />
          <label htmlFor="rateAmount">Rate Amount: </label>
          <input
            type="number"
            id="rateAmount"
            name="rateAmount"
            defaultValue={rate}
            onChange={handleAmountUpdate}
          />
          <br />
          <button type="submit" id="updateClientButton" className="mainButton">
            Update Rate
          </button>
        </form>
        <button className="cancelButton" onClick={cancelEdit}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditRate;
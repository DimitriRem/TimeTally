import React from "react";

const RateInform = ({ setIsInformModalOpen }) => {
  const cancelDelete = () => {
    setIsInformModalOpen(false);
  };
  return (
    <tr>
      <td colSpan="3" className="deleteConfirm">
        This rate can not be deleted. <br />
        <span style={{ fontWeight: "normal" }}>
          Because this rate has time logged, deleting will cause data
          corruption. <br />
          Delete all relevant log entries and try again.
        </span>
        <br />
        <br />
        <button className="cancelButton" onClick={cancelDelete}>
          Close
        </button>
      </td>
    </tr>
  );
};

export default RateInform;

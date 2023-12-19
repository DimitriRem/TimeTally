import React from "react";

const ClientInform = ({ setIsInformModalOpen }) => {
  const cancelDelete = () => {
    setIsInformModalOpen(false);
  };
  return (
    <tr>
      <td colSpan="3" className="deleteConfirm">
        This client can not be deleted. <br />
        <span style={{ fontWeight: "normal" }}>
          Because this client has time logged, deleting will cause data
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

export default ClientInform;

import React from "react";

const ProjectInform = ({ setIsInformModalOpen }) => {
  const cancelDelete = () => {
    setIsInformModalOpen(false);
  };
  return (
    <tr>
      <td colSpan="3" className="deleteConfirm">
        This project can not be deleted. <br />
        <span style={{ fontWeight: "normal" }}>
          Because this project has time logged to it, deleting will cause data
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

export default ProjectInform;

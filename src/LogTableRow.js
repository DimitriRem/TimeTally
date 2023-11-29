import React, { useState } from "react";
import RateOption from "./RateOption";
import ProjectOption from "./ProjectOption";

const LogTableRow = ({
  id,
  project,
  details,
  client,
  rate,
  startTime,
  endTime,
  API_URL,
  rates,
  projects,
}) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const differenceInMilliseconds = Math.abs(endDate - startDate);
  const numberOfHours = differenceInMilliseconds / (1000 * 60 * 60);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedProjectIndex, setUpdatedProjectIndex] = useState("");
  const [updatedProjectDetails, setUpdatedProjectDetails] = useState("");
  const [updatedProjectRateIndex, setUpdatedProjectRateIndex] = useState("");
  const [updatedProjectStartTime, setUpdatedProjectStartTime] = useState("");
  const [updatedProjectDate, setUpdatedProjectDate] = useState("");
  const [updatedProjectEndTime, setUpdatedProjectEndTime] = useState("");
  const [updatedItem, setUpdatedItem] = useState({});

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
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

  let currentProjectId = projects.findIndex((proj) => proj.name === project);
  let currentRateId = rates.findIndex((rat) => rat.rate === rate);

  const cancelEdit = () => {
    setIsEditModalOpen(false);
  };
  const deleteEntry = (id) => {
    fetch(`${API_URL}log/${id}`, {
      method: "DELETE",
    });
  };

  const handleEntryUpdate = (e) => {
    e.preventDefault();
    handleUpdate(updatedItem);
  };

  const handleProjectUpdate = (event) => {
    const selectedValue = Number(event.target.value);
    if (selectedValue === -2) {
      addNewProjectPop();
    } else {
      currentProjectId = projects.findIndex(
        (proj) => proj.id === selectedValue
      );

      setUpdatedProjectIndex(currentProjectId);
    }
  };

  const handleDetailsUpdate = (event) => {
    setUpdatedProjectDetails(event.target.value);
  };

  const handleRateUpdate = (event) => {
    const selectedValue = Number(event.target.value);
    if (selectedValue === -2) {
      addNewRatePop();
    } else {
      currentRateId = rates.findIndex((rat) => rat.id === selectedValue);
      setUpdatedProjectRateIndex(currentRateId);
    }
  };

  const handleStartTimeUpdate = (event) => {
    setUpdatedProjectStartTime(event.target.value);
  };

  const handleEndTimeUpdate = (event) => {
    setUpdatedProjectEndTime(event.target.value);
  };

  const handleDateUpdate = (event) => {
    setUpdatedProjectDate(event.target.value);
  };

  useEffect(() => {
    setUpdatedItem({
      project: projects[updatedProjectIndex].name,
      details: updatedProjectDetails,
      client: projects[updatedProjectIndex].client,
      rate: rates[updatedProjectRateIndex].rate,
      startTime: updatedProjectStartTime,
      endTime: updatedProjectEndTime,
    });
  }, [details]);

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
          <span
            className="material-symbols-outlined rowButton"
            onClick={handleEdit}
          >
            edit
          </span>
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

      {isEditModalOpen && (
        <tr>
          <td colSpan="9" className="updateDetailsTd">
            <h2>
              Edit details for above entry{" "}
              <span className="material-symbols-outlined">arrow_upward</span>
            </h2>
            <form className="editForm" onSubmit={handleEntryUpdate}>
              <label htmlFor="projectName">Project Name: </label>
              <select
                name="project"
                defaultValue={currentProjectId + 1}
                onChange={handleProjectUpdate}
              >
                <option value="null">Another Project</option>
                <option value="-2" className="utility">
                  + Add a new Project
                </option>
                {projects.map((project) => (
                  <ProjectOption
                    key={project.id}
                    id={project.id}
                    name={project.name}
                  />
                ))}
              </select>
              <br /> <label htmlFor="projectDetails">Details: </label>
              <input
                type="text"
                id="projectDetails"
                name="projectDetails"
                defaultValue={details}
                onChange={handleDetailsUpdate}
              />
              <br />
              <label htmlFor="rate">Rate: </label>
              <select
                id="rate"
                name="rate"
                defaultValue={currentRateId + 1}
                onChange={handleRateUpdate}
              >
                {rates.map((rate) => (
                  <RateOption
                    key={rate.id}
                    id={rate.id}
                    rate={rate.rate}
                    label={rate.label}
                  />
                ))}
                <option value="-2" className="utility">
                  Add a new rate
                </option>
              </select>
              <br />
              <label htmlFor="startTime">Start time: </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={startDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
                onChange={handleStartTimeUpdate}
                required
              />
              <input
                type="date"
                value={startDate.toISOString().split("T")[0]}
                onChange={handleDateUpdate}
              />
              <br />
              <label htmlFor="endTime">End time: </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={endDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
                onChange={handleEndTimeUpdate}
                required
              />
              <br />
              <button
                type="submit"
                id="updateentryButton"
                className="mainButton"
              >
                Update
              </button>
            </form>
            <span className="deleteCancel" onClick={cancelEdit}>
              Cancel
            </span>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default LogTableRow;

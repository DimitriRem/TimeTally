import React, { useState, useEffect } from "react";
import DeleteEntry from "./DeleteEntry";
import EditEntry from "./EditEntry";

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
  addNewProjectPop,
  addNewRatePop,
  setStatus,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfHours, setNumberOfHours] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [startTimeString, setStartTimeString] = useState(null);
  const [endTimeString, setEndTimeString] = useState(null);

  useEffect(() => {
    setStartDate(new Date(startTime));
    setEndDate(new Date(endTime));
  }, [startTime, endTime]);

  useEffect(() => {
    if (startDate && endDate) {
      const differenceInMilliseconds = Math.abs(endDate - startDate);
      const numberOfHours = differenceInMilliseconds / (1000 * 60 * 60);
      setNumberOfHours(numberOfHours);

      setStartTimeString(
        startDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );

      setEndTimeString(
        endDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }
  }, [startDate, endDate]);

  const handleDelete = () => {
    setIsDeleteModalOpen((prevState) => !prevState);
  };

  const handleEdit = () => {
    setIsEditModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <tr>
        <td>{project}</td>
        <td>{details}</td>
        <td>{client}</td>
        <td>${rate}/hr</td>
        <td>{startTimeString}</td>
        <td>{endTimeString}</td>
        <td>{numberOfHours && `${numberOfHours.toFixed(1)}hrs`}</td>
        <td>${numberOfHours && (numberOfHours * rate).toFixed(2)}</td>
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
        <DeleteEntry
          details={details}
          project={project}
          id={id}
          API_URL={API_URL}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setStatus={setStatus}
        />
      )}
      {isEditModalOpen && (
        <EditEntry
          project={project}
          id={id}
          projects={projects}
          rates={rates}
          details={details}
          rate={rate}
          startDate={startDate}
          endDate={endDate}
          addNewProjectPop={addNewProjectPop}
          addNewRatePop={addNewRatePop}
          setIsEditModalOpen={setIsEditModalOpen}
          API_URL={API_URL}
          setStatus={setStatus}
        />
      )}
    </>
  );
};

export default React.memo(LogTableRow);

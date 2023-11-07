import React from "react";

const LogTableRow = ({
  project,
  details,
  client,
  rate,
  startTime,
  endTime,
}) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const differenceInMilliseconds = Math.abs(endDate - startDate);
  const numberOfHours = differenceInMilliseconds / (1000 * 60 * 60);

  return (
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
        <span className="material-symbols-outlined">edit</span>
      </td>
    </tr>
  );
};

export default LogTableRow;

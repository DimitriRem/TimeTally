import React from "react";
import LogTableRow from "./LogTableRow";

// Assuming you have an array of logs named 'items'
const LogTable = ({ items, API_URL }) => {
  // Function to group logs by date
  const groupLogsByDate = (items) => {
    const groupedLogs = {};
    items.forEach((log) => {
      const startDate = new Date(log.startTime).toLocaleDateString(); // Get the date and format as string

      if (!groupedLogs[startDate]) {
        groupedLogs[startDate] = [];
      }
      groupedLogs[startDate].push(log);
    });
    return groupedLogs;
  };

  // Render the table
  const renderTable = () => {
    const sortedLogs = items.sort(
      (a, b) => Date.parse(a.startTime) - Date.parse(b.startTime)
    ); // Sort logs by startDate
    const groupedLogs = groupLogsByDate(sortedLogs);
    let lastDate = null;

    return (
      <>
        <div className="re-heading">Time Logged</div>
        {items.length ? (
          <table className="re-table">
            <thead>
              <tr>
                <th className="re-col-wide">Project Name</th>
                <th className="re-col-wide">Details</th>
                <th className="re-col-wide">Client</th>
                <th className="re-col-narrow">Rate</th>
                <th className="re-col-narrow">Start Time</th>
                <th className="re-col-narrow">End Time</th>
                <th className="re-col-narrow">No. of Hours</th>
                <th className="re-col-narrow">Total Fee</th>
                <th className="re-col-narrow"></th>
              </tr>
            </thead>
            <tbody>
              {sortedLogs.map((log) => {
                const options = {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                };
                const startDate = new Date(log.startTime).toLocaleDateString(
                  "en-UK",
                  options
                );
                if (startDate !== lastDate) {
                  // Render the date row when the date changes
                  lastDate = startDate;
                  return (
                    <React.Fragment key={startDate}>
                      <tr>
                        <td colSpan="9" className="re-dateRow">
                          {startDate}
                        </td>
                      </tr>

                      <LogTableRow
                        key={log.id}
                        id={log.id}
                        project={log.project}
                        details={log.details}
                        client={log.client}
                        rate={log.rate}
                        startTime={log.startTime}
                        endTime={log.endTime}
                        API_URL={API_URL}
                      />
                    </React.Fragment>
                  );
                } else {
                  // Only render the LogTableRow for subsequent entries on the same day
                  return (
                    <LogTableRow
                      key={log.id}
                      id={log.id}
                      project={log.project}
                      details={log.details}
                      client={log.client}
                      rate={log.rate}
                      startTime={log.startTime}
                      endTime={log.endTime}
                      API_URL={API_URL}
                    />
                  );
                }
              })}
            </tbody>
          </table>
        ) : (
          <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
        )}
      </>
    );
  };

  // Render the table component
  return <div>{renderTable()}</div>;
};

export default LogTable;

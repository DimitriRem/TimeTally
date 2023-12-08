import React, { useMemo, useCallback, useContext } from "react";
import LogTableRow from "./LogTableRow";
import DataContext from "./context/DataContext";

const LogTable = () => {
  const { items, isLoading, fetchError } = useContext(DataContext);
  const groupLogsByDate = useCallback((items) => {
    const groupedLogs = {};
    items.forEach((log) => {
      const startDate = new Date(log.startTime).toLocaleDateString();
      if (!groupedLogs[startDate]) {
        groupedLogs[startDate] = [];
      }
      groupedLogs[startDate].push(log);
    });
    return groupedLogs;
  }, []);

  const sortedLogs = useMemo(
    () =>
      items.sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime)),
    [items]
  );

  const renderTable = useCallback(() => {
    let lastDate = null;
    return (
      <>
        {isLoading && <p>Loading items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}

        <div className="re-heading">Time Logged</div>
        {!fetchError && !isLoading && items.length ? (
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
                  lastDate = startDate;
                  return (
                    <React.Fragment key={startDate}>
                      <tr className="dateTR">
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
                      />
                    </React.Fragment>
                  );
                } else {
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
  }, [items, sortedLogs, groupLogsByDate]);

  return <div>{renderTable()}</div>;
};

export default LogTable;

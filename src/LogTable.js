import React, { useMemo, useCallback } from "react";
import LogTableRow from "./LogTableRow";

const LogTable = ({
  items,
  API_URL,
  rates,
  projects,
  addNewProjectPop,
  addNewRatePop,
  setStatus,
}) => {
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
                        API_URL={API_URL}
                        rates={rates}
                        projects={projects}
                        addNewProjectPop={addNewProjectPop}
                        addNewRatePop={addNewRatePop}
                        setStatus={setStatus}
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
                      API_URL={API_URL}
                      rates={rates}
                      projects={projects}
                      setStatus={setStatus}
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
  }, [
    items,
    sortedLogs,
    groupLogsByDate,
    API_URL,
    rates,
    projects,
    addNewProjectPop,
    addNewRatePop,
  ]);

  return <div>{renderTable()}</div>;
};

export default LogTable;

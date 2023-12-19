import React, { useState, useContext } from "react";
import DataContext from "./context/DataContext";
import DeleteClient from "./DeleteClient";
import EditClient from "./EditClient";
import ClientInform from "./ClientInform";

const ClientsTableRow = ({ id, name }) => {
  const { logItems } = useContext(DataContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInformModalOpen, setIsInformModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen((prevState) => !prevState);
  };
  const handleDelete = () => {
    setIsDeleteModalOpen((prevState) => !prevState);
  };
  const handleInform = () => {
    setIsInformModalOpen((prevState) => !prevState);
  };

  const appearsInLog = logItems.some((item) => item.client === name);
  return (
    <React.Fragment>
      <tr>
        <td>{name}</td>
        <td>
          <span
            className="material-symbols-outlined rowButton"
            onClick={handleEdit}
          >
            edit
          </span>
          {appearsInLog ? (
            <span
              className="material-symbols-outlined rowButton unavailable"
              onClick={handleInform}
            >
              {" "}
              delete
            </span>
          ) : (
            <span
              className="material-symbols-outlined rowButton "
              onClick={handleDelete}
            >
              {" "}
              delete
            </span>
          )}
        </td>
      </tr>
      {isDeleteModalOpen && (
        <DeleteClient
          name={name}
          id={id}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      {isInformModalOpen && (
        <ClientInform setIsInformModalOpen={setIsInformModalOpen} />
      )}
      {isEditModalOpen && (
        <EditClient
          id={id}
          name={name}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}
    </React.Fragment>
  );
};

export default ClientsTableRow;
import React, { useState } from "react";
import "./DynamicTable.css"; // Import the CSS file for styling

const DynamicTable = ({
  headers,
  data,
  handleOpenModal,
  //   selectedRows,
  //   setSelectedRows,
  handleRowSelect,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (rowIndex) => {
    const updatedSelectedRows = [...selectedRows];
    updatedSelectedRows[rowIndex] = !updatedSelectedRows[rowIndex];
    setSelectedRows(updatedSelectedRows);
  };

  const handleEditClick = (row) => {
    // Handle the edit action for the selected row
    console.log("Edit row:", row);
  };

  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Select</th>
            {headers?.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows[rowIndex] || false}
                  onChange={(event) => {
                    handleRowSelect(event, row);
                    handleCheckboxChange(rowIndex);
                  }}
                />
              </td>
              {headers?.map((header, headerIndex) => {
                return (
                  <td key={headerIndex}>
                    {(header === "Text" || header === "Question") &&
                    row[header]?.includes("data") ? (
                      <img
                        class="enlarge-image"
                        id="enlarged-image"
                        src={row[header]}
                        alt="Image"
                      />
                    ) : (
                      row[header]
                    )}
                  </td>
                );
              })}
              <td>
                <button onClick={() => handleOpenModal(row.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;

import { AgGridReact } from "ag-grid-react";
import React, { useState, useRef, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Button from "@material-ui/core/Button";

function ArchiveList() {
  const [archives, setArchives] = useState([]);
  useEffect(() => {
    getArchives();
  }, []);

  const gridRef = useRef();

  const getArchives = () => {
    fetch("https://archivemap.herokuapp.com/archives")
      .then((response) => response.json())
      .then((data) => {
        setArchives(data);
        console.log(data);
      });
    console.log(archives);
  };

  const columns = [
    {
      headerName: "Archive ID",
      field: "archiveId",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Storage Location",
      field: "whereStored",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Documents Contained",
      field: "whatDocuments",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Handling Date",
      field: "whenHandled",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Company",
      field: "company.companyName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "EDIT",
      field: "archiveId",
      cellRendererFramework: (params) => (
        <a href={`https://archivemap.herokuapp.com/update/${params.value}`}>Edit</a>
      ),
    },
  ];

  if (archives.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div
        className="ag-theme-material"
        style={{ height: "700px", width: "90%", margin: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          columnDefs={columns}
          rowSelection="single"
          onGridReady={(params) => {
            gridRef.current = params.api;
          }}
          rowData={archives}
        ></AgGridReact>
      </div>
      <Button variant="outlined" color="primary" href="https://archivemap.herokuapp.com/archives/add">Add new record</Button>
    </div>
  );
}
export default ArchiveList;

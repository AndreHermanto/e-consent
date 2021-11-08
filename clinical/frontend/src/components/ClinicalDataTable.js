import React, { useEffect, useState } from "react";

import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const tableColumns = [
  { field: "familyName", headerName: "Family Name", flex: 1 },
  { field: "givenName", headerName: "Given Name", flex: 1 },
  { field: "sex", headerName: "Sex", flex: 1 },
  { field: "dateOfBirth", headerName: "Date of Birth", flex: 1 },
  { field: "address", headerName: "Address", flex: 1 },
  {
    field: "consentSampleOnescreen",
    headerName: "Consent for OneScreen",
    flex: 1
  },
  { field: "consentSampleTesting", headerName: "Consent for testing", flex: 1 },
  { field: "consentSampleStorage", headerName: "Consent for storage", flex: 1 }
];

export default function ClinicalDataTable(props) {
  const classes = useStyles();
  const [height, setHeight] = useState(window.innerHeight);

  const { clinicalData, updateSelectedRows } = props;

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
  });

  const setSelectedRows = (selection) => {
    let newSelection = [];
    selection.selectionModel.forEach((rowId) => {
      clinicalData.forEach((person) => {
        if (person.id === parseInt(rowId)) {
          newSelection.push(person);
        }
      });
    });
    updateSelectedRows(newSelection);
  };

  return (
    <div
      style={{
        position: "relative",
        top: "50px",
        height: height - 100,
        width: "100%"
      }}
      className={classes.content}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={clinicalData}
            columns={tableColumns}
            checkboxSelection
            autoPageSize
            showToolbar
            density="compact"
            onSelectionModelChange={setSelectedRows}
          />
        </div>
      </div>
    </div>
  );
}

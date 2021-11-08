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
  { field: "familyNameInitials", headerName: "Family Name Initials", flex: 1 },
  { field: "givenNameInitials", headerName: "Given Name Initials", flex: 1 },
  { field: "sex", headerName: "Sex", flex: 1 },
  { field: "yearOfBirth", headerName: "Date of Birth", flex: 1 },
  { field: "clinId", headerName: "Clinical ID", flex: 1 },
  { field: "sampleId", headerName: "Sample ID", flex: 1 }
];

export default function GeneTrusteeDataTable(props) {
  const classes = useStyles();
  const [height, setHeight] = useState(window.innerHeight);

  const { geneTrusteeData, updateSelectedRows } = props;

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
  });

  const setSelectedRows = (selection) => {
    let newSelection = [];
    selection.selectionModel.forEach((rowId) => {
      geneTrusteeData.forEach((person) => {
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
            rows={geneTrusteeData}
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

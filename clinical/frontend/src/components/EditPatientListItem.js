import React, { useEffect, useState } from "react";

import EditIcon from "@material-ui/icons/Edit";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PatientDialog from "../components/PatientDialog";

export default function EditPatientListItem(props) {
  const { updateTable, selectedRows, accessToken } = props;
  const [validSelection, setValidSelection] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedRows.length === 1) {
      setSelectedPatient(selectedRows[0]);
      setValidSelection(true);
    } else {
      setSelectedPatient({});
      setValidSelection(false);
    }
  }, [selectedRows]);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItem
        divider
        button
        key={1}
        onClick={handleDialogOpen}
        disabled={!validSelection}
      >
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary={"Edit selected"} />
      </ListItem>
      <PatientDialog
        isOpen={open}
        initialState={selectedPatient}
        handleClose={handleDialogClose}
        updateTable={updateTable}
        accessToken={accessToken}
      />
    </>
  );
}

import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PatientDialog from "../components/PatientDialog";

export default function AddPatientListItem(props) {
  const { updateTable, accessToken } = props;
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItem divider button key={1} onClick={handleDialogOpen}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary={"Add new"} />
      </ListItem>
      <PatientDialog
        isOpen={open}
        handleClose={handleDialogClose}
        initialState={{}}
        updateTable={updateTable}
        accessToken={accessToken}
      />
    </>
  );
}

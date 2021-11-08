import React, { useEffect, useState } from "react";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";

export default function DeletePatientListItem(props) {
  const { selectedRows, updateTable, updateSelectedRows, accessToken } = props;
  const [validSelection, setValidSelection] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState([]);

  useEffect(() => {
    if (selectedRows.length > 0) {
      setSelectedPatients(selectedRows);
      setValidSelection(true);
    } else {
      setSelectedPatients([]);
      setValidSelection(false);
    }
  }, [selectedRows]);

  const deletePatients = () => {
    const config = { headers: { Authorization: "Bearer " + accessToken } };
    var deletions = [];
    selectedPatients.forEach((patient) => {
      var deletion = axios.delete(
        process.env.REACT_APP_API + "/" + patient.clinId,
        config
      );
      deletions.push(deletion);
    });
    Promise.allSettled(deletions).then(() => {
      updateTable();
      updateSelectedRows([]);
    });
  };

  return (
    <ListItem
      divider
      button
      key={2}
      onClick={deletePatients}
      disabled={!validSelection}
    >
      <ListItemIcon>
        <DeleteForeverIcon />
      </ListItemIcon>
      <ListItemText primary={"Delete selection"} />
    </ListItem>
  );
}

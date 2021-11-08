import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

import { CSVLink } from "react-csv";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

export default function DownloadCSVListItem(props) {
  const csvButton = useRef(null);
  const { selectedRows } = props;
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

  return (
    <>
      <ListItem
        divider
        button
        key={3}
        onClick={() => csvButton.current.link.click()}
        disabled={!validSelection}
      >
        <ListItemIcon>
          <SaveAltIcon />
        </ListItemIcon>
        <ListItemText primary={"Export selection"} />
      </ListItem>
      <CSVLink
        data={selectedPatients ? selectedPatients : []}
        hidden
        ref={csvButton}
      />
    </>
  );
}

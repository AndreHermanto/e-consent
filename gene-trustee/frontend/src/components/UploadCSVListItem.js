import React, { useState } from "react";

import { DropzoneDialog } from "material-ui-dropzone";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PublishIcon from "@material-ui/icons/Publish";
import axios from "axios";
import download from "downloadjs";

export default function UploadCSVListItem(props) {
  const { accessToken } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadCSV = (files) => {
    let formData = new FormData();
    formData.append("file", files[0]);
    console.log(formData);
    axios
      .post(process.env.REACT_APP_API + "/csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Auhorization: `Bearer ${accessToken}`
        }
      })
      .then((res) => {
        console.log("SUCCESS");
        console.log(res);
        download(res.data, "result.csv", "text/csv");
        setOpen(false);
      })
      .catch((err) => {
        console.log("FAIL");
        console.log(err);
      });
    console.log(files);
  };

  return (
    <>
      <ListItem divider button key={3} onClick={handleOpen}>
        <ListItemIcon>
          <PublishIcon />
        </ListItemIcon>
        <ListItemText primary={"Upload CSV"} />
      </ListItem>
      <DropzoneDialog
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        filesLimit={1}
        maxFileSize={5000000}
        open={open}
        onClose={handleClose}
        onSave={uploadCSV}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </>
  );
}

import React, { useEffect, useState } from "react";

import AddPatientListItem from "../components/AddPatientListItem";
import DeletePatientListItem from "../components/DeletePatientListItem";
import EditPatientListItem from "../components/EditPatientListItem";
import GeneTrusteeDataTable from "../components/GeneTrusteeDataTable";
import ManagementDrawer from "../components/ManagementDrawer";
import UploadCSVListItem from "../components/UploadCSVListItem";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  }
}));

export default function GeneTrustee() {
  const classes = useStyles();

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [geneTrusteeData, setGeneTrusteeData] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [updateCheck, setUpdateCheck] = useState(0);

  useEffect(() => {
    const getGeneTrusteeData = async () => {
      try {
        const aT = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE
        });

        setAccessToken(aT);
        const response = await fetch(process.env.REACT_APP_API, {
          headers: {
            Authorization: `Bearer ${aT}`
          }
        });

        const responseData = await response.json();
        setGeneTrusteeData(responseData.patients);
      } catch (e) {
        console.log(e);
      }
    };
    if (isAuthenticated) getGeneTrusteeData();
  }, [isAuthenticated, updateCheck, getAccessTokenSilently]);

  const updateSelectedRows = (rows) => {
    setSelectedRows(rows);
  };

  const updateTable = () => {
    updateCheck === 1 ? setUpdateCheck(0) : setUpdateCheck(1);
  };

  return (
    isAuthenticated && (
      <div className={classes.root}>
        <ManagementDrawer>
          <AddPatientListItem
            updateTable={updateTable}
            accessToken={accessToken}
          />
          <EditPatientListItem
            selectedRows={selectedRows}
            updateTable={updateTable}
            accessToken={accessToken}
          />
          <DeletePatientListItem
            selectedRows={selectedRows}
            updateTable={updateTable}
            updateSelectedRows={updateSelectedRows}
            accessToken={accessToken}
          />
          <UploadCSVListItem accessToken={accessToken} />
        </ManagementDrawer>
        <GeneTrusteeDataTable
          updateSelectedRows={updateSelectedRows}
          geneTrusteeData={geneTrusteeData ? geneTrusteeData : []}
        />
      </div>
    )
  );
}

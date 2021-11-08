import React, { useEffect, useState } from "react";

import AddPatientListItem from "../components/AddPatientListItem";
import ClinicalDataTable from "../components/ClinicalDataTable";
import DeletePatientListItem from "../components/DeletePatientListItem";
import DownloadCSVListItem from "../components/DownloadCSVListItem";
import EditPatientListItem from "../components/EditPatientListItem";
import ManagementDrawer from "../components/ManagementDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  }
}));

export default function Clinical() {
  const classes = useStyles();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [clinicalData, setClinicalData] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [updateCheck, setUpdateCheck] = useState(0);

  useEffect(() => {
    const getClinicalData = async () => {
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

        setClinicalData(responseData.patients);
      } catch (e) {
        console.log(e);
      }
    };
    if (isAuthenticated) getClinicalData();
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
          <DownloadCSVListItem selectedRows={selectedRows} />
        </ManagementDrawer>
        <ClinicalDataTable
          updateSelectedRows={updateSelectedRows}
          clinicalData={clinicalData ? clinicalData : []}
        />
      </div>
    )
  );
}

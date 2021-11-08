import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { Grid } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function PatientDialog(props) {
  const classes = useStyles();
  const { isOpen, handleClose, initialState, updateTable, accessToken } = props;
  const [type, setType] = useState({ add: true, edit: false });
  const [state, setState] = useState({});

  const emptyState = {
    familyName: "",
    givenName: "",
    dateOfBirth: "",
    sex: "",
    email: "",
    number: "",
    address: "",
    clinId: "",
    consentSampleTesting: false,
    consentSampleOnescreen: false,
    consentSampleStorage: false
  };

  useEffect(() => {
    if (
      typeof initialState !== "undefined" &&
      Object.keys(initialState).length !== 0
    ) {
      setState(initialState);
      setType({ add: false, edit: true });
    } else {
      setState(emptyState);
      setType({ add: true, edit: false });
    }
  }, [initialState]);

  const handleFormChange = (event) => {
    event.target.type === "checkbox"
      ? setState({ ...state, [event.target.name]: event.target.checked })
      : setState({ ...state, [event.target.name]: event.target.value });
  };

  const handlePatientAdd = (body) => {
    const headers = { headers: { Authorization: "Bearer " + accessToken } };
    axios.post(process.env.REACT_APP_API, body, headers).then((res) => {
      updateTable();
      handleClose();
    });
  };

  const handlePatientEdit = (body) => {
    const headers = { headers: { Authorization: "Bearer " + accessToken } };
    axios.put(process.env.REACT_APP_API, body, headers).then((res) => {
      updateTable();
      handleClose();
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (type.add) {
      handlePatientAdd(state);
    } else if (type.edit) {
      handlePatientEdit(state);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Add patient</DialogTitle>
      <form>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={3} sm={3}>
              <TextField
                name="familyName"
                label="Surname"
                value={state.familyName}
                onChange={handleFormChange}
                className={classes.formControl}
              />
            </Grid>
            <Grid item xs={3} sm={3}>
              <TextField
                name="givenName"
                label="Given name(s)"
                value={state.givenName}
                onChange={handleFormChange}
                className={classes.formControl}
              />
            </Grid>
            <Grid item xs={3} sm={3}>
              <TextField
                name="dateOfBirth"
                label="Date of Birth"
                helperText="YYYY-MM-DD"
                value={state.dateOfBirth}
                onChange={handleFormChange}
                className={classes.formControl}
              />
            </Grid>
            <Grid item xs={3} sm={3}>
              <FormControl className={classes.formControl}>
                <InputLabel id="sex-label">Sex</InputLabel>
                <Select
                  name="sex"
                  labelId="sex-label"
                  value={state.sex}
                  onChange={handleFormChange}
                  onChange={handleFormChange}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3} sm={3}>
              <TextField
                name="email"
                label="Email"
                type="email"
                value={state.email}
                onChange={handleFormChange}
                className={classes.formControl}
              />
            </Grid>
            <Grid item xs={3} sm={3}>
              <TextField
                name="number"
                label="Phone number"
                type="tel"
                value={state.number}
                onChange={handleFormChange}
                className={classes.formControl}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                name="address"
                label="Address"
                value={state.address}
                onChange={handleFormChange}
                className={classes.formControl}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="clinId"
                label="Clinical ID"
                value={state.clinId}
                onChange={handleFormChange}
                className={classes.formControl}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="consentSampleTesting"
                      checked={state.consentSampleTesting}
                      onChange={handleFormChange}
                    />
                  }
                  label="Consent for gene testing."
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="consentSampleOnescreen"
                      checked={state.consentSampleOnescreen}
                      onChange={handleFormChange}
                    />
                  }
                  label="Consent for sharing with Garvan and OneScreen."
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="consentSampleStorage"
                      onChange={handleFormChange}
                      checked={state.consentSampleStorage}
                    />
                  }
                  label="Consent for storage and future research."
                />
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

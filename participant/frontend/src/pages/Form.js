import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from "@date-io/date-fns";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import QrReader from "react-qr-reader";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import differenceInYears from "date-fns/differenceInYears";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  }
}));

export default function Form(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    familyName: "",
    givenName: "",
    dateOfBirth: new Date(),
    sex: "",
    email: "",
    number: "",
    address: "",
    collector: "",
    nswhpId: "",
    kccgId: "",
    NSWHPGeneTesting: false,
    NSWHPOneScreen: false,
    NSWHPSampleStorage: false,
    KCCGSampleCollecton: false,
    KCCGOneScreen: false,
    KCCGSampleStorage: false,
    nswhpScan: false,
    kccgScan: false,
    isOpen: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleChangeChecked = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeDate = (date) => {
    setState({ ...state, dateOfBirth: date });
  };

  const handleDateAccept = (date) => {
    if (differenceInYears(new Date(), date) < 16) {
      setState({ ...state, isOpen: true });
    }
  };

  const handleClick = () => {
    setState({ ...state, isOpen: false });
  };

  const handleKCCGScan = (scan) => {
    if (scan) {
      setState({ ...state, kccgId: scan, kccgScan: false });
    }
  };

  const handleNSWHPScan = (scan) => {
    if (scan) {
      setState({ ...state, nswhpId: scan, nswhpScan: false });
    }
  };

  const handleError = (event) => {
    console.log(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.submit(state);
  };

  const initNSWHPScan = () => {
    setState({ ...state, nswhpScan: true });
  };

  const initKCCGScan = () => {
    setState({ ...state, kccgScan: true });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="h1">
            Section 1: New South Wales Health Pathology (NSWHP) (for Clinical
            Testing)
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <TextField
                name="familyName"
                label="Surname"
                value={state.familyName}
                onChange={handleChange}
                className={classes.formControl}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="givenName"
                label="Given name(s)"
                value={state.givenName}
                onChange={handleChange}
                className={classes.formControl}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  name="dateOfBirth"
                  label="Date of Birth"
                  format="dd/MM/yyyy"
                  openTo="year"
                  value={state.dateOfBirth}
                  onChange={handleChangeDate}
                  onAccept={handleDateAccept}
                  className={classes.formControl}
                  required
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Dialog open={state.isOpen}>
              <DialogTitle>Wait!</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please hand this tablet and your parental consent form to the
                  Collector.
                </DialogContentText>
                <TextField
                  name="collector"
                  label="Consent sighted by..."
                  value={state.collector}
                  onChange={handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={!state.collector}
                  onClick={handleClick}
                >
                  Accept
                </Button>
              </DialogActions>
            </Dialog>
            <Grid item xs={12} sm={3}>
              <FormControl className={classes.formControl}>
                <InputLabel id="sex-label">Sex</InputLabel>
                <Select
                  name="sex"
                  labelId="sex-label"
                  value={state.sex}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="email"
                label="Your non-school email"
                type="email"
                value={state.email}
                onChange={handleChange}
                className={classes.formControl}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="number"
                label="Your phone number"
                type="tel"
                value={state.number}
                onChange={handleChange}
                className={classes.formControl}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address"
                label="Your address"
                value={state.address}
                onChange={handleChange}
                className={classes.formControl}
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Typography variant="h6" component="h1">
            Section 2: Consent Form - NSWHP (for Clinical Testing)
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="NSWHPGeneTesting"
                      checked={state.NSWHPGeneTesting}
                      onChange={handleChangeChecked}
                    />
                  }
                  label="Testing of the genes involved in cystic fibrosis, Tay-Sachs
              disease, Canavan disease, Fanconi anaemia, familial dysautonomia,
              Niemann-Pick disease, Bloom syndrome, mucolipidosis type 4 and
              glycogen storage disease 1a."
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="NSWHPOneScreen"
                      checked={state.NSWHPOneScreen}
                      onChange={handleChangeChecked}
                    />
                  }
                  label="My sample being shared with Garvan and used in the OneScreen
                  Community Genomics study."
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="NSWHPSampleStorage"
                      checked={state.NSWHPSampleStorage}
                      onChange={handleChangeChecked}
                    />
                  }
                  label="Storage of my sample by NSW Health Pathology after testing is
                  completed for further research use. (If I do not consent for my
                  sample to be stored it will be discarded after testing is
                  completed, according to regulatory requirements)"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Typography variant="h6" component="h1">
            Section 3: Consent Form - Garvan Institute of Medical Research (for
            Onescreen study)
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="KCCGSampleCollecton"
                      checked={state.KCCGSampleCollecton}
                      onChange={handleChangeChecked}
                    />
                  }
                  label="Garvan collecting a cheek/mouth swab from me, taking out the DNA
                  and transferring a portion of my DNA to NSWHP for clinical testing
                  of up to nine genes (that I have consented to in Section 2)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="KCCGOneScreen"
                      checked={state.KCCGOneScreen}
                      onChange={handleChangeChecked}
                    />
                  }
                  label="Participation in the OneScreen program (Genetic testing for use in
                    research)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="KCCGSampleStorage"
                      checked={state.KCCGSampleStorage}
                      onChange={handleChangeChecked}
                    />
                  }
                  label="Storage of my sample by the Garvan Institute of Medical Research
                  for further research. (If I do not consent for my sample to be
                  stored it will be discarded after testing is completed, according
                  to regulatory requirements)"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <Typography variant="h6" component="h1">
            Section 4: Collector Use Only
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={initNSWHPScan}
                fullWidth
              >
                Scan NSWHP ID
              </Button>
            </Grid>
            {(() => {
              if (state.nswhpScan) {
                return (
                  <Grid item xs={12} sm={12}>
                    <QrReader onScan={handleNSWHPScan} onError={handleError} />
                  </Grid>
                );
              }
            })()}
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={initKCCGScan}
                fullWidth
              >
                Scan KCCG ID
              </Button>
            </Grid>
            {(() => {
              if (state.kccgScan) {
                return (
                  <Grid item xs={12} sm={12}>
                    <QrReader onScan={handleKCCGScan} onError={handleError} />
                  </Grid>
                );
              }
            })()}
            <Grid item xs={12} sm={6}>
              <TextField
                value={state.nswhpId ? state.nswhpId : "NSWHP ID"}
                disabled
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={state.kccgId ? state.kccgId : "KCCG ID"}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                fullWidth
                disabled={!(state.kccgId && state.nswhpId)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
}

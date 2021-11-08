const { response } = require("express");
var express = require("express");
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
var db = require("../models");
var router = express.Router();
var fs = require("fs");

const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: ["RS256"]
});

/** 
* @api {get} /participants Get patients
* @apiName GetAllPatients
* @apiGroup Backend
* @apiDescription Get all patients
*
* @apiHeader {String} Authorization JWT "Bearer: <token>"
* 
* @apiSuccess {Object} patients - root of object
* @apiSuccess {Object[]} patients.patients - array of patient objects
*/
router.get(
  "/participants",
  checkJwt,
  jwtAuthz(["read:users"]),
  function (req, res, next) {
    db.Patient.findAll()
      .then((patients) => res.send({ patients: patients }))
      .catch((err) => {
        console.log(
          "There was an error querying patients",
          JSON.stringify(err)
        );
        return res.send(err);
      });
  }
);

/**
* @api {post} /participants/search Patient search
* @apiName GetPatient
* @apiGroup Backend
* @apiDescription Search for a specific patient either by clinical ID or by details
* 
* @apiParam {String} search                 Either "clinId", "sampleId", or "details", 
*                                           based on which you wish to search by.
*                                           If set to "clinId", provide a clinId field.
*                                           If set to "sampleId", provide a sampleId field.
*                                           If set to "details", provide a familyNameInitials, 
*                                           givenNameInitials and yearOfBirth field.
* 
* @apiParam {String} [clinId]               If search is clinId, specifiy the clinical ID to search by
* @apiParam {String} [sampleId]             If search is sampleId, specifiy the sample ID to search by
* @apiParam {string} [familyNameInitials]   If search is details, specify the familyName to search by
* @apiParam {string} [givenNameInitials]    If search is details, specify the givenName to search by
* @apiParam {String} [yearOfBirth]          If search is details, specify the dateOfBirth to search by
* 
* @apiHeader {String} Authorization JWT "Bearer: <token>"
* 
* @apiSuccess {Object} patient - root of object
* @apiSuccess {Object} patient.patient - the patient
*/
router.post(
  "/participants/search",
  checkJwt,
  jwtAuthz(["read:user"]),
  function (req, res, next) {
    const { search } = req.body;
    // search for patient based on the given information
    switch (search) {
      case "clinId":
        const { clinId } = req.body;
        if (!clinId) {
          return res.status(400).json({ error: "clinId required" });
        }
        db.Patient.findOne({ where: { clinId: clinId } })
          .then((patient) => {
            if (patient === null) {
              return res.sendStatus(404);
            }
            return res.send({ patient: patient });
          })
          .catch((err) => {
            console.log(
              "There was an error finding the patient",
              JSON.stringify(err)
            );
            return res.send(err);
          });
        break;

      case "sampleId":
        const { sampleId } = req.body;
        if (!sampleId) {
          return res.status(400).json({ error: "sampleId required" });
        }
        db.Patient.findOne({ where: { sampleId: sampleId } })
          .then((patient) => {
            if (patient === null) {
              return res.sendStatus(404);
            }
            return res.send({ patient: patient });
          })
          .catch((err) => {
            console.log(
              "There was an error finding the patient",
              JSON.stringify(err)
            );
            return res.send(err);
          });
        break;

      case "details":
        const { familyNameInitials, givenNameInitials, yearOfBirth } = req.body;
        if (!(familyNameInitials && givenNameInitials && yearOfBirth)) {
          return res.status(400).json({ error: "Bad request" });
        }
        db.Patient.findOne({
          where: {
            familyNameInitials: familyNameInitials,
            givenNameInitials: givenNameInitials,
            yearOfBirth: yearOfBirth
          }
        })
          .then((patient) => {
            if (patient === null) {
              return res.sendStatus(404);
            }
            return res.send({ patient: patient });
          })
          .catch((err) => {
            console.log(
              "There was an error finding the patient",
              JSON.stringify(err)
            );
            return res.send(err);
          });
        break;

      default:
        return res.status(400).json({
          error: "Expected search param of clinId, sampleId or details"
        });
    }
  }
);

/**
* @api {post} /participants Create patient
* @apiName CreatePatient
* @apiGroup Backend
* @apiDescription Create a patient
* 
* @apiParam {String} clinId                       Patient's clinical ID
* @apiParam {String} sampleId                     Patient's sample ID
* @apiParam {string} familyNameInitials           Patient's family name initials
* @apiParam {string} givenNameInitials            Patient's given name initials
* @apiParam {string} sex                          Patient's sex
* @apiParam {String} yearOfBirth                  Patient's year of birth
* 
* @apiHeader {String} Authorization JWT "Bearer: <token>"
* 
* @apiSuccess {Object} patient - root of object
* @apiSuccess {Object} patient.patient - the patient created
*/
router.post(
  "/participants",
  checkJwt,
  jwtAuthz(["create:users"]),
  function (req, res, next) {
    const {
      clinId,
      sampleId,
      familyNameInitials,
      givenNameInitials,
      yearOfBirth,
      sex
    } = req.body;

    db.Patient.create({
      clinId,
      sampleId,
      familyNameInitials,
      givenNameInitials,
      yearOfBirth,
      sex
    })
      .then((patient) => {
        return res.status(201).send({ patient: patient });
      })
      .catch((err) => {
        console.log(
          "There was an error creating the patient",
          JSON.stringify(err)
        );
        return res.send(err);
      });
  }
);

/**
* @api {put} /participants Update patient
* @apiName UpdatePatient
* @apiGroup Backend
* @apiDescription Update a patient

* @apiParam {String} clinId                         Patient's clinical ID to update
* @apiParam {String} [sampleId]                     Patient's new sample ID
* @apiParam {string} [familyNameInitials]           Patient's new family name initials
* @apiParam {string} [givenNameInitials]            Patient's new given name initials
* @apiParam {string} [sex]                          Patient's new sex
* @apiParam {String} [yearOfBirth]                  Patient's new year of birth
* 
* @apiHeader {String} Authorization JWT "Bearer: <token>"
* 
* @apiSuccess {Object} patient - root of object
* @apiSuccess {Object} patient.patient - the patient updated
*/
router.put(
  "/participants",
  checkJwt,
  jwtAuthz(["update:users"]),
  function (req, res, next) {
    db.Patient.findOne({
      where: {
        clinId: req.body.clinId
      }
    }).then((patient) => {
      if (patient === null) {
        return res.sendStatus(404);
      }

      for (const [key, value] of Object.entries(patient.dataValues)) {
        if (key !== "id") {
          patient[key] = req.body[key];
        }
      }
      patient.save().then((patient) => {
        return res.send({ patient: patient });
      });
    });
  }
);

/**
* @api {delete} /participants Delete patient
* @apiName DeletePatient
* @apiGroup Backend
* @apiDescription Delete a patient
* 
* @apiParam {String} clinId  Patient's clinical ID to delete
* 
* @apiHeader {String} Authorization JWT "Bearer: <token>"
* 
* @apiSuccess 204
*/
router.delete(
  "/participants/:clinId",
  checkJwt,
  jwtAuthz(["delete:users"]),
  function (req, res, next) {
    db.Patient.findOne({
      where: {
        clinId: req.params.clinId
      }
    }).then((patient) => {
      if (patient === null) {
        return res.sendStatus(404);
      }

      patient.destroy().then(() => {
        return res.sendStatus(204);
      });
    });
  }
);

/**
* @api {post} /participants CSV Search
* @apiName CSVSearch
* @apiGroup Backend
* @apiDescription Search for patients by CSV file, returning a CSV with sampleIDs appended 
* 
* @apiParam {File} file a CSV file where the 4th value is clinical ID
* 
* @apiHeader {String} Authorization JWT "Bearer: <token>"
* 
* @apiSuccess {File} a CSV file with sample IDs appended to each line
*/
router.post(
  "/participants/csv",
  checkJwt,
  jwtAuthz(["read:users"]),
  function (req, res, next) {
    // setup
    var toWrite = [];
    var dbLookups = [];

    // accept file
    if (typeof req.files === "undefined") {
      return res.send(400);
    }
    var fileLines = req.files.file.data.toString("utf-8").split("\n");
    fileLines.splice(0, 1);

    // delete response file if already existing
    fs.unlink("./res.csv", function (err) {
      if (err) console.log(err);
    });

    // for every line, add db lookup promise
    fileLines.forEach((line) => {
      tokens = line.split(",");
      clinId = "";

      tokens[3].startsWith('"')
        ? (clinId = tokens[1].slice(1, tokens[1].length - 1))
        : (clinId = tokens[1]);
      dbLookups.push(db.Patient.findOne({ where: { clinId: clinId } }));
    });

    // when all db lookups are resolved, execute
    Promise.allSettled(dbLookups).then((results) => {
      results.forEach((result) => {
        if (result.status === "fulfilled" && result.value !== null) {
          const { clinId, sampleId } = result.value.dataValues;

          fileLines.forEach((line) => {
            tokens = line.split(",");
            origClinId = tokens[1];
            if (origClinId.includes(clinId)) {
              toWrite.push(line + "," + sampleId + "\n");
            }
          });
        } else {
          toWrite.push("ERR\n");
        }
      });

      // write data and send
      toWrite.forEach((line) => {
        fs.appendFileSync("./res.csv", line, function (err) {
          if (err) console.log(err);
        });
      });
      return res.sendFile(
        process.env.ROOT + "/e-consent/gene-trustee/backend/res.csv"
      );
    });
  }
);

module.exports = router;

var express = require("express");
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
var db = require("../models");

var router = express.Router();

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
* @apiParam {String} search         Either "clinId" or "details", 
*                                  based on which you wish to search by.
*                                  If set to "clinId", provide a clinId field.
*                                  If set to "details", provide a familyName, givenName and dateOfBirth field.
* 
* @apiParam {String} [clinId]       If search is clinId, specifiy the clinical ID to search by
* @apiParam {string} [familyName]   If search is details, specify the familyName to search by
* @apiParam {string} [givenName]    If search is details, specify the givenName to search by
* @apiParam {String} [dateOfBirth]  If search is details, specify the dateOfBirth to search by
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

    switch (search) {
      case "clinId":
        const { clinId } = req.body;
        db.Patient.findOne({
          where: { clinId: clinId }
        })
          .then((patient) => {
            if (patient === null) {
              return res.sendStatus(404);
            }
            return res.send({ patient: patient });
          })
          .catch((err) => {
            console.log(
              "There was an error querying patient",
              JSON.stringify(err)
            );
            return res.send(err);
          });
        break;

      case "details":
        const { familyName, givenName, dateOfBirth } = req.body;
        db.Patient.findOne({
          where: {
            familyName: familyName,
            givenName: givenName,
            dateOfBirth: dateOfBirth
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
              "There was an error querying patient",
              JSON.stringify(err)
            );
            return res.send(err);
          });
        break;

      default:
        return res
          .status(400)
          .json({ error: "One of clinId or details required" });
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
* @apiParam {string} familyName                   Patient's family name
* @apiParam {string} givenName                    Patient's given name
* @apiParam {string} sex                          Patient's sex
* @apiParam {String} dateOfBirth                  Patient's date of birth
* @apiParam {String} number                       Patient's phone number
* @apiParam {String} email                        Patient's email
* @apiParam {String} address                      Patient's address
* @apiParam {Boolean} consentSampleOnescreen      Patient's consent to Onescreen studies
* @apiParam {Boolean} consentSampleTesting        Patient's consent to testing of genes
* @apiParam {Boolean} consentSampleStorage        Patient's consent to storage of sample
* 
* @apiHeader {String} Authorization JWT "Bearer: <token>"
* 
* @apiSuccess {Object} patient - root of object
* @apiSuccess {Object} patient.patient - the patient created
*/
router.post(
  "/participants",
  checkJwt,
  jwtAuthz(["create:user"]),
  function (req, res, next) {
    const {
      clinId,
      familyName,
      givenName,
      sex,
      dateOfBirth,
      number,
      email,
      address,
      consentSampleOnescreen,
      consentSampleTesting,
      consentSampleStorage
    } = req.body;

    db.Patient.create({
      clinId,
      familyName,
      givenName,
      sex,
      dateOfBirth,
      number,
      email,
      address,
      consentSampleOnescreen,
      consentSampleTesting,
      consentSampleStorage
    })
      .then((patient) => {
        return res.status(201).send({ patient: patient });
      })
      .catch((err) => {
        console.log(
          "There was an error creating a patient",
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
* 
* @apiParam {String} clinId                         Patient's clinical ID to update.
* @apiParam {string} [familyName]                   Patient's new family name
* @apiParam {string} [givenName]                    Patient's new given name
* @apiParam {string} [sex]                          Patient's new sex
* @apiParam {String} [dateOfBirth]                  Patient's new date of birth
* @apiParam {String} [number]                       Patient's new phone number
* @apiParam {String} [email]                        Patient's new email
* @apiParam {String} [address]                      Patient's new address
* @apiParam {Boolean} [consentSampleOnescreen]      Patient's new consent to Onescreen studies
* @apiParam {Boolean} [consentSampleTesting]        Patient's new consent to testing of genes
* @apiParam {Boolean} [consentSampleStorage]        Patient's new consent to storage of sample
* 
* @apiHeader {String} Authorization JWT "Bearer: <token>"
* 
* @apiSuccess {Object} patient - root of object
* @apiSuccess {Object} patient.patient - the patient created
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
  jwtAuthz(["delete:user"]),
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
module.exports = router;

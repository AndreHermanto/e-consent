var express = require("express");
var router = express.Router();
var axios = require("axios");

const geneTrustees = {
  wolper: process.env.GENETRUSTEE_ADDR
};
const clinicals = {
  nswhp: process.env.CLINICAL_ADDR
};

router.post("/", function (req, res, next) {
  /* process data */
  const geneTrustee = geneTrustees[req.body.geneTrustee];
  const clinical = clinicals[req.body.clinical];
  const participantData = {
    familyName: req.body.participant.familyName,
    givenName: req.body.participant.givenName,
    dateOfBirth: req.body.participant.dateOfBirth
      ? req.body.participant.dateOfBirth.split("T")[0]
      : undefined,
    sex: req.body.participant.sex,
    email: req.body.participant.email,
    number: req.body.participant.number,
    address: req.body.participant.address,
    clinId: req.body.participant.nswhpId,
    consentSampleStorage: req.body.participant.NSWHPSampleStorage,
    consentSampleTesting: req.body.participant.NSWHPGeneTesting,
    consentSampleOnescreen: req.body.participant.NSWHPOneScreen
  };

  /* validate data */
  // ensure all objects have a value
  for (const [object, value] of Object.entries(participantData)) {
    if (typeof value === "undefined") {
      return res.status(400).send({ error: `Missing ${object}` });
    }
  }

  /* process data */
  const geneTrusteeData = {
    givenNameInitials: participantData.givenName.slice(0, 2),
    familyNameInitials: participantData.familyName.slice(0, 2),
    sex: participantData.sex,
    yearOfBirth: participantData.dateOfBirth.slice(0, 4),
    clinId: participantData.clinId,
    sampleId: req.body.participant.kccgId
  };

  /* validate data */
  // ensure all objects have a value
  for (const [object, value] of Object.entries(geneTrusteeData)) {
    if (!value) {
      return res.status(400).send({ error: `Missing ${object}` });
    }
  }

  // ensure URLs have a value
  if (typeof geneTrustee === "undefined") {
    return res.status(400).send({ error: "Missing valid GeneTrustee" });
  }

  if (typeof clinical === "undefined") {
    return res.status(400).send({ error: "Missing valid Clinical" });
  }

  // request tokens and send data
  const gtReq = axios
    .post(process.env.AUTH0_DOMAIN + "oauth/token", {
      client_id: process.env.AUTH0_GT_ID,
      client_secret: process.env.AUTH0_GT_SECRET,
      audience: process.env.AUTH0_GT_AUDIENCE,
      grant_type: "client_credentials"
    })
    .then((res) => {
      var token = res.data.access_token;
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      return axios.post(geneTrustee + "/participants", geneTrusteeData, config);
    });
  console.log(geneTrustee);
  console.log(clinical);
  const clinReq = axios
    .post(process.env.AUTH0_DOMAIN + "oauth/token", {
      client_id: process.env.AUTH0_CLIN_ID,
      client_secret: process.env.AUTH0_CLIN_SECRET,
      audience: process.env.AUTH0_CLIN_AUDIENCE,
      grant_type: "client_credentials"
    })
    .then((res) => {
      var token = res.data.access_token;
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      return axios.post(clinical + "/participants", participantData, config);
    })
    .catch((err) => console.log(err));

  // process success or fail
  Promise.all([gtReq, clinReq])
    .then(() => {
      return res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error.toString());
      return res.status(500).send({ error: error.toString() });
    });
});
module.exports = router;

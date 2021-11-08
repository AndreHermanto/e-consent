/**
 * @jest-environment node
 */

const request = require("supertest");
const app = require("../app.js");
const axios = require("axios");

var patientData = {
  participant: {
    familyName: "Smith",
    givenName: "John",
    dateOfBirth: "2020-01-01",
    sex: "Male",
    email: "Jsmith@gmail.com",
    number: "04444444",
    address: "123 SQL Lane",
    nswhpId: "1",
    NSWHPSampleStorage: true,
    NSWHPGeneTesting: true,
    NSWHPOneScreen: true,
    kccgId: "2"
  },
  geneTrustee: "wolper",
  clinical: "nswhp"
};

beforeEach(() => {
  patientData = {
    participant: {
      familyName: "Smith",
      givenName: "John",
      dateOfBirth: "2020-01-01",
      sex: "Male",
      email: "Jsmith@gmail.com",
      number: "04444444",
      address: "123 SQL Lane",
      nswhpId: "1",
      NSWHPSampleStorage: true,
      NSWHPGeneTesting: true,
      NSWHPOneScreen: true,
      kccgId: "2"
    },
    geneTrustee: "wolper",
    clinical: "nswhp"
  };
});

afterEach(() => {
  axios
    .delete(process.env.CLINICAL_ADDR + "/participants/1", {
      headers: { Authorization: "Bearer " + process.env.AUTH0_CLIN_TOKEN }
    })
    .catch(() => {});
  axios
    .delete(process.env.GENETRUSTEE_ADDR + "/participants/1", {
      headers: {
        Authorization: "Bearer " + process.env.AUTH0_GENETRUSTEE_TOKEN
      }
    })
    .catch(() => {});
});

describe("Patient backend should...", () => {
  it("POST valid data to Clinical and GeneTrustee", async () => {
    const res = await request(app)
      .post("/participant")
      .send({ ...patientData });
    expect(res.statusCode).toEqual(201);
  });
});

describe("Patient backend should not...", () => {
  it("Accept missing GeneTrustee", async () => {
    const res = await request(app)
      .post("/participant")
      .send({ ...patientData, geneTrustee: undefined });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing valid GeneTrustee");
  });

  it("Accept invalid GeneTrustee", async () => {
    const res = await request(app)
      .post("/participant")
      .send({ ...patientData, geneTrustee: "fake genetrustee" });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing valid GeneTrustee");
  });

  it("Accept missing Clinical", async () => {
    const res = await request(app)
      .post("/participant")
      .send({ ...patientData, clinical: undefined });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing valid Clinical");
  });

  it("Accept invalid Clinical", async () => {
    const res = await request(app)
      .post("/participant")
      .send({ ...patientData, clinical: "fake clinical" });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing valid Clinical");
  });

  it("Accept missing family name", async () => {
    var missingFamilyNameData = { ...patientData };
    missingFamilyNameData.participant.familyName = undefined;
    const res = await request(app)
      .post("/participant")
      .send({ ...missingFamilyNameData });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing familyName");
  });

  it("Accept missing given name", async () => {
    var missingGivenNameData = { ...patientData };
    missingGivenNameData.participant.givenName = undefined;
    const res = await request(app)
      .post("/participant")
      .send({ ...missingGivenNameData });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing givenName");
  });

  it("Accept missing date of birth", async () => {
    var missingDOBData = { ...patientData };
    missingDOBData.participant.dateOfBirth = undefined;
    const res = await request(app)
      .post("/participant")
      .send({ ...missingDOBData });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing dateOfBirth");
  });

  it("Accept missing sex", async () => {
    var missingSexData = { ...patientData };
    missingSexData.participant.sex = undefined;
    const res = await request(app)
      .post("/participant")
      .send({ ...missingSexData });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing sex");
  });

  it("Accept missing email", async () => {
    var missingEmailData = { ...patientData };
    missingEmailData.participant.email = undefined;
    const res = await request(app)
      .post("/participant")
      .send({ ...missingEmailData });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing email");
  });

  it("Accept missing number", async () => {
    var missingNumberData = { ...patientData };
    missingNumberData.participant.number = undefined;
    const res = await request(app)
      .post("/participant")
      .send({ ...missingNumberData });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing number");
  });

  it("Accept missing address", async () => {
    var missingAddressData = { ...patientData };
    missingAddressData.participant.address = undefined;
    const res = await request(app)
      .post("/participant")
      .send({ ...missingAddressData });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing address");
  });

  it("Accept missing clinical ID", async () => {
    var missingClinIdData = { ...patientData };
    missingClinIdData.participant.nswhpId = undefined;
    const res = await request(app)
      .post("/participant")
      .send({ ...missingClinIdData });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing clinId");
  });

  it("Accept missing storage consent", async () => {
    var missingConsentSampleStorageData = { ...patientData };
    missingConsentSampleStorageData.participant.NSWHPSampleStorage = undefined;
    const res = await request(app)
      .post("/participant")
      .send({ ...missingConsentSampleStorageData });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing consentSampleStorage");
  });

  it("Accept missing testing consent", async () => {
    var missingConsentSampleTestingData = { ...patientData };
    missingConsentSampleTestingData.participant.NSWHPGeneTesting = undefined;
    const res = await request(app)
      .post("/participant")
      .send({ ...missingConsentSampleTestingData });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing consentSampleTesting");
  });

  it("Accept missing OneScreen consent", async () => {
    var missingConsentSampleOnescreenData = { ...patientData };
    missingConsentSampleOnescreenData.participant.NSWHPOneScreen = undefined;
    const res = await request(app)
      .post("/participant")
      .send({ ...missingConsentSampleOnescreenData });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing consentSampleOnescreen");
  });

  it("Accept missing sample ID", async () => {
    var missingSampleIdData = { ...patientData };
    missingSampleIdData.participant.kccgId = undefined;
    const res = await request(app)
      .post("/participant")
      .send({ ...missingSampleIdData });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch("Missing sampleId");
  });
});

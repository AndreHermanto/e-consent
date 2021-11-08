const request = require("supertest");
const app = require("../app.js");

const patientDetails = {
  clinId: "11111111NSWHP111",
  familyName: "Smith",
  givenName: "Jane",
  sex: "Female",
  dateOfBirth: "1997-12-05",
  number: "61433333333",
  email: "JaynSmith@mail.com",
  address: "123 Testing Avenue",
  consentSampleOnescreen: true,
  consentSampleTesting: true,
  consentSampleStorage: true
};

var token = "";
beforeEach(async () => {
  const res = await request(process.env.AUTH0_DOMAIN)
    .post("oauth/token")
    .set("content-type", "application/json")
    .send({
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      grant_type: "client_credentials"
    });
  token = res.body.access_token;
});

describe("Patient API should...", () => {
  it("Read all patients", async () => {
    const res = await request(app)
      .get("/participants")
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("patients");
  });

  it("Read a patient by clinical ID", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({
        search: "clinId",
        clinId: "20770101NSWHP001"
      })
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("patient");
    expect(res.body.patient.givenName).toBeDefined();
    expect(res.body.patient.givenName).toMatch("John");
  });

  it("Read a patient by details", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({
        search: "details",
        familyName: "Smith",
        givenName: "John",
        dateOfBirth: "2020-12-08"
      })
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("patient");
    expect(res.body.patient.givenName).toBeDefined();
    expect(res.body.patient.givenName).toMatch("John");
  });

  it("Create a patient", async () => {
    const res = await request(app)
      .post("/participants")
      .send({
        ...patientDetails
      })
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("patient");
    expect(res.body.patient.givenName).toBeDefined();
    expect(res.body.patient.givenName).toMatch("Jane");
  });

  it("Read the created patient", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({
        search: "clinId",
        clinId: patientDetails.clinId
      })
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("patient");
    expect(res.body.patient.givenName).toBeDefined();
    expect(res.body.patient.givenName).toMatch(patientDetails.givenName);
  });

  it("Update a patient", async () => {
    const res = await request(app)
      .put("/participants")
      .send({
        ...patientDetails,
        familyName: "Doe",
        email: "JaynDoe@mail.com"
      })
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("patient");
    expect(res.body.patient.email).toBeDefined();
    expect(res.body.patient.email).toMatch("JaynDoe@mail.com");

    const res2 = await request(app)
      .post("/participants/search")
      .send({
        search: "clinId",
        clinId: patientDetails.clinId
      })
      .set("Authorization", "Bearer " + token);

    expect(res2.statusCode).toEqual(200);
    expect(res2.body).toHaveProperty("patient");
    expect(res2.body.patient.email).toBeDefined();
    expect(res2.body.patient.email).toMatch("JaynDoe@mail.com");
  });

  it("Read the updated patient", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({
        search: "clinId",
        clinId: patientDetails.clinId
      })
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("patient");
    expect(res.body.patient.email).toBeDefined();
    expect(res.body.patient.email).toMatch("JaynDoe@mail.com");
  });

  it("Delete a patient", async () => {
    const res = await request(app)
      .delete("/participants/" + patientDetails.clinId)
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(204);
  });

  it("404 on the deleted patient by clinical ID", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({ search: "clinId", clinId: patientDetails.clinId })
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({});
  });

  it("404 on the deleted patient by details", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({ search: "details", ...patientDetails })
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({});
  });
});

describe("Patient API should not...", () => {
  it("Read a non-existent patient by clinical ID", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({
        search: "clinId",
        clinId: "20770101NSWHP000"
      })
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({});
  });

  it("Read a non-existent patient by details", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({
        search: "details",
        familyName: "Smith",
        givenName: "John",
        dateOfBirth: "2020-12-09"
      })
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({});
  });

  it("Read a patient with no search parameter", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({
        familyName: "Smith",
        givenName: "John",
        dateOfBirth: "2020-12-09"
      })
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });

  it("Update a non-existent patient", async () => {
    const res = await request(app)
      .put("/participants")
      .send({ ...patientDetails, clinId: "non-existing" })
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({});
  });

  it("Delete a non-existent patient", async () => {
    const res = await request(app)
      .delete("/participants/aaa")
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({});
  });
});

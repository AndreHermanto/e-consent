const request = require("supertest");
const app = require("../app.js");

const patientDetails = {
  clinId: "20200101NSWHP999",
  sampleId: "20200101KCCG999",
  familyNameInitials: "Pa",
  givenNameInitials: "Al",
  yearOfBirth: "2020",
  sex: "Female"
};

var token = process.env.AUTH0_M2M_TOKEN;

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

describe("GeneTrustee API should....", () => {
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
    expect(res.body.patient.givenNameInitials).toBeDefined();
    expect(res.body.patient.givenNameInitials).toMatch("Jo");
  });

  it("Read a patient by sample ID", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({
        search: "sampleId",
        sampleId: "20770101KCCG141"
      })
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("patient");
    expect(res.body.patient.givenNameInitials).toBeDefined();
    expect(res.body.patient.givenNameInitials).toMatch("Jo");
  });

  it("Read a patient by details", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({
        search: "details",
        familyNameInitials: "Sm",
        givenNameInitials: "Jo",
        yearOfBirth: "2020"
      })
      .set("Authorization", "Bearer " + token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("patient");
    expect(res.body.patient.givenNameInitials).toBeDefined();
    expect(res.body.patient.givenNameInitials).toMatch("Jo");
  });

  it("Create a patient", async () => {
    const res = await request(app)
      .post("/participants")
      .send({ ...patientDetails })
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("patient");
    expect(res.body.patient.givenNameInitials).toBeDefined();
    expect(res.body.patient.givenNameInitials).toMatch("Al");
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
    expect(res.body.patient.givenNameInitials).toBeDefined();
    expect(res.body.patient.givenNameInitials).toMatch("Al");
  });

  it("Update a patient", async () => {
    const res = await request(app)
      .put("/participants")
      .send({ ...patientDetails, givenNameInitials: "Be" })
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("patient");
    expect(res.body.patient.givenNameInitials).toBeDefined();
    expect(res.body.patient.givenNameInitials).toMatch("Be");
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
    expect(res.body.patient.givenNameInitials).toBeDefined();
    expect(res.body.patient.givenNameInitials).toMatch("Be");
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

  it("404 on the deleted patient by sample ID", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({ search: "sampleId", sampleId: patientDetails.sampleId })
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

  // This test is broken on Supertest's end
  /*  it("Associate sample ID to clinical ID from CSV", async () => {
    const res = await request(app)
      .post("/participants/csv")
      .field("Content-Type", "multipart/form-data")
      .attach(
        "file",
        process.env.ROOT + "/e-consent/gene-trustee/backend/__tests__/test.csv"
      )
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toMatch(
      "Sm,Jo,2020,20770101NSWHP001,20770101KCCG141\n" +
        "Sm,Jo,2020,20770101NSWHP001,20770101KCCG141\n"
    );
  });
  */
});

describe("GeneTrustee API should not...", () => {
  it("Read a non-existent patient by clinical ID", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({
        search: "clinId",
        clinId: "1"
      })
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({});
  });

  it("Read a non-existent patient by sample ID", async () => {
    const res = await request(app)
      .post("/participants/search")
      .send({
        search: "sampleId",
        sampleId: "1"
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
        familyNameInitials: "Aa",
        givenNameInitials: "Bb",
        yearOfBirth: "2020"
      })
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({});
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
      .delete("/participants/:aaa")
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({});
  });

  it("Accept missing CSV file", async () => {
    const res = await request(app)
      .post("/participants/csv")
      .send({ not: "a file" })
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(400);
  });
});

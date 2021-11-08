define({ "api": [
  {
    "type": "post",
    "url": "/participants",
    "title": "Create patient",
    "name": "CreatePatient",
    "group": "Backend",
    "description": "<p>Create a patient</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "clinId",
            "description": "<p>Patient's clinical ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "familyName",
            "description": "<p>Patient's family name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "givenName",
            "description": "<p>Patient's given name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "sex",
            "description": "<p>Patient's sex</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dateOfBirth",
            "description": "<p>Patient's date of birth</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "number",
            "description": "<p>Patient's phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Patient's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Patient's address</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "consentSampleOnescreen",
            "description": "<p>Patient's consent to Onescreen studies</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "consentSampleTesting",
            "description": "<p>Patient's consent to testing of genes</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "consentSampleStorage",
            "description": "<p>Patient's consent to storage of sample</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT &quot;Bearer: <token>&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "patient",
            "description": "<ul> <li>root of object</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "patient.patient",
            "description": "<ul> <li>the patient created</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/crud.js",
    "groupTitle": "Backend"
  },
  {
    "type": "delete",
    "url": "/participants",
    "title": "Delete patient",
    "name": "DeletePatient",
    "group": "Backend",
    "description": "<p>Delete a patient</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "clinId",
            "description": "<p>Patient's clinical ID to delete</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT &quot;Bearer: <token>&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "204",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/crud.js",
    "groupTitle": "Backend"
  },
  {
    "type": "get",
    "url": "/participants",
    "title": "Get patients",
    "name": "GetAllPatients",
    "group": "Backend",
    "description": "<p>Get all patients</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT &quot;Bearer: <token>&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "patients",
            "description": "<ul> <li>root of object</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "patients.patients",
            "description": "<ul> <li>array of patient objects</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/crud.js",
    "groupTitle": "Backend"
  },
  {
    "type": "post",
    "url": "/participants/search",
    "title": "Patient search",
    "name": "GetPatient",
    "group": "Backend",
    "description": "<p>Search for a specific patient either by clinical ID or by details</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>Either &quot;clinId&quot; or &quot;details&quot;, based on which you wish to search by. If set to &quot;clinId&quot;, provide a clinId field. If set to &quot;details&quot;, provide a familyName, givenName and dateOfBirth field.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "clinId",
            "description": "<p>If search is clinId, specifiy the clinical ID to search by</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "familyName",
            "description": "<p>If search is details, specify the familyName to search by</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "givenName",
            "description": "<p>If search is details, specify the givenName to search by</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "dateOfBirth",
            "description": "<p>If search is details, specify the dateOfBirth to search by</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT &quot;Bearer: <token>&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "patient",
            "description": "<ul> <li>root of object</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "patient.patient",
            "description": "<ul> <li>the patient</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/crud.js",
    "groupTitle": "Backend"
  },
  {
    "type": "put",
    "url": "/participants",
    "title": "Update patient",
    "name": "UpdatePatient",
    "group": "Backend",
    "description": "<p>Update a patient</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "clinId",
            "description": "<p>Patient's clinical ID to update.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "familyName",
            "description": "<p>Patient's new family name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "givenName",
            "description": "<p>Patient's new given name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "sex",
            "description": "<p>Patient's new sex</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "dateOfBirth",
            "description": "<p>Patient's new date of birth</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "number",
            "description": "<p>Patient's new phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Patient's new email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Patient's new address</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "consentSampleOnescreen",
            "description": "<p>Patient's new consent to Onescreen studies</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "consentSampleTesting",
            "description": "<p>Patient's new consent to testing of genes</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "consentSampleStorage",
            "description": "<p>Patient's new consent to storage of sample</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT &quot;Bearer: <token>&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "patient",
            "description": "<ul> <li>root of object</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "patient.patient",
            "description": "<ul> <li>the patient created</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/crud.js",
    "groupTitle": "Backend"
  }
] });

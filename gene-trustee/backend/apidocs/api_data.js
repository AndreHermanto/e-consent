define({ "api": [
  {
    "type": "post",
    "url": "/participants",
    "title": "CSV Search",
    "name": "CSVSearch",
    "group": "Backend",
    "description": "<p>Search for patients by CSV file, returning a CSV with sampleIDs appended</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>a CSV file where the 4th value is clinical ID</p>"
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
            "type": "File",
            "optional": false,
            "field": "a",
            "description": "<p>CSV file with sample IDs appended to each line</p>"
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
            "type": "String",
            "optional": false,
            "field": "sampleId",
            "description": "<p>Patient's sample ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "familyNameInitials",
            "description": "<p>Patient's family name initials</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "givenNameInitials",
            "description": "<p>Patient's given name initials</p>"
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
            "field": "yearOfBirth",
            "description": "<p>Patient's year of birth</p>"
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
            "description": "<p>Either &quot;clinId&quot;, &quot;sampleId&quot;, or &quot;details&quot;, based on which you wish to search by. If set to &quot;clinId&quot;, provide a clinId field. If set to &quot;sampleId&quot;, provide a sampleId field. If set to &quot;details&quot;, provide a familyNameInitials, givenNameInitials and yearOfBirth field.</p>"
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
            "type": "String",
            "optional": true,
            "field": "sampleId",
            "description": "<p>If search is sampleId, specifiy the sample ID to search by</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "familyNameInitials",
            "description": "<p>If search is details, specify the familyName to search by</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "givenNameInitials",
            "description": "<p>If search is details, specify the givenName to search by</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "yearOfBirth",
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
            "description": "<p>Patient's clinical ID to update</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sampleId",
            "description": "<p>Patient's new sample ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "familyNameInitials",
            "description": "<p>Patient's new family name initials</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "givenNameInitials",
            "description": "<p>Patient's new given name initials</p>"
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
            "field": "yearOfBirth",
            "description": "<p>Patient's new year of birth</p>"
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
            "description": "<ul> <li>the patient updated</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/crud.js",
    "groupTitle": "Backend"
  }
] });

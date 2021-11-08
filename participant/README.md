# Participant Service

## General
Under **both** `backend/` and `frontend/`, create an `.env` file using `.env.example` as a template.

## Setting up dev environment
The compose file (`docker-compose.yml`) is set up to build the development versions of both the backend and the frontend with support for file hot reloading. Simply run `docker-compose up -d` in this folder.

## Setting up production environment
**🛑Participant production requires NSWHP and Wolper to be running first.🛑**

`Dockerfile.prod` builds a production image of the Participant service. Since the frontend is built and the files are then served by the backend, it runs as the one image. The tests for the participant backend depend on the NSWHP and Wolper services, so ensure they are started first. 

Participant is linked to a specific URL listening on port 3000, so to start the production service (after starting NSWHP and Wolper) would be: 
```
docker build -f Dockerfile.prod -t participant:latest .
docker run -dp 3000:3000 participant:latest
```

## CI/CD

There is no CI/CD for Participant

## Docs
Docs will be generated with apiDoc later, remind me if I don't.


# Wolper Service (Custodian)

## General
Under **both** `backend/` and `frontend/`, create an `.env` file using `.env.example` as a template.

## Dev setup
The docker compose file (`docker-compose.yml`) will bring up both the backend and the frontend in a development environment with support for file hot reloading.

First migrate the database with:
```
cd backend/ && npx sequelize-cli db:migrate
```

(Optionally) Seed the database with some fake data:
```
npx sequelize-cli db:seed:all
```

Finally, in this folder run:
```
docker-compose up -d
```

🛑 Hot reloading does not reload changes to `.env` 🛑

## Production setup
The docker file in this folder (`Dockerfile.prod`) will create a production image of the service. Ensure the `.env` files are written as above, and run:
```
docker build -f Dockerfile.prod -t wolper:latest .
docker run -dp 3002:3002 wolper:lastest
```

This will install all dependancies, build the frontend, run the tests for the backend, migrate and seed the database, and bring the service up listening on port 3002.

## CI/CD
There is no CI/CD for Wolper.

## Docs
Extra information is located inside `backend/` and `frontend/` if relevant.

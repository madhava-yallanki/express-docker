# Websocket with Express on Docker.

1. Package the code with dependencies `npm run release`
2. Build docker image `docker build -t express-docker .`
3. Run container `docker run -p 8080:8080 -d express-docker`
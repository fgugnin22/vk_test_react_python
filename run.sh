sudo docker compose run --rm -f certbot ./docker-compose.https.yml && \
sudo docker compose -f ./docker-compose.https.yml stop && \
sudo docker compose up -d

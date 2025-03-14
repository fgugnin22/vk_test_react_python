sudo docker compose -f ./docker-compose.https.yml run --rm certbot && \
sudo docker compose -f ./docker-compose.https.yml stop && \
sudo docker compose up -d

sudo docker compose -f ./docker-compose.https.yml up -d && \
sleep 20s && \
sudo docker compose -f ./docker-compose.https.yml stop && \
sudo docker compose up -d

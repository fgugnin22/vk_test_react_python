docker compose -f ./docker-compose.https.yml up -d
docker compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d fedor.tw1.ru
docker compose stop
docker compose up -d

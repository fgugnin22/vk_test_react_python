# sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo docker compose -f ./docker-compose.https.yml up -d
sudo docker compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d fedor.tw1.ru
sudo docker compose stop
sudo docker compose up -d

mkdir -p /usr/src/app/app/migrations
touch /usr/src/app/app/migrations/__init__.py
python manage.py makemigrations
python manage.py migrate
gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 4

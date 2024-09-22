#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Start the cron service in the background
echo "Starting cron service..."
cron

# Log cron output
echo "Tailing the cron log..."
touch /var/log/cron.log
tail -f /var/log/cron.log &

# Make migrations for the 'scheduler' app
echo "Making migrations for scheduler..."
python3 manage.py makemigrations scheduler

# Apply all migrations
echo "Applying migrations..."
python3 manage.py migrate

# Start Gunicorn (production WSGI server)
echo "Starting Gunicorn..."
gunicorn planner.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --threads 2 \
    --timeout 120

# Use the official Python image from the Docker Hub
FROM python:3.12

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install cron
RUN apt-get update && apt-get install -y cron

# Copy the crontab file to the cron.d directory
COPY crontab /etc/cron.d/my-cron-job

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/my-cron-job

# Apply cron job
RUN crontab /etc/cron.d/my-cron-job

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Copy the requirements file into the container
COPY requirements.txt .
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"
RUN pip3 install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run the Django server and cron service
CMD cron && tail -f /var/log/cron.log & \
python3 manage.py makemigrations scheduler\
&& python3 manage.py migrate \
&& python3 manage.py fetch_courses \
&& python3 manage.py compute_class_schedules \
&& python3 manage.py runserver 0.0.0.0:8000

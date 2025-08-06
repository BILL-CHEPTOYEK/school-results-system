# backend/Dockerfile
FROM python:3.11-slim-bullseye
                             

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install system dependencies required for psycopg2-binary
# This is crucial for connecting to PostgreSQL from Python
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc postgresql-client \
    && apt-get upgrade -y \
    && rm -rf /var/lib/apt/lists/* # Clean up apt cache to reduce image size

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

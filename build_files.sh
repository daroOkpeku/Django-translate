#!/bin/bash

# Step 1: Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Step 2: Run Django migrations
echo "Running migrations..."
python manage.py migrate

# Step 3: Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Step 4: Any other commands you need (e.g., building front-end assets)
# For example, if you have a React front end:
echo "Building front-end assets..."
npm install
npm run build

# Step 5: Other necessary steps (e.g., compiling messages, running tests, etc.)
echo "Compiling messages..."
python manage.py compilemessages

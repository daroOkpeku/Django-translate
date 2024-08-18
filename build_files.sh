#!/bin/bash
# Build the project
#!/bin/bash
set -e

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python is not installed. Exiting."
    exit 1
fi

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate the virtual environment
source venv/bin/activate
echo "Building the project..."

python3.9 -m pip install -r requirements.txt

echo "Make Migration..."
python3.9 manage.py makemigrations --noinput
python3.9 manage.py migrate --noinput

echo "Collect Static..."
python3.9 manage.py collectstatic --noinput --clear
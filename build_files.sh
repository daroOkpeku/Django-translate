# Create virtual environment if not exists
python -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install dependencies

pip install -r requirements.txt
python3.12 manage.py collectstatic
# Create virtual environment if not exists
python -m venv venv

# Activate the virtual environment
source virtualenv\Scripts\activate 

# Install dependencies

pip install -r requirements.txt
python3.12 manage.py collectstatic
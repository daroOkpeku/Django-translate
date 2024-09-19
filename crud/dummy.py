DATABASE_URL = 'postgresql://root:0cWd75aM1Y5QiF3rSLX2yMskYfeDT1Kp@dpg-crebhebgbbvc73bppg8g-a.frankfurt-postgres.render.com/emp_management'
db_info = urlparse(DATABASE_URL)
DATABASES = {
    "default": {
        "ENGINE": 'django.db.backends.postgresql_psycopg2',
        "NAME": db_info.path[1:],
        "USER": db_info.username,
        "PASSWORD": db_info.password,
        "HOST": db_info.hostname,
        "PORT": db_info.port,
        "OPTIONS": {
            "sslmode": "require",  
        },
        "CONN_MAX_AGE": 60,
    }
}

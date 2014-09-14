from flask import Flask
from flask.ext.mongoengine import MongoEngine
import os

app = Flask(__name__)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'secret')

MONGOLAB_URL = os.environ.get('MONGOLAB_URI')
if MONGOLAB_URL:
    url = urlparse.urlparse(MONGOLAB_URL)
    app.config['MONGODB_SETTINGS'] = {
        'USERNAME': url.username,
        'PASSWORD': url.password,
        'HOST': url.hostname,
        'PORT': url.port,
        'DB': url.path[1:]
    }
else:
    app.config['MONGODB_SETTINGS'] = {
        'DB': os.environ.get('DB_NAME', 'festively')
    }
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'secret')

# connect MongoEngine with Flask App
db = MongoEngine(app)

def register_blueprints(app):
    # Prevents circular imports
    from festively.views import festivals
    app.register_blueprint(festivals)

register_blueprints(app)

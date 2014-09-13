from flask import Flask
import os

app = Flask(__name__)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'secret')

def register_blueprints(app):
    # Prevents circular imports
    from festively.views import festivals
    app.register_blueprint(festivals)

register_blueprints(app)

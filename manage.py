from flask.ext.script import Manager, Server
import os
import sys

# Set application path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import the main Flask app
from festively import app

manager = Manager(app)

port = int(os.environ.get("PORT", 5000))

manager.add_command("runserver", Server(
    host="0.0.0.0",
    use_debugger=True,
    use_reloader=True,
    port=port))

if __name__ == '__main__':
    manager.run()

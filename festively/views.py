from flask import Blueprint, render_template, jsonify, request, send_from_directory, redirect, url_for
from festively.models import FestivalEntry
import os

festivals = Blueprint('festivals', __name__, template_folder='templates')

@festivals.route('/')
def index():
    return render_template('index.html')

@festivals.route('/featured')
def featured():
    return render_template('featured.html')

@festivals.route('/api/v1.0/festivals', methods=['GET'])
def get_festivals():
    longitude = float(request.args.get('longitude', ''))
    latitude = float(request.args.get('latitude', ''))
    # Only get events with approved status within 50 km of location and cap at
    # fifty results
    festivals = FestivalEntry.objects(location__near=[
                               longitude, latitude], location__max_distance=50000)[:50]
    return jsonify({'festivals': festivals})

@festivals.route('/icon.ico')
def favicon():
    return send_from_directory(os.path.join(foodtrucks.root_path, 'static', 'images'),
                               'icon.ico', mimetype='image/x-icon')

# Redirect to home for any other route
@festivals.app_errorhandler(404)
def page_not_found(error):
    return redirect(url_for("festivals.index"), code=302)

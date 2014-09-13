from flask import Blueprint, render_template, jsonify, request, send_from_directory, redirect, url_for
import os

festivals = Blueprint('festivals', __name__, template_folder='templates')

@festivals.route('/')
def index():
    return render_template('index.html')

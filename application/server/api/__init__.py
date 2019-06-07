#!/usr/bin/env python3
"""
API for job odyssey information
"""
from flask import Blueprint


api_views = Blueprint('api_views', __name__, url_prefix='/api')
from application.server.api.calls import *

#!/usr/bin/env python3
"""
Flask route that returns json response for user
"""
from application.server.api import api_views
from application.models import storage, CLASS_DICT
from application.models.user import User
from flask import abort, jsonify, request


@api_views.route('/users/', methods=['GET', 'POST'])
def users(user_id=None):
    """
    testing things
    """
    print(request.data)
    test_dict = {'name': 'Susan'}
    test = User(**test_dict)
    print(test)
    return jsonify(test.to_json())


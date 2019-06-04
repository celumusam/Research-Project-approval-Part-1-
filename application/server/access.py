from flask import Blueprint, g, render_template, redirect, request
import requests
import os

bp = Blueprint('user', __name__, url_prefix='/user', static_folder='../static/dist', template_folder='../static/templates')

client_id = os.environ.get('GITHUB_CLIENT_ID')
client_secret = os.environ.get('GITHUB_CLIENT_SECRET')

@bp.route('/', methods=('GET', 'POST'))
def homepage():
    if 'code' in request.args:
        github_url = 'https://github.com/login/oauth/access_token'
        data = {'client_id': client_id,
                'client_secret': client_secret,
                'code': request.args.get('code'),
                }
        headers = {'Accept': 'application/json'}
        r = requests.post(github_url, data=data, headers=headers)
        results = r.json()
        g.username = get_username(results.get('access_token'))
        g.code = request.args.get('code')

        return render_template('user.html')

def get_username(access_token):
    github_url = 'https://api.github.com/user'
    headers = {'Authorization': 'token {}'.format(access_token),
               'Accept': 'application/json'
              }

    r = requests.get(github_url, headers=headers)
    results = r.json()
    return results.get('login')
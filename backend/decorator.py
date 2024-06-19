from flask import request, jsonify
import functools
import db
import base64

def login_required(f):
    @functools.wraps(f)
    def decorated_function(*args, **kwargs):
        auth = request.headers.get('Authorization')
        if not auth:
            return jsonify({'message': 'Authentication required!'}), 401

        try:
            auth_type, auth_credentials = auth.split()
            if auth_type.lower() != 'basic':
                raise ValueError('Invalid auth type')
            decoded_credentials = base64.b64decode(auth_credentials).decode('utf-8')
            username, password = decoded_credentials.split(':')
        except (ValueError, TypeError):
            return jsonify({'message': 'Invalid authorization header!'}), 401

        connection = db.connect_db()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM user WHERE username = %s AND password = %s", (username, password))
        user = cursor.fetchone()
        cursor.close()
        connection.close()

        if not user:
            return jsonify({'message': 'Invalid credentials!'}), 403

        return f(*args, **kwargs)
    return decorated_function

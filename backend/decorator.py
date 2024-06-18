from flask import request, jsonify
import functools
import db

def login_required(f):
    @functools.wraps(f)
    def decorated_function(*args, **kwargs):
        auth = request.authorization
        if not auth or not auth.username or not auth.password:
            return jsonify({'message': 'Authentication required!'}), 401

        connection = db.connect_db()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM user WHERE username = %s AND password = %s", (auth.username, auth.password))
        user = cursor.fetchone()
        cursor.close()
        connection.close()

        if not user:
            return jsonify({'message': 'Invalid credentials!'}), 403

        return f(*args, **kwargs)
    return decorated_function

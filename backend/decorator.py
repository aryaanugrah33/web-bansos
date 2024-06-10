from flask import request, jsonify
import functools

def login_required(f):
    @functools.wraps(f)
    def decorated_function(*args, **kwargs):
        if not request.authorization:
            return jsonify({'message': 'Authentication required!'}), 401
        # Check username and password (this is just an example, use a proper authentication method)
        if request.authorization.username != 'admin' or request.authorization.password != 'admin_password':
            return jsonify({'message': 'Invalid credentials!'}), 403
        return f(*args, **kwargs)
    return decorated_function

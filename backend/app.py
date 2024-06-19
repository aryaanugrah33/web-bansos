from flask import Flask, request, jsonify
import pymysql
import db
from decorator import login_required
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Mengizinkan semua origins

@app.route('/penduduk', methods=['GET'])
@login_required
def get_all_penduduk():
    connection = db.connect_db()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM penduduk")
    result = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(result)

@app.route('/penduduk/<int:id>', methods=['GET'])
@login_required
def get_penduduk(id):
    connection = db.connect_db()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM penduduk WHERE id=%s", (id,))
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    return jsonify(result)

@app.route('/penduduk', methods=['POST'])
@login_required
def add_penduduk():
    data = request.get_json()
    connection = db.connect_db()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO penduduk (nama, alamat, tanggal_lahir, no_ktp) VALUES (%s, %s, %s, %s)",
                   (data['nama'], data['alamat'], data['tanggal_lahir'], data['no_ktp']))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Penduduk added successfully!'})

@app.route('/penduduk/<int:id>', methods=['PUT'])
@login_required
def update_penduduk(id):
    data = request.get_json()
    connection = db.connect_db()
    cursor = connection.cursor()
    cursor.execute("UPDATE penduduk SET nama=%s, alamat=%s, tanggal_lahir=%s, no_ktp=%s WHERE id=%s",
                   (data['nama'], data['alamat'], data['tanggal_lahir'], data['no_ktp'], id))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Penduduk updated successfully!'})

@app.route('/penduduk/<int:id>', methods=['DELETE'])
@login_required
def delete_penduduk(id):
    connection = db.connect_db()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM penduduk WHERE id=%s", (id,))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Penduduk deleted successfully!'})

@app.route('/jenis_bansos', methods=['GET'])
@login_required
def get_all_jenis_bansos():
    connection = db.connect_db()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM jenis_bansos")
    result = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(result)

@app.route('/jenis_bansos/<int:id>', methods=['GET'])
@login_required
def get_jenis_bansos(id):
    connection = db.connect_db()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM jenis_bansos WHERE id=%s", (id,))
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    return jsonify(result)

@app.route('/jenis_bansos', methods=['POST'])
@login_required
def add_jenis_bansos():
    data = request.get_json()
    connection = db.connect_db()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO jenis_bansos (nama_bansos, deskripsi) VALUES (%s, %s)",
                   (data['nama_bansos'], data['deskripsi']))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Jenis Bansos added successfully!'})

@app.route('/jenis_bansos/<int:id>', methods=['PUT'])
@login_required
def update_jenis_bansos(id):
    data = request.get_json()
    connection = db.connect_db()
    cursor = connection.cursor()
    cursor.execute("UPDATE jenis_bansos SET nama_bansos=%s, deskripsi=%s WHERE id=%s",
                   (data['nama_bansos'], data['deskripsi'], id))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Jenis Bansos updated successfully!'})

@app.route('/jenis_bansos/<int:id>', methods=['DELETE'])
@login_required
def delete_jenis_bansos(id):
    connection = db.connect_db()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM jenis_bansos WHERE id=%s", (id,))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Jenis Bansos deleted successfully!'})

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    connection = db.connect_db()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO user (username, password) VALUES (%s, %s)",
                   (data['username'], data['password']))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'User registered successfully!'})

@app.route('/penerima_bansos', methods=['GET'])
@login_required
def get_all_penerima_bansos():
    connection = db.connect_db()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    cursor.execute("""
        SELECT penerima_bansos.id, penduduk.nama, penduduk.no_ktp, jenis_bansos.nama_bansos, penerima_bansos.tanggal_terima 
        FROM penerima_bansos 
        JOIN penduduk ON penduduk.id = penerima_bansos.penduduk_id 
        JOIN jenis_bansos ON jenis_bansos.id = penerima_bansos.bansos_id
    """)
    result = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(result)

@app.route('/penerima_bansos', methods=['POST'])
@login_required
def add_penerima_bansos():
    data = request.get_json()
    connection = db.connect_db()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO penerima_bansos (penduduk_id, bansos_id, tanggal_terima) VALUES (%s, %s, %s)",
                   (data['penduduk_id'], data['bansos_id'], data['tanggal_terima']))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Penerima Bansos added successfully!'})

@app.route('/penerima_bansos/<int:id>', methods=['PUT'])
@login_required
def update_penerima_bansos(id):
    data = request.get_json()
    connection = db.connect_db()
    cursor = connection.cursor()
    cursor.execute("UPDATE penerima_bansos SET penduduk_id=%s, bansos_id=%s, tanggal_terima=%s WHERE id=%s",
                   (data['penduduk_id'], data['bansos_id'], data['tanggal_terima'], id))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Penerima Bansos updated successfully!'})

@app.route('/penerima_bansos/<int:id>', methods=['DELETE'])
@login_required
def delete_penerima_bansos(id):
    connection = db.connect_db()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM penerima_bansos WHERE id=%s", (id,))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Penerima Bansos deleted successfully!'})



@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    connection = db.connect_db()
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    cursor.execute("SELECT * FROM user WHERE username = %s AND password = %s", (data['username'], data['password']))
    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if user:
        return jsonify({"message": "Login successful", "user": user}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)

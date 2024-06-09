import db

# Connect to the database
connection = db.connect_db()
cursor = connection.cursor()

# Create table penduduk
cursor.execute("""
    CREATE TABLE IF NOT EXISTS penduduk (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nama VARCHAR(100) NOT NULL,
        alamat TEXT NOT NULL,
        tanggal_lahir DATE NOT NULL,
        no_ktp VARCHAR(20) NOT NULL
    )
""")

# Create table jenis_bansos
cursor.execute("""
    CREATE TABLE IF NOT EXISTS jenis_bansos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nama_bansos VARCHAR(100) NOT NULL,
        deskripsi TEXT NOT NULL
    )
""")

# Create table penerima_bansos
cursor.execute("""
    CREATE TABLE IF NOT EXISTS penerima_bansos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        penduduk_id INT,
        bansos_id INT,
        tanggal_terima DATE NOT NULL,
        FOREIGN KEY (penduduk_id) REFERENCES penduduk(id),
        FOREIGN KEY (bansos_id) REFERENCES jenis_bansos(id)
    )
""")

# Create table user
cursor.execute("""
    CREATE TABLE IF NOT EXISTS user (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL
    )
""")

# Insert sample data into penduduk
cursor.execute("INSERT INTO penduduk (nama, alamat, tanggal_lahir, no_ktp) VALUES (%s, %s, %s, %s)",
               ("John Doe", "123 Main St", "1990-01-01", "1234567890"))

# Insert sample data into jenis_bansos
cursor.execute("INSERT INTO jenis_bansos (nama_bansos, deskripsi) VALUES (%s, %s)",
               ("Bansos A", "Deskripsi Bansos A"))

# Insert sample data into user
cursor.execute("INSERT INTO user (username, password) VALUES (%s, %s)",
               ("admin", "admin_password"))

# Commit changes and close the connection
connection.commit()
cursor.close()
connection.close()

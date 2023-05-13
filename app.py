from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)
DB_NAME = "playlist.db"

def create_table():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS songs
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  title TEXT NOT NULL,
                  length TEXT NOT NULL,
                  singer TEXT NOT NULL)""")
    conn.commit()
    conn.close()
x = "sam"
@app.route('/')
def index():
    return render_template('khoobsurat.html')

@app.route('/add-to-playlist', methods=['POST'])
def add_to_playlist():
    title = request.form.get('title')
    singer = request.form.get('singer')
    length = request.form.get('length')
  
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("INSERT INTO songs (title, length, singer) VALUES (?, ?, ?)", (title, length, singer))
    conn.commit()
    conn.close()
    # x=title
    return jsonify({'message': 'Song added to playlist!'}, x=title)
print (x)
if __name__ == '__main__':
    create_table()
    app.run(debug=True)

import os
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__, static_folder='.')
CORS(app)

# Database Configuration
# Local SQLite for development, Postgres for Cloud SQL
db_uri = os.environ.get('DATABASE_URL')
if not db_uri:
    db_uri = 'sqlite:///snakes.db'
elif db_uri.startswith('postgres://'):
    db_uri = db_uri.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    high_score = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'username': f"{self.first_name} {self.last_name}",
            'score': self.high_score
        }

# Create DB Tables
with app.app_context():
    db.create_all()

# Endpoints
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/style.css')
def styles():
    return send_from_directory('.', 'style.css')

@app.route('/script.js')
def scripts():
    return send_from_directory('.', 'script.js')

@app.route('/save_user', methods=['POST'])
def save_user():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Check if user already exists
    user = User.query.filter_by(
        first_name=data.get('firstName'), 
        last_name=data.get('lastName')
    ).first()

    if not user:
        user = User(
            first_name=data.get('firstName'),
            last_name=data.get('lastName'),
            age=int(data.get('age', 0))
        )
        db.session.add(user)
        db.session.commit()
    
    return jsonify({'message': 'User saved', 'id': user.id}), 200

@app.route('/submit_score', methods=['POST'])
def submit_score():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    score = data.get('score', 0)
    username = data.get('username', '').split(' ')
    
    if len(username) < 2:
        return jsonify({'error': 'Invalid username'}), 400
        
    first_name = username[0]
    last_name = username[1]

    user = User.query.filter_by(
        first_name=first_name, 
        last_name=last_name
    ).first()

    if user:
        if score > user.high_score:
            user.high_score = score
            db.session.commit()
            return jsonify({'message': 'New high score!', 'score': user.high_score}), 200
        return jsonify({'message': 'Score submitted', 'score': user.high_score}), 200
    
    return jsonify({'error': 'User not found'}), 404

@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    users = User.query.order_by(User.high_score.desc()).limit(10).all()
    return jsonify([u.to_dict() for u in users])

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)

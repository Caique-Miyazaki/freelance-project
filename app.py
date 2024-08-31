import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask
from flask_cors import CORS

cred = credentials.Certificate("config/firebase_config.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

from controllers.user_controller import user_controller

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_controller)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)

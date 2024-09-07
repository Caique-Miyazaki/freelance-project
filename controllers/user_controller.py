from flask import Blueprint, request, jsonify, render_template
from models.user_model import User
from views.user_view import UserView
from firebase_admin import firestore

db = firestore.client()

user_controller = Blueprint('user_controller', __name__)

@user_controller.route('/register_user', methods=['POST'])
def register_user():
    data = request.json
    try:
        user = User(
            name=data.get('name'),
            email=data.get('email'),
            cpf=data.get('cpf'),
            birth_date=data.get('birth_date')
        )
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    user_ref = db.collection('users').document()
    user_ref.set(user.to_dict())

    return UserView.user_created(user_ref.id)
@user_controller.route('/register')
def show_register_form():
    return render_template('register_user.html')
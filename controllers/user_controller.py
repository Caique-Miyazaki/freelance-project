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

@user_controller.route('/users', methods=['GET'])
def list_users():
    try:
        users_ref = db.collection('users')
        docs = users_ref.get()

        if not docs:
            return jsonify([]), 200
        
        users = []
        for doc in docs:
            user_data = doc.to_dict()
            user_data['id'] = doc.id
            users.append(user_data)

        return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@user_controller.route('/update_user/<user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    try:
        user_ref = db.collection('users').document(user_id)

        if not user_ref.get().exists:
            return jsonify({"error": "User not found"}), 404

        user_data = {
            "name": data.get('name'),
            "email": data.get('email'),
            "cpf": data.get('cpf'),
            "birth_date": data.get('birth_date')
        }
        user_ref.update(user_data)

        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@user_controller.route('/delete_user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user_ref = db.collection('users').document(user_id)

        if not user_ref.get().exists:
            return jsonify({"error": "User not found"}), 404

        user_ref.delete()

        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

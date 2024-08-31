from flask import jsonify

class UserView:
    @staticmethod
    def user_created(user_id):
        return jsonify({
            "message": "User successfully registered!",
            "user_id": user_id
        }), 201

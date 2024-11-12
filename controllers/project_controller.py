from flask import Blueprint, request, jsonify
from models.project_model import Project
from views.project_view import ProjectView
from firebase_admin import firestore

db = firestore.client()
project_controller = Blueprint('project_controller', __name__)

@project_controller.route('/register_project', methods=['POST'])
def register_project():
    data = request.json
    try:
        project = Project(
            name=data.get('name'),
            min_deadline=data.get('min_deadline'),
            max_deadline=data.get('max_deadline'),
            value=data.get('value')
        )
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    project_ref = db.collection('projects').document()
    project_ref.set(project.to_dict())

    return ProjectView.project_created(project_ref.id)

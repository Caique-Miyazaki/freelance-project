from flask import Blueprint, request, jsonify, render_template
from models.project_model import Project
from views.project_view import ProjectView
from firebase_admin import firestore

db = firestore.client()
project_controller = Blueprint('project_controller', __name__)

@project_controller.route('/register_project', methods=['GET'])
def register_project_form():
    # Renderiza o formulário HTML
    return render_template('register_project.html')

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

    # Verifique se `project_ref.id` é a identificação do projeto. Retorne-a em JSON.
    return jsonify({"id": project_ref.id}), 201  # Status 201 indica criação bem-sucedida


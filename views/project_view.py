from flask import jsonify

class ProjectView:
    @staticmethod
    def project_created(project_id):
        return jsonify({
            "message": "Project successfully registered!",
            "project_id": project_id
        }), 201

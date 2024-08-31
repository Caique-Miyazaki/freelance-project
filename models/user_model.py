from datetime import datetime

class User:
    def __init__(self, name, email, cpf, birth_date):
        self.name = name
        self.email = email
        self.cpf = cpf
        try:
            self.birth_date = datetime.strptime(birth_date, "%Y-%m-%d")
        except ValueError:
            raise ValueError("Invalid date format, should be YYYY-MM-DD")

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "cpf": self.cpf,
            "birth_date": self.birth_date.strftime("%Y-%m-%d")
        }

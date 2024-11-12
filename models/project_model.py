class Project:
    def __init__(self, name, min_deadline, max_deadline, value):
        self.name = name
        self.min_deadline = min_deadline
        self.max_deadline = max_deadline
        self.value = value

    def to_dict(self):
        return {
            "name": self.name,
            "min_deadline": self.min_deadline,
            "max_deadline": self.max_deadline,
            "value": self.value
        }

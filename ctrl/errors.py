class ParticipantNotFoundError(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return "ParticipantNotFoundError: {}".format(self.value)


class ArgumentError(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return "ArgumentError: {}".format(self.value)


class DatabaseError(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return "DatabaseError: {}".format(self.value)

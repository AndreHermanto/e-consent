class Participant:
    def __init__(self, id, first_name, family_name, dob):
        self.id = id
        self.first_name = first_name
        self.family_name = family_name
        self.dob = dob

    def __repr__(self):
        return "{}: {} {} - {}".format(self.id, self.first_name, self.family_name, self.dob)


class Consent:
    def __init__(self, consents):
        self.consents = consents

    def validate_consent(self, org, purpose):
        return self.consents[org] and self.consents[purpose]

    def get_consent(self, consent):
        return self.consents[consent]

    def get_consents(self, consents):
        result = {}
        for consent in consents:
            result[consent] = self.consents[consent]
        return result

    def __repr__(self):
        return str(self.consents)

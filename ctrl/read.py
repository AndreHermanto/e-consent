import psycopg2
from datetime import date
from psycopg2 import Error
from errors import ParticipantNotFoundError, ArgumentError, DatabaseError
from models import Participant, Consent

Q_IDS = {
    "nfp": 22,  # not-for-profit
    "uri": 23,  # uni and research institute
    "gov": 24,  # government
    "com": 25,  # commercial
    "gru": 26,  # general research and clinical care use
    "hmb": 27,  # health, medical and biomedical research
    "dsr": 28,  # diseases specific research
    "pop": 29,  # population and ancestry research
    "ghi": 30,  # general health information
    "sri": 31   # self reported information
}


def get_database():
    try:
        connection = psycopg2.connect(user="agha",
                                      host="127.0.0.1",
                                      port="5432",
                                      database="agha")

        return connection
    except psycopg2.Error as e:
        print("Error while connecting to PostgreSQL", e)
        raise DatabaseError("Database error. Please try again later.")


def validate_intentions(org: str, purpose: str):
    if org not in Q_IDS:
        raise ArgumentError(
            "{} is not a valid organisation intention.".format(org))
    if purpose not in Q_IDS:
        raise ArgumentError(
            "{} is not a valid purpose intention.".format(purpose))


def get_consents(participant: Participant):
    try:
        # get connetion
        connection = get_database()
        cursor = connection.cursor()

        # retrieve all external consents for a given user. 0 = No, 1 = Yes, 2 = Not sure
        get_consents_query = "SELECT question_id, answer FROM questions WHERE questions.user_id = %s AND question_id BETWEEN 22 AND 31"
        cursor.execute(get_consents_query, (participant.id,))
        raw_consents = cursor.fetchall()

        # flip Q_IDS so we can lookup the keys easier because I am /incredibly/ lazy
        q_ids_rev = {v: k for k, v in Q_IDS.items()}

        consents = {}
        for consent in raw_consents:
            # add entry for each consent e.g {"nfp": True, "gov": False}
            consents[q_ids_rev[consent[0]]] = consent[1] == True

        participant_consents = Consent(consents)
        return participant_consents

    except DatabaseError:
        raise
    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()


def get_participant(family_name: str, given_name: str, date_of_birth: date, org: str, purpose: str):
    try:
        # connect to database
        connection = get_database()
        cursor = connection.cursor()

        validate_intentions(org, purpose)

        # retrieve participant id from users table using given details
        participant_query = "SELECT id FROM users WHERE users.first_name = %s AND users.family_name = %s AND users.dob = %s"

        cursor.execute(participant_query, (given_name,
                                           family_name, date_of_birth,))

        res = cursor.fetchone()
        if res is None:
            raise ParticipantNotFoundError(
                "{} {} {} not found.".format(given_name, family_name, date_of_birth))

        participant = Participant(
            res[0], given_name, family_name, date_of_birth)

        participant_consents = get_consents(participant)

        # True if consent matches intention, False otherwise
        return participant_consents.validate_consent(org, purpose)

    except (ArgumentError, ParticipantNotFoundError, DatabaseError):
        raise
    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()


def get_participants(org: str, purpose: str):
    try:
        # connect to database
        connection = get_database()
        cursor = connection.cursor()

        validate_intentions(org, purpose)

        # retrieve all participants
        participants_query = "SELECT id, first_name, family_name, dob FROM users"
        cursor.execute(participants_query)

        # parse rows as participant objects
        participants = [Participant(a, b, c, d)
                        for a, b, c, d in cursor.fetchall()]

        consenting_participants = []
        for participant in participants:
            # add any participant whos consent matches the intentions
            if get_consents(participant).validate_consent(org, purpose):
                consenting_participants.append(participant)

        return consenting_participants

    except (ArgumentError, DatabaseError):
        raise
    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()

from dotenv import dotenv_values
from pymongo import MongoClient

config = dotenv_values(".env.local")

MONGO_URL = config["MONGO_URL"]
MONGO_USERNAME = config["MONGO_USERNAME"]
MONGO_PASSWORD = config["MONGO_PASSWORD"]
MONGO_PORT = int(config["MONGO_PORT"])

mongo_client = MongoClient(
    host=MONGO_URL,
    username=MONGO_USERNAME,
    password=MONGO_PASSWORD,
    port=MONGO_PORT,
)


def insert_test_document():
    db = mongo_client.test
    test_collection = db.test_collection
    res = test_collection.insert_one({"test": "test"})
    print(res)

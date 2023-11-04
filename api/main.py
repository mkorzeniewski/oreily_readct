from dotenv import dotenv_values
from flask import Flask, jsonify, request
from flask_cors import CORS
from mongo_client import mongo_client
from requests import get

UNSPLASH_URL = "https://api.unsplash.com/photos/random/"

config = dotenv_values(".env.local")
if not config["UNSPLASH_KEY"]:
    raise EnvironmentError("Missing Unsplash API Key")

app = Flask(__name__)
app.config["DEBUG"] = config["DEBUG"] == "True" if config["DEBUG"] else False
CORS(app)

db = mongo_client.gallery
images_collection = db.images


@app.route("/new-images")
def new_image():
    """
    Fetches a new image from Unsplash API based on the query parameter passed in the request.

    Returns:
        A JSON object containing the image data.
    """
    word = request.args.get("query")
    headers = {
        "Authorization": f"Client-ID {config['UNSPLASH_KEY']}",
        "accept-version": "v1",
    }
    image = get(UNSPLASH_URL, headers=headers, params={"query": word}, timeout=5000)

    return image.json()


@app.route("/images", methods=["POST", "GET"])
def images():
    """
    GET: Returns a list of all images in the images_collection.
    POST: Adds a new image to the images_collection.
    """
    if request.method == "GET":
        images_list = list(images_collection.find({}))
        image: dict
        for image in images_list:
            del image["_id"]
        return jsonify(list(images_list))
    if request.method == "POST":
        image = request.get_json()
        images_collection.insert_one(image)
        return jsonify({"message": "Image added successfully"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)

from dotenv import dotenv_values
from flask import Flask, request
from flask_cors import CORS
from requests import get

UNSPLASH_URL = "https://api.unsplash.com/photos/random/"

config = dotenv_values(".env.local")
if not config["UNSPLASH_KEY"]:
    raise EnvironmentError("Missing Unsplash API Key")

app = Flask(__name__)
app.config["DEBUG"] = config["DEBUG"] == "True" if config["DEBUG"] else False
CORS(app)


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

@app.route("/images")
def images():
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)

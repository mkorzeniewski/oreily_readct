from flask import Flask, request
from requests import get
import os
from dotenv import dotenv_values

app = Flask(__name__)

config = dotenv_values(".env.local") 

UNSPLASH_URL = "https://api.unsplash.com/photos/random/"

if not config["UNSPLASH_KEY"]:
    raise EnvironmentError("Missing Unsplash API Key")

@app.route("/new-images")
def new_image():
    word = request.args.get("query")
    headers = {
        "Authorization": f"Client-ID {config['UNSPLASH_KEY']}",
        "accept-version": "v1"
        }
    image = get(UNSPLASH_URL, headers=headers, params={"query": word})
    return image.json()



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
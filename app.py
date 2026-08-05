from flask import Flask, render_template, request, redirect, jsonify
from datetime import datetime
from uuid import uuid4

from core.utils import (
    load_Data,
    save_Data
)

app = Flask(__name__)


@app.route("/")
def index():
    data = load_Data()
    data.reverse()
    return render_template("index.html", items=data)

@app.route("/add", methods=["POST"])
def add():
    text = request.form.get("text")

    if text:
        data = load_Data()

        data.append({
            "id": str(uuid4()),
            "text": text,
            "time": datetime.now().strftime("%I:%M %p • %d %b %Y")
        })
        save_Data(data)
    return redirect("/")

@app.route("/delete/<item_id>")
def delete(item_id):
    data = load_Data()
    data = [i for i in data if i["id"] != item_id]
    save_Data(data)
    return redirect("/")

@app.route("/edit/<item_id>", methods=["POST"])
def edit(item_id):
    text = request.form.get("text")
    data = load_Data()
    for item in data:
        if item["id"] == item_id:
            item["text"] = text
            item["time"] = datetime.now().strftime("%I:%M %p • %d %b %Y")
            break

    save_Data(data)
    return redirect("/")


@app.route("/api")
def api():
    return jsonify(load_Data())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3002, debug=False)
from flask import Flask, render_template, request, redirect, jsonify
from datetime import datetime

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
            "id": len(data)+1,
            "text": text,
            "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })
        save_Data(data)
    return redirect("/")

@app.route("/delete/<int:item_id>")
def delete(item_id):
    data = load_Data()
    data = [i for i in data if i["id"] != item_id]
    save_Data(data)
    return redirect("/")

@app.route("/api")
def api():
    return jsonify(load_Data())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
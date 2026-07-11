import os, json
from .config import DATA_FILE


def load_Data():
    if not os.path.exists(DATA_FILE):
        return []

    with open(DATA_FILE, "r") as f:
        try:
            return json.load(f)
        except:
            return []

def save_Data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)
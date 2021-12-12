from flask import Flask
from flask_socketio import SocketIO

import eventlet

eventlet.monkey_patch()

app = Flask(__name__)
io = SocketIO()
io.init_app(app, cors_allowed_origins="*", async_mode="eventlet")

def update(percentage, text=""):
    io.send("update", {"percentage":percentage, "text":text})

@app.route("/")
def index():
    return "Index Page API"

@io.on("request")
def socketio_hello(data):
    update(10, "starting up...")
    eventlet.sleep(2)
    update(50, "almost there...")
    eventlet.sleep(3)
    update(90, "yolo")

if __name__ == "__main__":
    io.run(app, debug=True)

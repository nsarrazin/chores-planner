from flask import Flask
from flask_socketio import SocketIO


app = Flask(__name__)
io = SocketIO()
io.init_app(app, cors_allowed_origins="*", async_mode="eventlet")

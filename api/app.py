import eventlet
eventlet.monkey_patch()

from sockets import io, app

from server import Server
import json

server = Server()

@app.route("/")
def index():
    return "Index Page API"

@app.route("/rooms/")
def showRooms():
    return str(list(server.lobbys.keys()))


@app.route("/rooms/<id>")
def showRoom(id):
    if id in server.lobbys:
        return json.loads(server.lobbys[id].JSON)
    else:
        return "This room does not exist !"


if __name__ == "__main__":
    io.run(app, debug=True)

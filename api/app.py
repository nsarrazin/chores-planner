from flask import Flask, request
from flask_socketio import SocketIO, join_room, leave_room
import eventlet
import copy


eventlet.monkey_patch()
from sockets import io, app


defaultRoom = {"users": [], "tasks": [], "sid": [], "params": {"seeAll": True}}
rooms = {}


@app.route("/")
def index():
    return "Index Page API"


@app.route("/rooms/")
def showRooms():
    return str(list(rooms.keys()))


@app.route("/rooms/<id>")
def showRoom(id):
    if id in rooms:
        return rooms[id]
    else:
        return "This room does not exist !"


def update(room_key):
    io.emit("update", rooms[room_key], to=room_key)


@io.on("joinLobby")
def join_lobby(data):
    if not data["room"] in rooms.keys():
        rooms[data["room"]] = copy.deepcopy(defaultRoom)

    if request.sid in rooms[data["room"]]["sid"]:
        return ("error", "userAlreadyIn")
    else:
        room_key = data["room"]

        rooms[room_key]["users"].append(data["user"])
        rooms[room_key]["sid"].append(request.sid)

        join_room(room_key)
        update(room_key)
        return ("success", "joinedRoom")


@io.on("prefs")
def update_prefs(data):
    room_key = data["room"]
    idx_user = rooms[room_key]["sid"].index(request.sid)
    rooms[room_key]["users"][idx_user] = data["user"]
    update(room_key)


@io.on("tasks")
def update_tasks(data):
    room_key = data["room"]
    idx_user = rooms[room_key]["sid"].index(request.sid)
    if idx_user != 0:  # user is not first in lobby, so not admin
        return

    room = rooms[room_key]
    room["tasks"] = data["tasks"]
    update(room_key)


@io.on("disconnect")
def leave_lobby():
    # since we only get sid from the disconnect then we have to figure out which room the user was in manually
    for room_key, room in rooms.items():
        if request.sid in room["sid"]:
            idx_user = room["sid"].index(request.sid)

            room["users"].pop(idx_user)
            room["sid"].pop(idx_user)

            leave_room(room_key)

            update(room_key)


if __name__ == "__main__":
    io.run(app, debug=True)

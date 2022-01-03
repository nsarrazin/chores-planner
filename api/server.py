from flask import request

from sockets import io, app
from lobby import Lobby


class Server:
    def __init__(self):
        self.lobbys = {}

    def createLobby(self, key):
        newLobby = Lobby.newLobby(key)
        self.lobbys[key] = newLobby

    def sidInLobby(self, sid):
        for lobby in self.lobbys.values():
            if sid in [user.sid for user in lobby.users]:
                return lobby  # since sid are unique, user should only be in one lobby at a time,

    def initCallbacks(self):
        """
        createLobby
        joinLobby
        addTask
        removeTask
        toggleReady
        updatePrefs
        disconnect
        """
        pass

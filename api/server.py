from flask import request
from flask_socketio import join_room, leave_room

from sockets import io, app
from lobby import Lobby
from user import User
from task import Task

class Server:
    def __init__(self):
        self.lobbys = {}

        self.initCallbacks()

    def createLobby(self, key):
        newLobby = Lobby.newLobby(key)
        newLobby.addTaskFromData({"name":"Default Task", "color": "#acb"})
        self.lobbys[key] = newLobby

    def sidInLobby(self, sid):
        for lobby in self.lobbys.values():
            if sid in [user.sid for user in lobby.users]:
                return lobby  # since sid are unique, user should only be in one lobby at a time,
        return False
    
    def initCallbacks(self):
        """
        LOBBY MANAGEMENT
        joinLobby
        TASK MANAGEMENT
        addTask
        removeTask
        updateTask
        # USER PREFS
        toggleReady
        updatePrefs

        # MISC
        disconnect
        X updateParams
        X 
        """

        @io.event
        def joinLobby(key, data):
            if not key in self.lobbys:
                self.createLobby(key)
            
            lobby = self.lobbys[key]
            lobby.addUserFromData(request.sid, data)
            
            join_room(key)
            
            lobby.update()

            return True
        
        @io.event
        def addTask(key, data):
            lobby = self.lobbys[key]
            if lobby.checkAdmin(request.sid):
                print(data)
                lobby.addTaskFromData(data)
                lobby.update()

        @io.event
        def removeTask(key, task_id):
            lobby = self.lobbys[key]
            print(lobby.tasks)
            if lobby.checkAdmin(request.sid):   
                lobby.removeTask(task_id)
                lobby.update()

        @io.event
        def updateTask(key, data):
            lobby = self.lobbys[key]
            if lobby.checkAdmin(request.sid):
                lobby.updateTaskFromData(data)
                lobby.update()

        @io.event
        def toggleReady(key):
            lobby = self.lobbys[key]
            user = lobby.getUser(request.sid)
            user.toggleReady()
            lobby.update()

        @io.event
        def updatePrefs(key, task_id_list):
            lobby = self.lobbys[key]
            user = lobby.getUser(request.sid)
            user.shufflePrefs(task_id_list)
            lobby.update()

        @io.event
        def disconnect():
            sid = request.sid
            lobby = self.sidInLobby(sid)
            if lobby == False:
                return
            lobby.delUser(sid)
            leave_room(lobby.key)
            lobby.update()

        @io.event # used for initial log in
        def getData(key):
            lobby = self.lobbys[key]
            return lobby.JSON
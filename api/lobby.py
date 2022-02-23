import copy, json
from user import User
from task import Task
from sockets import io

defaultParams = {"seeAll": True}


class Lobby:
    def __init__(self, key, users, tasks, params):
        self.key = key
        self.users = users
        self.tasks = tasks
        self.params = params

    @classmethod
    def newLobby(cls, key):
        newLobby = cls(key, [], [], copy.deepcopy(defaultParams))
        return newLobby

    def addUserFromData(self, sid, data):
        idx = len(self.users)
        prefs = copy.deepcopy(self.tasks)
        user = User(idx, sid, data["name"], data["avatarIdx"], prefs, False)
        self._addUser(user)

    def _addUser(self, newUser):
        if isinstance(newUser, User):
            self.users.append(newUser)
        else:
            raise TypeError(f"The user passed to this lobby {self.key} is not a User.")

    def delUser(self, sid):
        idxUser = [user.sid for user in self.users].index(sid)
        self.users.pop(idxUser)

    def addTaskFromData(self, data):
        idx = len(self.tasks)
        task = Task(idx, data["name"], data["color"])
        self._addTask(task)

    def _addTask(self, newTask):
        if isinstance(newTask, Task):
            self.tasks.append(newTask)
            for user in self.users:
                user.addTask(newTask)
        else:
            raise TypeError(f"The task passed to this lobby {self.key} is not a Task.")

    def removeTask(self, task_id):
        idx = [el.id for el in self.tasks].index(task_id)
        self.tasks.pop(idx)

        for user in self.users:
            user.removeTask(task_id)

    def updateTaskFromData(self, data):
        task = Task(data["id"], data["name"], data["color"])
        print(f"updating task with {data}")
        idx = [el.id for el in self.tasks].index(task.id)
        self.tasks[idx] = task

        for user in self.users:
            user.updateTask(task)
            

    def getUser(self, sid):
        idxUser = [user.sid for user in self.users].index(sid)
        return self.users[idxUser]
    
    def checkAdmin(self, sid):
        if sid == self.users[0].sid:
            return True
        return False 

    @property
    def JSON(self):
        return json.dumps(self, default=lambda o: o.dump, 
            sort_keys=True, indent=4)
    
    def update(self):
        io.emit("update", self.JSON, JSON=True, to=self.key)

    
    @property
    def dump(self):
        return {"key" : self.key,
                "users":self.users,
                "tasks":self.tasks,
                "params":self.params}

if __name__ == "__main__":
    lobby = Lobby.newLobby("abc")
    lobby.addTaskFromData({"name": "Task 1", "color" : "#00f"})
    lobby.addTaskFromData({"name": "Task 2", "color" : "#0ff"})
    
    lobby.addUserFromData("0133d", {"name": "user1", "avatarIdx":0})
    lobby.addUserFromData("0121f", {"name": "user2", "avatarIdx":5})

    lobby.removeTask(0)
    lobby.users[0].toggleReady()

    print(lobby.JSON)


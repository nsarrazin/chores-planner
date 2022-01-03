import copy
from .user import User
from .task import Task

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

    def addUser(self, newUser):
        if isinstance(newUser, User):
            self.users.append(newUser)
        else:
            raise TypeError(f"The object passed to this lobby is not a Task.")

    def delUser(self, idx):
        idxUser = [user.index for user in self.users].index(idx)
        self.users.pop(idxUser)

    def addTask(self, newTask):
        if isinstance(newTask, Task):
            self.tasks.append(newTask)

        for user in self.users:
            user.addTask(newTask)

    def removeTask(self, task_id):
        idx = [el.id for el in self.tasks].index(task_id)
        self.tasks.pop(idx)

        for user in self.users:
            user.removeTask(task_id)

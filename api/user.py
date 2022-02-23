import copy
from task import Task


class User:
    def __init__(self, index, sid, name, avatarIdx, prefs, isReady):
        self._index = index
        self._sid = sid
        self._name = name
        self._avatarIdx = avatarIdx
        self._prefs = prefs
        self._isReady = isReady

    @property
    def index(self):
        return self._index

    @index.setter
    def index(self, val):
        if type(val) == int:
            self._index = val
        else:
            raise TypeError("The new index passed to the user is not an int.")

    @property
    def sid(self):
        return self._sid

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, val):
        if type(val) == str:
            self._name = val
        else:
            raise TypeError("The new name passed to the user is not a string.")

    @property
    def avatarIdx(self):
        return self._avatarIdx

    @avatarIdx.setter
    def avatarIdx(self, val):
        if val.isdigit():
            self._name = val
        else:
            raise TypeError("The new name passed to the avatarIdx is not a digit.")

    @property
    def prefs(self):
        return self._prefs

    @property
    def isReady(self):
        return self._isReady

    def addTask(self, task):
        if isinstance(task, Task):
            self._prefs.append(task)
        else:
            raise TypeError(f"The object passed to user {self.name} is not a Task.")

    def removeTask(self, task_id):
        idx = [el.id for el in self._prefs].index(task_id)
        self._prefs.pop(idx)

    def updateTask(self, task):
        idx = [el.id for el in self._prefs].index(task.id)
        self._prefs[idx] = task

    def toggleReady(self):
        self._isReady = not self._isReady

    def shufflePrefs(self, task_id_list):
        prefs_id = [el.id for el in self.prefs] # list of ids

        new_prefs = []
        for id in task_id_list:
            idx_task = prefs_id.index(id)
            new_prefs.append(self.prefs[idx_task])

        self._prefs = new_prefs

    @property
    def dump(self):
        return {
            "sid" : self.sid,
            "name" : self.name,
            "avatarIdx" : self.avatarIdx,
            "index" : self.index,
            "preferences" : self.prefs,
            "isReady" : self.isReady
        }
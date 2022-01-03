import copy
from .task import Task


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
    def name(self, val):
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

    def toggleReady(self):
        self.isReady = not self.isReady

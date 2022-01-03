class Task:
    def __init__(self, id, name, color):
        self._id = id
        self._name = name
        self._color = color

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, val):
        if val.isdigit():
            self._id = int(id)
        else:
            raise TypeError("The value passed to the ID setter is not a number.")

    @property
    def name(self):
        return self._name

    @name.setter
    def id(self, val):
        if type(val) == str:
            self._name = val
        else:
            raise TypeError("The value passed to the name setter is not a string.")

    @property
    def color(self):
        return self._color

    @color.setter
    def id(self, val):
        if type(val) == str and val.startswith("#") and len(val) == 7:
            self._color = val
        else:
            raise TypeError(
                "The value passed to the name setter is not a color in hex format #RRGGBB."
            )

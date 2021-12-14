from flask import Flask
from flask_socketio import SocketIO

from itertools import permutations, combinations
import numpy as np 
import eventlet

eventlet.monkey_patch()

app = Flask(__name__)
io = SocketIO()
io.init_app(app, cors_allowed_origins="*", async_mode="eventlet")

L_CYCLE = 10 # how many weeks in the cycle of chores
MAX_DEPTH = 20 # how many of the top options do we look through
FAIRNESS = 2 # 0 is no tolerance

def update(percentage, text=""):
    io.emit("update", {"percentage":percentage, "text":text})

def get_combination_space(data):
    global L_CYCLE
    def get_weights(permutation):
        return [weights[n].index(i) for n,i in enumerate(permutation)] # index used as weight

    chores = [el["name"] for el in data['elements']]
    weights = [i["order"][::-1] for i in data['preferences']] # reverse data ordering

    weights = [list(map(lambda x:x["name"], x)) for x in weights]

    print(weights)
    combination_space = []
    L_CYCLE = len(chores)

    for option in list(permutations(chores)):
        combination_space.append((get_weights(option), option))

    combination_space = sorted(combination_space, key=lambda x: sum(x[0]))

    return combination_space

def generate_sols(combination_space):
    def variety(sol):
        score = 0 
        n_people = len(sol[0][-1])
        
        for n in range(n_people): # number of people
            chores = [day[-1][n] for day in sol]
            score += len(chores) - len(set(chores))

        return score # should be minimized
    
    depth = 1
    sols = []
    n=0

    while depth<MAX_DEPTH:
        space = list(combinations(combination_space[-depth:], L_CYCLE))
        for i in space:
            n +=1 
            arr = np.array([j[0] for j in i]) # weights per person
            sums = np.sum(arr, axis=0) # weights summed per person
            if np.max(sums) - np.min(sums) <= FAIRNESS:
                sols.append((np.sum(arr), variety(i), i)) # append overall score, variety score and the solution
            
        depth +=1

    return sols

def pick_sols(sols):
    # filter based on fairness
    print(f"{len(sols)} solutions left. \nPicking the best scored ones...")
    max_score = max([sol[0] for sol in sols]) # find max score for everything 
    sols = [sol for sol in sols if sol[0]==max_score] # filter non optimal solutions

    print(f"{len(sols)} solutions left.\nPicking only the most varied ones...")
    min_score = min([sol[1] for sol in sols]) # find min score for monotony 
    sols = [sol for sol in sols if sol[1]==min_score] # filter non optimal solutions

    print(f"{len(sols)} optimal solutions left.")
        
    print(f"Max score of {max_score} for p1, min score of {min_score} for p2")

    unique = set([str(i[-1]) for i in sols])
    print(len(unique))# how many non duplicate solution exists

    return sols[0], len(unique)

def return_data(sol, data):
    users = data["users"]
    days = sol[-1]
    data = []
    for day in days:
        data += str([sum(day[0]), [users[n]["name"] + " -> " + j for n, j in enumerate(day[1])]]) + "\n"
    return data

@app.route("/")
def index():
    return "Index Page API"

@io.on("request")
def socketio_hello(data):
    update(5, "Starting process...")
    cspace = get_combination_space(data)
    update(20, f"Generated combination space of length {len(cspace)} ...")
    sols = generate_sols(cspace)
    update(50, f"Generated {len(sols)} possible solutions...")
    sol, n_unique = pick_sols(sols)

    update(80, f"Picked {n_unique} unique solutions...")
    
    data = return_data(sol, data)
    update(100, data)

if __name__ == "__main__":
    data = {'users': ['user A', 'user B', 'user C'],
            'elements': ['Kitchen', 'Toilet', 'Trash'],
            'order': [
                        ['placeholder', 'placeholder', 'placeholder'],
                        ['Kitchen', 'Trash', 'Toilet'], 
                        ['Trash', 'Toilet', 'Kitchen']]}

    io.run(app, debug=True)

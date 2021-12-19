import { Element, Data, User, Params, Row, Solution, Score} from '../types';
import * as Combinatorics from 'js-combinatorics';

class Solver{
    readonly params: Params;
    readonly users: User[];
    readonly elements: Element[];

    constructor(data:Data){
        this.params = data.params;
        this.users = data.users;
        this.elements = data.elements;
    }

    // turn a list of element into a Row with weights
    getRowFromArray(arr:Element[]):Row{
        let newRow:Row = {
            elements : [],
            weights : [],
        } 

        for (let i = 0; i < this.users.length; i++) {
            let weight = getWeight(this.users[i], arr[i])
            newRow.elements.push(arr[i])
            newRow.weights.push(weight)
        }

        return newRow
    }

    getCombinationSpace():Row[]{
       let it = new Combinatorics.Permutation(this.elements, this.users.length);
        return [...it].map((el:Element[])=>(this.getRowFromArray(el)))
    }

    getSolutions(cSpace:Row[]):Solution[]{
        // sort them by sum
        
        cSpace.sort((a, b) => (a.weights.reduce((a,b)=>a+b) > b.weights.reduce((a,b)=>a+b) ? -1 : 1));
        let goodPicks:Row[] = cSpace.slice(0, this.params.depth);

        let it = new Combinatorics.Combination(goodPicks, this.params.length);
        let sols:Solution[] = [...it].map((el:Row[])=>(createSolution(el)))

        return sols.filter((el)=>(el.score.fairness <= this.params.fairness)).sort((a,b) => (a.score.sum > b.score.sum ? -1 : 1)) // filter out if delta is bigger than tolerance
    }
}

function createSolution(solution:Row[]){
    let weightsPerUser:number[] = []

    for(var i = 0; i < solution[0].weights.length; i++) {
        weightsPerUser.push(0);
    }

    for (let i = 0; i < solution.length; i++) {
        for (let j = 0; j < solution[i].weights.length; j++) {
            weightsPerUser[j] += solution[i].weights[j]
        }
    }

    let score:Score = {
        sum: weightsPerUser.reduce((a,b)=>a+b),
        fairness: Math.max(...weightsPerUser) - Math.min(...weightsPerUser),
        scores: weightsPerUser,
    }

    return {score:score, planning:solution}
}

 function getWeight(user:User, el:Element){
    return user.preferences.length - user.preferences.findIndex(x => x.index === el.index);
}

export function solve(data:Data){
    let solver = new Solver(data);

    let cSpace = solver.getCombinationSpace();
    return solver.getSolutions(cSpace)
}
// user
export type User = {
    name: string;
    index: number;
    preferences: Element[]
}

// Task, used by front-end
export type Element = {
    name: string;
    color: string;
    index: number;
}

// Data passed to back-end
export type Data = {
    users: User[],
    elements: Element[],
    params?: Params
  }

// params for the solver
type Params = {
    fairness: number,
    length: number,
    depth: number
    fairFirst: boolean
}

// a task with a weight based on preferences, used by solver, extends Element
export type Task = Element & {
    weight: number,
}
 
// some values computed for a solution
export type Score = {
    sum: number
    fairness: number,
    scores: number[],
}

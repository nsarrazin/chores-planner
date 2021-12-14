// user
export type User = {
    name: string;
    index: number;
}

// Task, used by front-end
export type Element = {
    name: string;
    color: string;
    index: number;
}

// ordering of task per user, used for draggable list
export type Preferences = {
    user: User;
    order: Element[];
}

// Data passed to back-end (deprecated)
export type Data = {
    users: User[],
    elements: Element[],
    preferences?: Preferences[]
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

// a list of task for a user to do, used by solver
export type Schedule = {
    user: User,
    schedule: Task[]
}

// some values computed for a solution
export type Score = {
    sum: number
    fairness: number,
    scores: number[],
}

// a score with a list of schedules (one per user)
export type Solution = {
    score: Score,
    planning : Schedule[]
}
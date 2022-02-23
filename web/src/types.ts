// user
export type User = {
    name: string;
    sid: string;
    avatarIdx: number;
    index: number;
    preferences: Task[]
    isReady: boolean;
}

// Task, used by front-end
export type Task = {
    name: string;
    color: string;
    id: number;
}

export type LobbyParams = {
    seeAll:boolean;
}

export type Room = {
    key: string;
    users: User[];
    tasks: Task[];
    params: LobbyParams;
}
// Data passed to back-end
export type Data = {
    users: User[],
    elements: Task[],
}

// params for the solver
export type Params = {
    fairness: number,
    length: number,
    depth: number
}

export type Row = {
    elements: Task[],
    weights: number[]
}

// some values computed for a solution
export type Score = {
    sum: number
    fairness: number,
    scores: number[],
}

export type Solution = {
    planning: Row[],
    score: Score,
}
import * as React from 'react';

export type Element = {
    name: string;
    color: string;
    index: number;
}

export type Preferences = {
    user: string;
    index: number;
    ordering: Element[];
}

export interface Data{
    users: string[],
    elements: Element [],
    order?: Element[][]
    params?: Params
  }

interface Params{}

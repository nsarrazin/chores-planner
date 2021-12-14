import * as React from 'react';

export type Element = {
    name: string;
    color: string;
    index: number;
}

export type Preferences = {
    user: string;
    index: number;
    order: Element[];
}

export interface Data{
    users: string[],
    elements: Element [],
    order?: Preferences[]
    params?: Params
  }

interface Params{}

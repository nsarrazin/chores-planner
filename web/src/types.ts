import * as React from 'react';

export type Element = {
    name: string;
    color: string;
    index: number;
}

export interface Data{
    users: string[],
    elements: Element [],
    order?: Element[][]
    params?: Params
  }

interface Params{}

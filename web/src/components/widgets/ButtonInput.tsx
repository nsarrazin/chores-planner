import * as React from 'react';
import { Button, ButtonGroup, Typography} from '@mui/material';
import chroma from 'chroma-js';
export type ButtonInputProps = {
    name: string;
    state: any[];
    setState: (value:any[]) => void;
    defaultItem: any;
}

let scale = chroma.scale(['#836E87','#A2783F'])
                        .mode('lch').colors(6)

export const ButtonInput = ({name, state, setState, defaultItem}:ButtonInputProps) => {
    
  function handleIncrement() {
    let newState = [...state]
    let idx = state.length;
    let toAdd:string = " " + idx.toString();

    if (typeof defaultItem === "string"){
      newState.push(defaultItem + toAdd);
    }
    else{
      newState.push({...defaultItem, name:defaultItem.name + toAdd, color:scale[idx % scale.length]});
    }

    setState(newState);
  };
  
  function handleDecrement(){
    setState(state.slice(0, -1));
  };

  const buttons = [
    <Button key="minusUsers" onClick={handleDecrement}>-</Button>,
    <Button disabled key="users">{state.length}</Button>,
    <Button key="plusUsers" onClick={handleIncrement}>+</Button>,
  ]
  
  return (
    <div>
        <Typography variant="h4">
            {name}
        </Typography>
        <ButtonGroup>
            {buttons}
        </ButtonGroup>
    </div>
  )
}
import * as React from 'react';
import { Button, ButtonGroup, Typography} from '@mui/material';

export type ButtonInputProps = {
    name: string;
    state: any[];
    setState: (value:any[]) => void;
    defaultItem: any;
}

export const ButtonInput = ({name, state, setState, defaultItem}:ButtonInputProps) => {
    
  function handleIncrement() {
    setState([...state, defaultItem]);
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
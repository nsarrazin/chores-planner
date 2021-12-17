import * as React from 'react';
import { Button, ButtonGroup, Typography} from '@mui/material';

export type ButtonInputProps = {
    name: string;
    state: any[];
    increment: () => void;
    decrement: () => void;
}

export const ButtonInput = ({name, state, increment, decrement}:ButtonInputProps) => {

  const buttons = [
    <Button key="minusUsers" onClick={decrement}>-</Button>,
    <Button disabled key="users">{state.length}</Button>,
    <Button key="plusUsers" onClick={increment}>+</Button>,
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
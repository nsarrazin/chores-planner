import * as React from 'react';
import chroma from 'chroma-js';
import type { Element, User } from '../../types';
import { ButtonInput } from './ButtonInput';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/material';

const useStyles = makeStyles({
    input:{
      display:"flex",
      justifyContent:"space-around",
      marginRight:"15vw",
      marginLeft:"15vw",
      marginBottom:"1vh",
      marginTop:"1vh"
    }})

let scale = chroma.scale(['#836E87','#A2783F'])
                    .mode('lch').colors(6)


export type ButtonsProps = {
    users: User[];
    setUsers: (value:User[]) => void;
    elements: Element[]
    setElements: (value:Element[]) => void;
}

export const Buttons = (props:ButtonsProps)=>{
    function incrementUser(){
        let newUsers = [...props.users];

        let idx:number = newUsers.length;
        let toAdd:string = " " + (idx+1).toString();

        newUsers.push({name: "User" + toAdd,
                        preferences: [...props.elements],
                        index: idx});
        
        props.setUsers(newUsers);

    }

    function decrementUser(){
        props.setUsers(props.users.slice(0, -1));
    }

    function incrementElement(){
        let newElements = [...props.elements];

        let idx:number = newElements.length;
        let toAdd:string = " " + (idx+1).toString();

        newElements.push({name: "Task" + toAdd,
                          color:scale[idx % scale.length],
                          index:idx})

        props.setElements(newElements);
    }

    function decrementElement(){
        props.setElements(props.elements.slice(0, -1));

    }
    const classes = useStyles();

    return (
    <Box className={classes.input}>
        <ButtonInput name="Users" state={props.users} increment={incrementUser} decrement={decrementUser}/>
        <ButtonInput name="Elements" state={props.elements} increment={incrementElement} decrement={decrementElement}/>
    </Box>

    )
}
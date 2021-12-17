import * as React from 'react';
import { Buttons } from './widgets/Buttons';
import { Button, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { socket } from '../context/socket';

import { Typography } from '@mui/material';

import { ElementsManager } from './elements/ElementsManager';
import { Element, Data, User } from '../types';
import { PreferencesManager } from './preferences/PreferencesManager';
import { ModalResult } from './Modal';

const useStyles = makeStyles({
    input:{
      display:"flex",
      justifyContent:"space-around",
      marginRight:"15vw",
      marginLeft:"15vw",
      marginBottom:"5vh",
      marginTop:"5vh"
    },
    title:{
        textAlign: "center",
        marignTop:"0",
        paddingTop:"3vh",
        paddingBottom:"3vh"
    }
})

let defaultElement:Element = {name:"task", color:"#836E87", index:0}
let defaultUser:User = {name:"user", index:0, preferences: [defaultElement]}
    
export const MainPage = () => {
    const classes = useStyles();

    const [users, setUsers] = React.useState<User[]>([{name:"user", index:0, preferences: [{name:"task", color:"#836E87", index:0}]}])
    const [elements, setElements] = React.useState<Element[]>([{name:"task 1", color:"#836E87", index:0}])
    const [modalOpen, setModalOpen] = React.useState(false);
    
    
    function updatePrefs(){
        if (users.length>0){
            let newUsers = [...users];

            for (let i = 0; i < newUsers.length; i++) {
                let deltaCols = elements.length - newUsers[i].preferences.length; 
                
                if (deltaCols < 0){ // if cols need to be removed, drop last elements
                    for (let n = 0; n < -deltaCols; n++) {
                            let arr = [...newUsers[i].preferences]
            
                            let indexes = arr.map((el)=>(el.index)) // map index of element
                            let idxToRemove = indexes.indexOf(Math.max(...indexes)) // pick the last one
                            arr.splice(idxToRemove, 1) // drop it
            
                            newUsers[i].preferences = arr
                        }
                    }

                if (deltaCols > 0){ // if cols need to be added, add elements corresponding
                    for (let n = 0; n < deltaCols; n++) {
                            for (let j = newUsers[i].preferences.length; j < elements.length; j++) {
                                newUsers[i].preferences.push(elements[j])
                            }                
                        }
                    }
                }
                setUsers(newUsers)
            }
        }
        
    
    function updateElements(){
        let newUsers = [...users];
        
        let elementsDict: {[name:number] : Element} = {};
        for (let i = 0; i < elements.length; i++) {
            elementsDict[elements[i].index] = elements[i]
        }
        // check for updated elements
        for (let i = 0; i < newUsers.length; i++) {
            for (let j = 0; j < newUsers[i].preferences.length; j++) {
                newUsers[i].preferences[j] = elementsDict[newUsers[i].preferences[j].index]
            }            
        }
        setUsers(newUsers)
    }
    
    function updateIndexes(){
        for (let i = 0; i < elements.length; i++) {
            elements[i].index = i        
        }
        for (let j = 0; j < users.length; j++) {
            users[j].index = j
            
        }
    }

    function handlePush(){
        let data:Data={users:users, elements:elements};
        socket.emit("request", data);
        setModalOpen(true);
    }
    
    React.useEffect(updateIndexes, [users, elements]);
    React.useEffect(updatePrefs, [elements]);
    React.useEffect(updateElements, [elements]);
    
    let PreferencesManagerProps = { users:users, setUsers:setUsers, elements:elements}
    return (
        <div>
            <Typography variant="h2" className={classes.title}>
                Chores Planner
            </Typography>
            <Buttons users={users} setUsers={setUsers} elements={elements} setElements={setElements}/>
            <Box display="flex" justifyContent="space-around">
                <ElementsManager elements={elements} setElements={setElements}/>
                <PreferencesManager {...PreferencesManagerProps} />
            </Box>
            <Box display="flex" justifyContent="center">
                <Button variant="contained" onClick={handlePush}>Push</Button>
            </Box>
            <ModalResult open={modalOpen} callbackClose={()=>setModalOpen(false)}/>

        </div>
    )
}
import * as React from 'react';
import { Buttons } from './widgets/Buttons';
import { Button, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

import { Typography } from '@mui/material';

import { Parameters } from './widgets/Parameters';

import { ElementsManager } from './elements/ElementsManager';
import { Element, Data, User, Params, Solution } from '../types';
import { PreferencesManager } from './preferences/PreferencesManager';
import { ModalResult } from './Modal';
import { solve } from '../solver/solver';

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

let defaultElements: Element[] = [  {name:"Kitchen", color:"#836e87", index:0},
                                    {name:"Shower", color:"#9f7a8e", index:1},
                                    {name:"Garbage", color:"#ad7883", index:2}]

let defaultUsers: User[] = [{name:"Alice", index:0, preferences:defaultElements},
                            {name:"Bob", index:1, preferences:defaultElements},
                            {name:"Charlie", index:2, preferences:defaultElements}]

export const MainPage = () => {
    const classes = useStyles();

    const [users, setUsers] = React.useState<User[]>(defaultUsers)
    const [elements, setElements] = React.useState<Element[]>(defaultElements)

    const [params, setParams] = React.useState<Params>({fairness:2, length:3, depth:20})
    const [modalOpen, setModalOpen] = React.useState(false);
    const [sols, setSols] = React.useState<Solution[]>();
    
    function onUpdateUsers(){
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
        }
        
    function onUpdateInputs(){
        for (let i = 0; i < elements.length; i++) {
            elements[i].index = i        
        }
        for (let j = 0; j < users.length; j++) {
            users[j].index = j
        }
        
        let val = Math.max(elements.length, users.length);

        setParams({...params, depth:4*val, length:val})
    }

    function handlePush(){
        let data:Data={users:users, elements:elements};
        setSols(solve(data));
        setModalOpen(true);
    }
    
    React.useEffect(onUpdateInputs, [users, elements]);
    React.useEffect(onUpdateUsers, [elements]);
    
    let PreferencesManagerProps = { users:users, setUsers:setUsers, elements:elements}
    return (
        <div>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Typography variant="h2" className={classes.title}>
                    <LocalLaundryServiceIcon/>
                </Typography>
                <Typography variant="h2" className={classes.title}>
                    Chores Planner
                </Typography>
            </Box>
            <Buttons users={users} setUsers={setUsers} elements={elements} setElements={setElements}/>
            <Box display="flex" justifyContent="space-around">
                <ElementsManager elements={elements} setElements={setElements}/>
                <Box flexGrow={3}>
                    <PreferencesManager {...PreferencesManagerProps} />
                    <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" paddingRight="10vw">
                    <Button variant="contained" onClick={handlePush}>Push</Button>
                    </Box>
                </Box>
            </Box>
            {sols !== undefined && <ModalResult open={modalOpen} callbackClose={()=>setModalOpen(false)} initSols={sols} users={users}/>}
        </div>
    )
}
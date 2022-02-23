import * as React from 'react';
import { Avatar, Paper } from '@mui/material';


export type AvatarDisplayProps = {
    avatarIdx: number;
}

export const AvatarDisplay = ({ avatarIdx }: AvatarDisplayProps) => {
    if (avatarIdx > 58 || avatarIdx < 0) {
        return <Paper elevation={0} sx={{ borderRadius: "50%", borderStyle:"solid", borderWidth:"2", borderColor:"primary.main"}}/>

    } else {
        let path = "../avatars/Artboards_Diversity_Avatars_by_Netguru-" + (avatarIdx + 1).toString() + ".svg";
        return (
            <Paper elevation={0} sx={{ borderRadius: "50%", borderStyle:"solid", borderWidth:"2", borderColor:"primary.main"}}>
                <Avatar sx={{ width: "70px", height: "70px" }}
                    src={path} />
            </Paper>);
    }
}
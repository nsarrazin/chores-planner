import * as React from 'react';
import { Avatar, Paper } from '@mui/material';


export type AvatarDisplayProps = {
    avatarIdx: number;
}

export const AvatarDisplay = ({ avatarIdx }: AvatarDisplayProps) => {
    if (avatarIdx > 58 || avatarIdx < 0) {
        return <Paper elevation={5} sx={{ borderRadius: "50%" }}></Paper>
    } else {
        let path = "../avatars/Artboards_Diversity_Avatars_by_Netguru-" + (avatarIdx + 1).toString() + ".svg";
        return (
            <Paper elevation={5} sx={{ borderRadius: "50%" }}>
                <Avatar sx={{ width: "80px", height: "80px" }}
                    src={path} />
            </Paper>);
    }
}
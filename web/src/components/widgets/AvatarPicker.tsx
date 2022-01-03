import * as React from 'react';
import { AvatarDisplay } from './AvatarDisplay';
import { Dialog, Button } from '@mui/material';


export type AvatarPickerProps = {
    avatarIdx: number;
    callback: (avatarIdx: number) => void;
}

export const AvatarPicker = ({ avatarIdx, callback }: AvatarPickerProps) => {


    return (
        <div>
            <Button>
                <AvatarDisplay avatarIdx={avatarIdx} />
            </Button>
        </div>
    )
}
import React, {useState} from 'react';
import { Progress } from 'antd';
import s from './AppProgress.module.css'


export const AppProgress = () => {
    return (
        <>
            <Progress  showInfo={false}
                       strokeColor={{
                           from: '#94b1c7',
                           to: '#94b1c7',

                       }}
                       percent={100}
                       status="active"
                       strokeWidth={6}
                       className={s.progress}
            />
        </>
    );
};
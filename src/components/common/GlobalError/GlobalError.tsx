import React, {useEffect, useState} from 'react';
import s from './GlobalError.module.css'
import cn from 'classnames'

type PropsType = {
    error: string
}

export const GlobalError = ({error}: PropsType) => {

    const [errText, setErrText] = useState('');

    useEffect(() => {
        if (error) {
            setErrText(error);
        }
    }, [error])

    return (
        <div className={cn({[s.errBlockActive]: error}, s.errBlock)}>{errText}</div>
    );
}


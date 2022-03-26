import React, { FC, useEffect, useState } from 'react';
import styles from './example.module.css'

interface IExample {
    error: boolean;
    trueAnswer?: number;
}

const Example: FC<IExample> = ({ error, trueAnswer }) => {

    

    return (
        <div>
            123
        </div>
    );
}

Example.displayName = 'Example';
export default Example;
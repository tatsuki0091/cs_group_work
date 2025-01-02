import React from 'react';
import { ErrorProps } from './interfaces';
import styles from './styles.module.css';
const ErrorMessages = (props: ErrorProps) => {
    return (
        <>
            {props.errors.length > 0
                ? props.errors.map((error, index) => (
                      <p key={index} className={styles.erroeMesssage}>
                          {error}
                      </p>
                  ))
                : ''}
        </>
    );
};

export default ErrorMessages;

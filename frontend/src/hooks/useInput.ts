import { useState, Dispatch, useCallback } from "react";

type UseInputReturnType<T> = [
    T,
    Dispatch<React.SetStateAction<T>>,
    (event: React.ChangeEvent<HTMLInputElement>) => void,
    () => void
];

export const useInput = <T>(initialValue: T): UseInputReturnType<T> => {
    const [value, setValue] = useState(initialValue);
    const handleChange = useCallback(
        <U extends T>(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value as U);
        },
        []
    );

    const reset = () => {
        setValue(initialValue);
    };

    return [value, setValue, handleChange, reset];
};

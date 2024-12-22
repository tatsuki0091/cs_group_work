import { useState, Dispatch, useCallback } from 'react';

// 共通のフックの戻り値の型を定義
type UseInputReturnType<T, E extends HTMLInputElement | HTMLTextAreaElement> = [
    T,
    Dispatch<React.SetStateAction<T>>,
    (event: React.ChangeEvent<E>) => void,
    () => void,
    (event: React.ChangeEvent<E>) => void,
];

// inputおよびtextareaの両方で使用できる汎用的なフックを定義
export const useInput = <T, E extends HTMLInputElement | HTMLTextAreaElement>(
    initialValue: T,
): UseInputReturnType<T, E> => {
    const [value, setValue] = useState(initialValue);

    const handleChange = useCallback((event: React.ChangeEvent<E>) => {
        let value = event.target.value;
        setValue(value as unknown as T);
    }, []);

    const reset = () => {
        setValue(initialValue);
    };

    const handleBlur = (event: React.ChangeEvent<E>) => {
        if (typeof event.target.value === 'string') {
            let value = event.target.value.trim();
            setValue(value as unknown as T);
        }
    };

    return [value, setValue, handleChange, reset, handleBlur];
};

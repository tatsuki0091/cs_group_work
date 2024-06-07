import { useState, Dispatch } from "react";

type UseValidateReturnType<T> = [
    string[],
    Dispatch<React.SetStateAction<string[]>>,
    () => void
];

const useValidation = <T extends object>(
    values: Array<string>
): UseValidateReturnType<T> => {
    const [errors, setErrors] = useState<string[]>(values);
    const resetValidation = () => {
        setErrors(values);
    };
    return [errors, setErrors, resetValidation];
};

export default useValidation;

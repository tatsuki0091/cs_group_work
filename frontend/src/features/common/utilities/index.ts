export const setErrorMessages = (
    response: Record<string, string>,
    setError: (value: React.SetStateAction<string[]>) => void,
): void => {
    for (const key of Object.keys(response)) {
        setError((prev) => [...prev, response[key]]);
    }
};

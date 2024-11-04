export const required = <T>(inputInfo: T): boolean => {
    if (inputInfo === '') {
        return true;
    }
    return false;
};

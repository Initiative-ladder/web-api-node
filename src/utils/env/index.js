export const env = (key) => {
    const value = process?.env?.[key];
    if (!value) {
        throw new Error('Missing enviroment variable: ' + key);
    }
    return value;
};
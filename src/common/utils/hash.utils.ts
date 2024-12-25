export const generateHash = (): string => {
    let randomString = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 256; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomString;
};

export const generateSmallHash = (size: number = 8): string => {
    return generateHash().slice(0, size);
}
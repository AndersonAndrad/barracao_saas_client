const cleanStringProperties = <T>(obj: T): T => {
    const cleanedObj: T = {...obj};

    for (const key in cleanedObj) {
        if (typeof cleanedObj[key] === 'string') {
            (cleanedObj[key] as any) = cleanedObj[key]
                .trim() // Remove leading and trailing whitespaces
                .replace(/\s+/g, ' '); // Replace multiple spaces with a single space
        }
    }

    return cleanedObj;
}

export const formatObj = <T>(obj: T): T => {
    obj = cleanStringProperties(obj);

    return obj;
}
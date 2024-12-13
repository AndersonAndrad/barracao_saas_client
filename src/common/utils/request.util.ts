export function buildParamsFromObject(obj: any) {
    const params = new URLSearchParams();

    if (obj) {
        Object.keys(obj).forEach((p) => {
            if (obj[p] != null && obj[p] !== undefined) {
                if (Array.isArray(obj[p])) {
                    for (let k = 0; k < obj[p].length; k++) {
                        params.append(p, obj[p][k]);
                    }
                } else {
                    params.append(p, obj[p]);
                }
            }
        });
    }

    const queryString: string = params.toString();

    return queryString.length ? `?${queryString}` : ''
}

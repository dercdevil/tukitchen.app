

export const cammelToSnakeCase = str => {

    if(typeof str === 'string'){

        return str
            .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

    }

    return '';

}
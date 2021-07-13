

export const objectToFormData = obj => {

    const form = new FormData();

    Object.entries(obj).forEach( ([key,value]) => {

        if(typeof value === "object" && value?.hasOwnProperty?.('user') ){
            form.append(key,JSON.stringify(value))
        }else{
            form.append(key,value)
        }


    });

    return form;

}
const ADD_ADDRESS = "ADD_ADDRESS";

const initialState = {
    addresses: []
}

export const addAddress = address => ({
    type: ADD_ADDRESS,
    payload: {
        address
    }
});

const withoutDuplicates = (arr,key) => {
    const a = [...arr];
    const set = new Set([...arr.map( x => typeof x === "object" ? x[key] : x )]);
    const arrWithoutDuplicates = Array.from(set).map(
        x => a.reverse().find( y => y[key] === x )
    );
    return arrWithoutDuplicates;
}

export const addressesReducer = (state = initialState , {type,payload}) => {
    switch(type){
        case ADD_ADDRESS:
            return {
                ...state,
                addresses: withoutDuplicates(
                    [...state.addresses,payload.address],
                    "id"
                )
            }
        default:
            return state
    }
}
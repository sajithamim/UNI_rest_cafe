const initialState = {
    cafeDetails:''
}

export default (state = initialState, action) => {
    console.log("action redu", action);
    switch (action.type) {
        case 'GET_DETAILS':
            return {...state, cafeDetails: action.payload }
        case 'HANDLE_ERROR':
            return {}
        default:
            return state;
    }
}
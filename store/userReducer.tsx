const initialState = {

    login: {},
    

}

const userReducer = (state = initialState, action: { type: any; payload: any }) => {
    switch (action.type) {

            case "LOGIN":
                    return { ...state, login: action.payload }
            default:
                    return state
    }

}
export default userReducer

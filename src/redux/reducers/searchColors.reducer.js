const searchColorsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCHED_COLORS':
            return action.payload;
        default:
            return state;
    }
}
export default searchColorsReducer;
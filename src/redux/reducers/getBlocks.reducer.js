const getBlocksReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BLOCKS':
            return action.payload;
        default:
            return state;
    }
}
export default getBlocksReducer;
const init = {
  block: new Array(0),
};

function reducer(state = init, action) {
  //
  const { type, payload } = action;

  switch (type) {
    //
    case "GET_EXISTING_BLOCK_DATA":
      return { ...state, block: [...state.block, ...payload] };

    case "ADD_NEW_BLOCK_DATA":
      return { ...state, block: [...state.block, payload] };

    default:
      return state;
  }
}

export default reducer;

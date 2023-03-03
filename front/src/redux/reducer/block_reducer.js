const init = {
  newBlockNumber: 0,
  blocks: new Array(0),
  isDoneSavingExistingBlockData: false,
};

function reducer(state = init, action) {
  //
  const { type, payload } = action;

  switch (type) {
    //
    // 기존 블록이 많을 경우 실시간으로 생성되는 블록이 먼저 배열에 담기므로
    case "SAVE_EXISTING_BLOCK_DATA":
      state.blocks = [...state.blocks, ...payload].sort((a, b) => a.number - b.number);
      return { ...state, isDoneSavingExistingBlockData: true };

    // 리렌더링은 필요 없을 듯 하여
    case "UPDATE_NEW_BLOCK_NUMBER":
      state.newBlockNumber = payload;
      return state;

    case "SAVE_NEW_BLOCK_DATA":
      return { ...state, blocks: [...state.blocks, payload] };

    default:
      return state;
  }
}

export default reducer;

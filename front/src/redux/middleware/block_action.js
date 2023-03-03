import axios from "axios";

export const getExistingBlockData_action = () => {
  //
  return async (_dispatch, getState) => {
    //
    const blocks = await axios.get("http://localhost:4000/");
    console.log("DD");

    _dispatch({ type: "SAVE_EXISTING_BLOCK_DATA", payload: blocks.data });
  };
};

export const getNewBlockData_action = (currentBlockNumber) => {
  //
  return async (_dispatch, getState) => {
    //
    // 블록 체인 상에 실시간으로 추가된 블록 이자 마지막으로 axios 통신을 요청한 block.number (기존 블록에 대해서는 다루지 않음)
    // 통신 요청에 대하여 중복이 발생하지 않도록 시간이 소요되지 않는 즉각적인 반영을 위해
    const prev = getState().block_reducer.newBlockNumber;

    // 실시간으로 추가되는 값이다 보니 순차적으로 증가할 것으로 예상
    // 이미 최신 블록까지 통신 요청한 상태라면 통신 요청 과정 생략
    const isRequestDone = currentBlockNumber <= prev;
    if (isRequestDone) return;

    console.log(prev, currentBlockNumber);

    _dispatch({ type: "UPDATE_NEW_BLOCK_NUMBER", payload: currentBlockNumber });

    const newBlock = await axios.post("http://localhost:4000/getNewBlock", { index: currentBlockNumber });

    _dispatch({ type: "SAVE_NEW_BLOCK_DATA", payload: newBlock.data });
  };
};

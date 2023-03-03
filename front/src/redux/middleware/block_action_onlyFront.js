import axios from "axios";

export const getExistingBlockData_action = (blockData) => {
  //
  return (_dispatch, getState) => {
    //
    _dispatch({ type: "GET_EXISTING_BLOCK_DATA", payload: blockData });
  };
};

export const addNewBlockData_action = (newBlock) => {
  //
  return (_dispatch, getState) => {
    //
    console.log("newBlock.number", newBlock.number);

    _dispatch({ type: "ADD_NEW_BLOCK_DATA", payload: newBlock });
  };
};

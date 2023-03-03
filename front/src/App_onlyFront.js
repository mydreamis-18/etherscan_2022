// axios web3
// react-redux redux redux-thunk
import { getExistingBlockData_action, addNewBlockData_action } from "./redux/middleware";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useEffect, useState } from "react";
import Block from "./component/Block";
import Web3 from "web3/dist/web3.min";
import axios from "axios";
import "./App.css";

function App() {
  //
  // 리렌더링 시 console.log() 함수 실행됨
  // const [test, setTest] = useState(console.log("render"));

  const [web3, setWeb3] = useState();
  const [blockComponents, setBlockComponents] = useState();

  const dispatch = useDispatch();
  const { block } = useSelector(
    (state) => ({
      block: state.block_reducer.block,
    }),
    shallowEqual
  );

  const getBlockNumber = async () => {
    //
    const blockNumber = await web3.eth.getBlockNumber();
    return blockNumber;
  };

  const getBlockData = async (_blockNumber) => {
    //
    let index = 0;
    const blockData = new Array(0);

    while (index <= _blockNumber) {
      const block = await web3.eth.getBlock(index);
      blockData.push(block);
      index++;
    }
    return blockData;
  };

  // 처음 한 번만 실행 (모든 블록에 대한 컴포넌트 생성)
  const createBlockComponent = async () => {
    //
    const components = await Promise.all(block.map((_data) => createBlockInstance(_data)));
    setBlockComponents(components);
  };

  // 하나의 블록에 대한 컴포넌트 생성 및 트랜잭션 정보 조회
  const createBlockInstance = async (_block) => {
    //
    // block.transactions 배열에 값이 있다면
    const isTransactions = _block.transactions.length !== 0;
    if (isTransactions) {
      //
      const transactionData = await Promise.all(_block.transactions.map((hash) => web3.eth.getTransaction(hash)));
      return <Block block={_block} transactions={transactionData} />;
    }
    return <Block block={_block} />;
  };

  const newBlockEvent = () => {
    //
    web3.eth.subscribe("newBlockHeaders", async (err, result) => {
      //
      if (err) {
        return console.log(err);
      }

      const index = result.number;
      const newBlock = await web3.eth.getBlock(index);

      // 새로운 블록에 대해서만 컴포넌트 생성 및 트랜잭션 정보 조회
      const newComponent = await createBlockInstance(newBlock);

      dispatch(addNewBlockData_action(newBlock));

      // Uncaught TypeError: prev is not iterable
      // 페이지 로드 되기 전에 블록 생성 시 오류 발생

      // 새로운 배열을 반환해야 함
      setBlockComponents((prev) => [...prev, newComponent]);
    });
  };

  useEffect(() => {
    //
    // 리렌더링으로 인한 추가 인스턴스 생성 방지
    setWeb3(new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:9005")));
    //
  }, []);

  useEffect(() => {
    //
    // web3 인스턴스 생성 후에 처음 한 번만 실행되도록
    if (web3) {
      //
      newBlockEvent();

      getBlockNumber()
        .then((_blockNumber) => getBlockData(_blockNumber))
        .then((_blockData) => dispatch(getExistingBlockData_action(_blockData)));
    }
  }, [web3]);

  useEffect(() => {
    //
    // 처음 한 번만 createBlockComponent() 함수가 실행되도록
    const isFirst = block.length !== 0 && blockComponents === undefined;
    if (isFirst) {
      //
      console.log("first check");
      createBlockComponent();
    }
  }, [block]);

  return (
    <div className="App">
      {/*  */}
      {/*  */}
      <p id="block_number"> 블록 길이: {block.length} </p>
      <div id="blocks"> {blockComponents} </div>
      {/*  */}
    </div>
  );
}

const firstAxios = async () => {
  const _firstAxios = await axios.get("http://localhost:4000/");
  return _firstAxios.data;
};

export default App;

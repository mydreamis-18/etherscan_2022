// axios web3
// react-redux redux redux-thunk
import { getExistingBlockData_action, getNewBlockData_action } from "./redux/middleware";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useEffect, useState } from "react";
import Block from "./component/Block";
import Web3 from "web3/dist/web3.min";
import "./App.css";

function App() {
  //
  // 리렌더링 시 console.log() 함수 실행됨
  // const [test, setTest] = useState(console.log("render"));

  const dispatch = useDispatch();
  const [web3, setWeb3] = useState();
  const [blockComponents, setBlockComponents] = useState();

  // 기존 블록을 리덕스에 다 저장했음을 알리는 시점 필요 (새로운 블록이 먼저 저장될 수 있기 때문에 block.length !== 0 사용 불가)
  const { blocks, isDoneSavingExistingBlockData } = useSelector(
    (state) => ({
      blocks: state.block_reducer.blocks,
      isDoneSavingExistingBlockData: state.block_reducer.isDoneSavingExistingBlockData,
    }),
    shallowEqual
  );

  //
  const getBlockNumber = async () => {
    //
    const blockNumber = await web3.eth.getBlockNumber();
    return blockNumber;
  };

  //
  // 모든 블록에 대한 컴포넌트는 처음 한 번만 실행
  const createBlockComponent = async (_components) => {
    //
    const components = await Promise.all(_components.map((_data) => createBlockInstance(_data)));

    // 새로운 배열을 반환해야 함
    setBlockComponents((prev) => {
      //
      if (prev) {
        return [...prev, ...components];
      }
      return components;
    });
  };

  //
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

  //
  const newBlockEvent = async () => {
    //
    web3.eth.subscribe("newBlockHeaders", async (err, result) => {
      //
      if (err) {
        return console.log(err);
      }

      // subscribe() 함수에 좌지우지 당하지 않고 블록 체인 상에 새 블록이 추가되었을 때
      const blockNumber = await getBlockNumber();
      dispatch(getNewBlockData_action(blockNumber));

      // Uncaught TypeError: prev is not iterable
      // geth와 프론트만 연결했을 때 => 페이지 로드 되기 전에 블록 생성 시 오류 발생
    });
  };

  //
  const updateBlockComponents = async () => {
    //
    const componentBlockNumber = blockComponents[blockComponents.length - 1].props.block.number;
    const reduxBlockNumber = blocks[blocks.length - 1].number;

    // 최신 블록까지 랜더링 되어 있으면 업데이트 과정 생략
    const count = reduxBlockNumber - componentBlockNumber;
    const isNewestBlockChain = count === 0;
    if (isNewestBlockChain) return;

    const newBlocks = blocks.filter((_block, index, array) => index >= array.length - count);

    // 새로운 블록에 대해서만 컴포넌트 생성 및 트랜잭션 정보 조회
    await createBlockComponent([...newBlocks]);
  };

  //
  // 첫 번째
  useEffect(() => {
    //
    // 리렌더링으로 인한 추가 인스턴스 생성 방지
    setWeb3(new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:9005")));
    //
  }, []);

  //
  // 두 번째
  useEffect(() => {
    //
    // web3 인스턴스 생성 후에 처음 한 번만 실행되도록
    if (web3) {
      //
      console.log("once");
      newBlockEvent();
      dispatch(getExistingBlockData_action());
    }
  }, [web3]);

  //
  useEffect(() => {
    //
    // 세 번째
    // 리덕스에 기존 블록 정보를 다 저장한 직후 한 번만 실행하도록
    if (isDoneSavingExistingBlockData && blockComponents === undefined) {
      //
      (async () => await createBlockComponent(blocks))();
      return;
    }

    // block: 블록체인에 블록이 추가 되었을 때
    // 리덕스에 기존 블록 정보가 저장되고 컴포넌트화 된 이후에 모든 순간
    if (isDoneSavingExistingBlockData && blockComponents !== undefined) {
      //
      (async () => await updateBlockComponents())();
    }
  }, [blocks]);

  //
  // block.length 체크
  // 새로운 블록이 추가될 때 리렌더링이 2번씩 진행되는 이유는
  // 리덕스의 업데이트 시점과 그 리덕스 데이터를 활용하여 렌더링 하는 시점을 분리해야 했기 때문에
  // 의도적으로 분리한 이유는
  // 페이지 접속 시 기존 블록 정보와 실시간으로 추가되는 블록 정보를 동시에 가져오되
  // 기존 블록 정보를 리덕스에 다 저장 했을 때 비로소 페이지에 블록 정보가 랜더링 되기를 원했기 때문에
  console.log(blocks.map((block) => block.number));

  //
  return (
    <div className="App">
      {/*  */}
      {/*  */}
      <p id="block_number"> {isDoneSavingExistingBlockData ? "블록 길이: " + blocks.length : "기존 블록 로딩 중..."} </p>
      <div id="blocks"> {blockComponents} </div>
      {/*  */}
    </div>
  );
}

export default App;

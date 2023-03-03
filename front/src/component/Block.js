import Transaction from "./Transaction";
import React, { useState } from "react";

const Block = ({ block, transactions }) => {
  //
  const createBlockElements = () => {
    //
    const elements = new Array(
      (
        <>
          <p className="block-index"> 🔷 {block.number} 번째 블록 🔷 </p>
          <div className="block-wrap">
            <span className="block-data-key"> hash </span>
            <span className="block-data-value"> {block.hash} </span>
          </div>

          <div className="block-wrap">
            <span className="block-data-key"> 트랜잭션 개수 </span>
            <span className="block-data-value"> {block.transactions.length} </span>
          </div>
        </>
      )
    );
    return elements;
  };

  const showBlockData = () => {
    //
    const elements = createBlockElements();

    for (const key in block) {
      //
      // elements 배열에 hash 값이 이미 담겨 있으므로
      if (key === "hash") continue;

      const value = block[key];

      const element = (
        <div className="block-wrap">
          <span className="block-data-key"> {key} </span>
          <span className="block-data-value"> {value} </span>
        </div>
      );

      elements.push(element);
    }

    // block.transactions 배열에 값이 있다면
    if (transactions) {
      //
      const button = (
        <button className="show-transactions-button" onClick={(e) => showTransactions(e)}>
          {isTransactions ? "트랜잭션 정보 숨기기" : "트랜잭션 정보 확인"}
        </button>
      );
      elements.push(button);
    }
    return elements;
  };

  const showTransactions = (e) => {
    //
    // 클릭 이벤트 영역의 중복으로 인하여
    e.stopPropagation();

    setIsTransactions((bool) => (bool ? false : true));
  };

  const createTransactionComponent = () => {
    //
    const _transactions = transactions.map((data) => <Transaction transaction={data} />);
    const elements = showBlockData();
    elements.push(_transactions);
    return elements;
  };

  const [isSimpleData, setIsSimpleData] = useState(true);
  const [isTransactions, setIsTransactions] = useState(false);

  return (
    <div className="block-container" onClick={() => setIsSimpleData((bool) => (bool ? false : true))}>
      {/*  */}
      {/*  */}
      {/* 블록 데이터에 대한 state 값을 사용하지 않아 다른 state 값 변경으로 리렌더링 될 때마다 함수 실행 */}
      {isSimpleData ? createBlockElements() : isTransactions ? createTransactionComponent() : showBlockData()}
    </div>
  );
};

export default Block;

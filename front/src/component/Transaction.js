import React from "react";

const Transaction = ({ transaction }) => {
  //
  const elements = new Array(<p className="transaction-index"> 💎 {transaction.transactionIndex} 번째 트랜잭션 💎 </p>);

  const createTransactionElements = () => {
    //
    for (const key in transaction) {
      const value = transaction[key];

      const element = (
        <div className="transaction-wrap">
          <span className="transaction-data-key"> {key} </span>
          <span className="transaction-data-value"> {value} </span>
        </div>
      );

      elements.push(element);
    }
    return elements;
  };
  return <div className="transaction-container"> {createTransactionElements()} </div>;
};

export default Transaction;
